"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { calculateTDEE } from "@/lib/calculators/fitness";

export default function TDEECalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState(1.2);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    if (w > 0 && h > 0 && a > 0) {
      setResult(calculateTDEE(w, h, a, gender, activity));
    }
  };

  return (
    <Card className="max-w-md mx-auto border-blue-500/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-500 bg-clip-text text-transparent">TDEE Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
        <Input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} />
        <Input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        
        <select className="w-full h-12 rounded-xl border border-slate-700 bg-slate-950 px-4 text-sm" value={gender} onChange={(e) => setGender(e.target.value as 'male' | 'female')}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select className="w-full h-12 rounded-xl border border-slate-700 bg-slate-950 px-4 text-sm" value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))}>
          <option value="1.2">Sedentary</option>
          <option value="1.375">Lightly Active</option>
          <option value="1.55">Moderately Active</option>
          <option value="1.725">Very Active</option>
        </select>

        <Button onClick={handleCalculate} variant="neon" className="w-full text-lg font-bold">Calculate TDEE</Button>
        {result !== null && (
          <div className="text-center space-y-1 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-400">Daily Calories</p>
            <p className="text-4xl font-extrabold text-blue-400">{result} kcal</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}