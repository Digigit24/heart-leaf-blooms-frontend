import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const LiquidHero = () => {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const targetHover = useRef(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        let width = container.clientWidth;
        let height = container.clientHeight;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(
            width / -2, width / 2, height / 2, height / -2, 1, 1000
        );
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Texture Loading
        const loader = new THREE.TextureLoader();
        const texture = loader.load('/images/hero-1.png', (tex) => {
            tex.minFilter = THREE.LinearFilter;
            tex.magFilter = THREE.LinearFilter;
            updateMaterialRatio(textUniforms, width, height, tex.image.width, tex.image.height);
        });

        // Mouse tracking
        const mouse = new THREE.Vector2(0.5, 0.5);
        const targetMouse = new THREE.Vector2(0.5, 0.5);

        // Shaders
        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            uniform float uTime;
            uniform sampler2D uTexture;
            uniform vec2 uMouse;
            uniform vec2 uResolution;
            uniform vec2 uImageResolution;
            uniform float uHover;
            
            varying vec2 vUv;

            // Simplex noise function
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

            float snoise(vec2 v) {
                const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                                    0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                                    -0.577350269189626, // -1.0 + 2.0 * C.x
                                    0.024390243902439); // 1.0 / 41.0
                vec2 i  = floor(v + dot(v, C.yy) );
                vec2 x0 = v - i + dot(i, C.xx);
                vec2 i1;
                i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod289(i); // Avoid truncation effects in permutation
                vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                        + i.x + vec3(0.0, i1.x, 1.0 ));

                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                m = m*m ;
                m = m*m ;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                vec3 g;
                g.x  = a0.x  * x0.x  + h.x  * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }

            void main() {
                // Correct for aspect ratio to ensure circular effects
                vec2 aspect = uResolution / min(uResolution.x, uResolution.y);
                vec2 uv = vUv;
                
                // Interaction vector
                vec2 mousePoint = uMouse;
                float dist = distance(uv * aspect, mousePoint * aspect);
                
                // Mouse distortion field (liquid bulge)
                float decay = clamp(1.0 - dist * 3.5, 0.0, 1.0); // Size of the effect
                float distortionStrength = 0.04 * uHover; // Intensity
                
                // Dynamic flow noise
                float noise = snoise(uv * 5.0 + uTime * 0.5) * 0.02;
                
                // Combined distortion
                vec2 distortedUv = uv - (mousePoint - uv) * decay * distortionStrength;
                distortedUv += noise * uHover * 0.2; // Add some noise when hovering

                // Texture Sampling (cover fit logic in shader)
                vec2 s = uResolution; // Screen
                vec2 i = uImageResolution; // Image
                float rs = s.x / s.y;
                float ri = i.x / i.y;
                vec2 newUv = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
                vec2 offset = (rs < ri ? vec2((newUv.x - s.x) / 2.0, 0.0) : vec2(0.0, (newUv.y - s.y) / 2.0)) / newUv;
                vec2 uvCover = distortedUv * s / newUv + offset;

                // Sample texture
                vec4 texColor = texture2D(uTexture, uvCover);

                // Green Tint Logic
                // Highlight edges of the distortion
                float highlight = smoothstep(0.0, 1.0, decay) * 0.4;
                vec3 greenGlow = vec3(0.1, 0.8, 0.3) * highlight * uHover;
                
                // Mix original color with green highlights
                vec3 finalColor = texColor.rgb + greenGlow;
                
                // Add a subtle overlay tint for the whole banner (dark green/blue premium feel)
                finalColor = mix(finalColor, vec3(0.06, 0.24, 0.18), 0.3);

                gl_FragColor = vec4(finalColor, 1.0);
            }
        `;

        const uniforms = {
            uTime: { value: 0 },
            uTexture: { value: texture },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uResolution: { value: new THREE.Vector2(width, height) },
            uImageResolution: { value: new THREE.Vector2(1, 1) }, // Placeholder
            uHover: { value: 0 }
        };
        const textUniforms = uniforms; // Store ref to use in loader callback

        const geometry = new THREE.PlaneGeometry(width, height);
        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        });

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        // Helper to maintain aspect ratio in shader
        function updateMaterialRatio(uni, w, h, imgW, imgH) {
            uni.uResolution.value.set(w, h);
            uni.uImageResolution.value.set(imgW || 1, imgH || 1);
        }

        // Animation Loop
        let animationId;
        const clock = new THREE.Clock();



        const animate = () => {
            animationId = requestAnimationFrame(animate);

            // Lerp mouse
            mouse.lerp(targetMouse, 0.1);
            uniforms.uMouse.value.copy(mouse);

            // Lerp hover state smoothly in the loop
            const currentHover = uniforms.uHover.value;
            const target = targetHover.current;
            uniforms.uHover.value += (target - currentHover) * 0.05;

            // Update time
            uniforms.uTime.value = clock.getElapsedTime();

            // Render
            renderer.render(scene, camera);
        };
        animate();

        // Handlers
        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - (e.clientY - rect.top) / rect.height; // Flip Y for GLSL
            targetMouse.set(x, y);
            targetHover.current = 1;
        };

        const handleMouseLeave = () => {
            targetHover.current = 0;
        };

        const handleMouseEnter = () => {
            targetHover.current = 1;
        };

        // Attach listeners
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('mouseenter', handleMouseEnter);

        // Resize
        const handleResize = () => {
            if (!containerRef.current) return;
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;

            renderer.setSize(w, h);
            camera.left = w / -2;
            camera.right = w / 2;
            camera.top = h / 2;
            camera.bottom = h / -2;
            camera.updateProjectionMatrix();

            plane.geometry.dispose();
            plane.geometry = new THREE.PlaneGeometry(w, h);

            if (texture.image) {
                updateMaterialRatio(uniforms, w, h, texture.image.width, texture.image.height);
            } else {
                updateMaterialRatio(uniforms, w, h, 1, 1);
            }
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        sceneRef.current = { scene, renderer, material, geometry };
        return () => {
            window.removeEventListener('resize', handleResize);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationId);
            renderer.dispose();
            container.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ pointerEvents: 'auto' }} // Ensure mouse events are captured
        />
    );
};

export default LiquidHero;
