"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";

const impactMultipliers = {
  deworming: 23,
  safeWater: 0.25,
  hpv: 0.0008,
  mms: 0.0006,
  malaria: 0.001,
  readingGlasses: 0.5,
};

export default function Home() {
  const [amount, setAmount] = useState(250000);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    (el as any).isDown = true;
    (el as any).startX = e.pageX - el.offsetLeft;
    (el as any).scrollLeftStart = el.scrollLeft;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    (el as any).isDown = false;
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    (el as any).isDown = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !(el as any).isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - (el as any).startX) * 2;
    el.scrollLeft = (el as any).scrollLeftStart - walk;
  };

  return (
    <div className="p-6 bg-[url('/images/ea-gradient-6.webp')] bg-cover bg-center text-gray-900 min-h-screen">
       <div>
        <Image
          src="/images/EvidenceActionLogo.png"
          alt="Evidence Action Logo"
          width={200}
          height={60}
        />
      </div>
      <h1 className="text-3xl font-bold mb-4 text-[#E600A0]">Your Impact Dashboard</h1>
      <p className="mb-6 max-w-2xl">Thanks to your generosity, we’ve translated your high-impact gift into measurable, data-backed outcomes. Explore what your contribution has already achieved—and what future giving could unlock.</p>

      <Card className="mb-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2 text-[#E600A0]">Your Past Impact</h2>
          <ul className="list-disc list-inside">
            <li><strong>Deworm the World:</strong> $250,000 → $5.75 million in future income unlocked</li>
            <li><strong>Safe Water Now:</strong> 62.5 child lives saved</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4 text-[#E600A0]">Explore Potential Impact</h2>
          <label className="block mb-2 font-medium">Adjust your potential gift:</label>
          <Slider defaultValue={[250000]} max={1000000} step={10000} onValueChange={([val]) => setAmount(val)} />
          <p className="mt-2 text-sm">${amount.toLocaleString()}</p>

          <Tabs defaultValue="hpv" className="mt-6">
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="overflow-x-auto whitespace-nowrap -mx-2 px-2 cursor-grab active:cursor-grabbing scrollbar-hide"
            >
              <TabsList className="inline-flex gap-2">
                <TabsTrigger value="hpv">HPV Vaccine</TabsTrigger>
                <TabsTrigger value="mms">Prenatal Vitamins</TabsTrigger>
                <TabsTrigger value="malaria">Malaria Prevention</TabsTrigger>
                <TabsTrigger value="readingGlasses">Reading Glasses</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="hpv">
              <p className="mt-4">Your gift could prevent <strong>{Number((amount * impactMultipliers.hpv).toFixed(0)).toLocaleString()}</strong> cervical cancer deaths in Malawi.</p>
            </TabsContent>
            <TabsContent value="mms">
              <p className="mt-4">Your gift could prevent <strong>{Number((amount * impactMultipliers.mms).toFixed(0)).toLocaleString()}</strong> adverse pregnancy outcomes in Nigeria.</p>
            </TabsContent>
            <TabsContent value="malaria">
              <p className="mt-4">Your gift could reduce malaria risk for <strong>{Number((amount * impactMultipliers.malaria).toFixed(0)).toLocaleString()}</strong> school children.</p>
            </TabsContent>
            <TabsContent value="readingGlasses">
              <p className="mt-4">Your gift could provide <strong>{Number((amount * impactMultipliers.readingGlasses).toFixed(0)).toLocaleString()}</strong> people with reading glasses, boosting productivity and quality of life.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}