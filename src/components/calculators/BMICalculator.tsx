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
    <Card className="max-w-md mx-auto border-emerald-500/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">BMI Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <label className="text-sm text-slate-400 font-medium">Weight (kg)</label>
            <Input 
              type="number" 
              placeholder="e.g. 70" 
              value={weight} 
              onChange={(e) => setWeight(e.target.value)} 
            />
        </div>
        <div className="space-y-2">
            <label className="text-sm text-slate-400 font-medium">Height (cm)</label>
            <Input 
              type="number" 
              placeholder="e.g. 175" 
              value={height} 
              onChange={(e) => setHeight(e.target.value)} 
            />
        </div>
        <Button onClick={handleCalculate} variant="neon" className="w-full text-lg font-bold">Calculate BMI</Button>
        {result !== null && (
          <div className="text-center space-y-1 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-400">Your BMI is</p>
            <p className="text-5xl font-extrabold text-emerald-400">{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}