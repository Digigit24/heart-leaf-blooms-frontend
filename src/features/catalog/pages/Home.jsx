import Hero from '../components/Hero';
import TrendingProducts from '../components/TrendingProducts';
import AboutSection from '../components/AboutSection';
import TestimonialSection from '../components/TestimonialSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <AboutSection />
      <TrendingProducts />
      <TestimonialSection />
    </div>
  );
}