import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/careers/HeroSection';
import { ValuesSection } from '../components/careers/ValuesSection';
import { BenefitsSection } from '../components/careers/BenefitsSection';
import { OpenPositions } from '../components/careers/OpenPositions';

export const Careers = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ValuesSection />
        <BenefitsSection />
        <OpenPositions />
      </main>
      <Footer />
    </div>
  );
};