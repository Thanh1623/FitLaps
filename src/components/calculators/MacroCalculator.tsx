"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { calculateMacros } from "@/lib/calculators/fitness";

export default function MacroCalculator() {
  const [calories, setCalories] = useState("");
  const [goal, setGoal] = useState<'cut' | 'maintain' | 'bulk'>('maintain');
  const [result, setResult] = useState<{ protein: number, carbs: number, fat: number } | null>(null);

  const handleCalculate = () => {
    const c = parseFloat(calories);
    if (c > 0) {
      setResult(calculateMacros(c, goal));
    }
  };

  return (
    <Card className="max-w-md mx-auto border-emerald-500/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">Macro Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="number" placeholder="Daily Calories" value={calories} onChange={(e) => setCalories(e.target.value)} />
        
        <select className="w-full h-12 rounded-xl border border-slate-700 bg-slate-950 px-4 text-sm" value={goal} onChange={(e) => setGoal(e.target.value as 'cut' | 'maintain' | 'bulk')}>
          <option value="cut">Cut (Weight Loss)</option>
          <option value="maintain">Maintain</option>
          <option value="bulk">Bulk (Muscle Gain)</option>
        </select>

        <Button onClick={handleCalculate} variant="neon" className="w-full text-lg font-bold">Calculate Macros</Button>
        {result !== null && (
          <div className="grid grid-cols-3 gap-2 pt-4">
            <div className="text-center p-3 bg-slate-900 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-400">Protein</p>
                <p className="text-lg font-bold text-emerald-400">{result.protein}g</p>
            </div>
            <div className="text-center p-3 bg-slate-900 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-400">Carbs</p>
                <p className="text-lg font-bold text-emerald-400">{result.carbs}g</p>
            </div>
            <div className="text-center p-3 bg-slate-900 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-400">Fat</p>
                <p className="text-lg font-bold text-emerald-400">{result.fat}g</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}