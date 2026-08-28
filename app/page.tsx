import { Anatomy } from "@/components/anatomy";
import { Comparison } from "@/components/comparison";
import { Cta } from "@/components/cta";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Marketplace } from "@/components/marketplace";
import { Pricing } from "@/components/pricing";
import { Publisher } from "@/components/publisher";
import { StackMarquee } from "@/components/stack-marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <StackMarquee />
      <HowItWorks />
      <Marketplace />
      <Anatomy />
      <Comparison />
      <Publisher />
      <Pricing />
      <Faq />
      <Cta />
    </>
  );
}
