"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { calculateBMI } from "@/lib/calculators/fitness";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (w > 0 && h > 0) {
      setResult(calculateBMI(w, h));
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>BMI Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input 
          type="number" 
          placeholder="Weight (kg)" 
          value={weight} 
          onChange={(e) => setWeight(e.target.value)} 
        />
        <Input 
          type="number" 
          placeholder="Height (cm)" 
          value={height} 
          onChange={(e) => setHeight(e.target.value)} 
        />
        <Button onClick={handleCalculate} className="w-full">Calculate</Button>
        {result !== null && (
          <div className="text-center text-xl font-bold pt-4">
            BMI: {result}
          </div>
        )}
      </CardContent>
    </Card>
  );
}