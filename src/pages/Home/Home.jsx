import React from "react";
import { LandingPageSection } from "../../components/LandingPageSection";
import { MarketOverview } from "../../components/crypto/MarketOverview";

export const Home = () => {
  return (
    <>
      <LandingPageSection />
      <div className="max-w-5xl mx-auto py-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-950 to-green-800 bg-clip-text text-transparent inline-block relative tracking-wide after:content-[''] after:block after:w-24 after:h-[3px] after:bg-emerald-400 after:mx-auto after:mt-3 rounded-full">
            Market Highlights
          </h1>
        </div>

        <MarketOverview />
      </div>
    </>
  );
};
