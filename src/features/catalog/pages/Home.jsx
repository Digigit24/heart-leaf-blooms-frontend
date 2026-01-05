import Hero from '../components/Hero';
import TrendingProducts from '../components/TrendingProducts';
import AboutSection from '../components/AboutSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <AboutSection />
      <TrendingProducts />
    </div>
  );
}