import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeatureSection';
import HowItWorks from './components/HowItWorkSection';
import TrustSection from './components/TrustSection';
import Footer from './components/FooterSection';
import { Toaster } from './components/ui/toaster';

export const LandingPage = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <TrustSection />
      <Footer />
      <Toaster />
    </main>
  );
}