'use client';

import { Navbar } from '@/components/ui/Navbar';
import { GridBackground } from '@/components/landing/GridBackground';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureGrid } from '@/components/landing/FeatureGrid';
import { ArchitectureSection } from '@/components/landing/ArchitectureSection';
import { CTASection } from '@/components/landing/CTASection';
import { LandingFooter } from '@/components/landing/LandingFooter';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-mono selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      <Navbar />
      <GridBackground />
      <HeroSection />
      <FeatureGrid />
      <ArchitectureSection />
      <CTASection />
      <LandingFooter />
    </div>
  );
}
