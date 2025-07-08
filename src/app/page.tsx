"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const impactMultipliers = {
  deworming: 23,
  safeWater: 0.25,
  hpv: 0.0008,
  mms: 0.0006,
  malaria: 0.001,
  readingGlasses: 0.5,
};

export default function Home() {
  const [amount, setAmount] = useState(10000);

  return (
    <div className="p-6 bg-[#f3f9f6] text-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-[#005c4b]">Your Impact Dashboard</h1>
      <p className="mb-6 max-w-2xl">Thanks to your generosity, we’ve translated dollars into data-backed impact. Explore what your gift has achieved—and what it could do next.</p>

      <Card className="mb-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2 text-[#005c4b]">Your Past Impact</h2>
          <ul className="list-disc list-inside">
            <li><strong>Deworm the World:</strong> $10,000 → $230,000 in future income unlocked</li>
            <li><strong>Safe Water Now:</strong> 2.5 child lives saved</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4 text-[#005c4b]">Explore Potential Impact</h2>
          <label className="block mb-2 font-medium">Adjust your potential gift:</label>
          <Slider defaultValue={[10000]} max={50000} step={1000} onValueChange={([val]) => setAmount(val)} />
          <p className="mt-2 text-sm">${amount.toLocaleString()}</p>

          <Tabs defaultValue="hpv" className="mt-6">
            <TabsList>
              <TabsTrigger value="hpv">HPV Vaccine</TabsTrigger>
              <TabsTrigger value="mms">Prenatal Vitamins</TabsTrigger>
              <TabsTrigger value="malaria">Malaria Prevention</TabsTrigger>
              <TabsTrigger value="readingGlasses">Reading Glasses</TabsTrigger>
            </TabsList>
            <TabsContent value="hpv">
              <p className="mt-4">Your gift could prevent <strong>{(amount * impactMultipliers.hpv).toFixed(1)}</strong> cervical cancer deaths in Malawi.</p>
            </TabsContent>
            <TabsContent value="mms">
              <p className="mt-4">Your gift could prevent <strong>{(amount * impactMultipliers.mms).toFixed(1)}</strong> adverse pregnancy outcomes in Nigeria.</p>
            </TabsContent>
            <TabsContent value="malaria">
              <p className="mt-4">Your gift could reduce malaria risk for <strong>{(amount * impactMultipliers.malaria * 1000).toFixed(0)}</strong> school children.</p>
            </TabsContent>
            <TabsContent value="readingGlasses">
              <p className="mt-4">Your gift could provide <strong>{(amount / 0.6).toFixed(0)}</strong> people with reading glasses, boosting productivity and quality of life.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}