"use client";

import dynamic from "next/dynamic";

const TravelChallenge = dynamic(() => import("@/components/travel/TravelChallenge"), { ssr: false });

export default function TravelPage() {
  return <TravelChallenge />;
}