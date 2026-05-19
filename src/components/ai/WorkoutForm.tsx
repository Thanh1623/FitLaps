"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function WorkoutForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      goal: formData.get("goal"),
      fitnessLevel: formData.get("fitnessLevel"),
      equipment: formData.get("equipment"),
      durationMinutes: parseInt(formData.get("durationMinutes") as string),
      frequencyPerWeek: parseInt(formData.get("frequencyPerWeek") as string),
    };

    try {
      const response = await fetch("/api/workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      setResult(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto border-emerald-500/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">AI Workout Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select name="goal" required>
            <option value="weight_loss">Weight Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="endurance">Endurance</option>
          </Select>
          <Select name="fitnessLevel" required>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Select>
          <Select name="equipment" required>
            <option value="gym">Gym</option>
            <option value="home">Home</option>
            <option value="none">None</option>
          </Select>
          <Input name="durationMinutes" type="number" placeholder="Duration (min)" required />
          <Input name="frequencyPerWeek" type="number" placeholder="Frequency (days/week)" required />
          
          <Button type="submit" variant="neon" className="w-full text-lg font-bold" disabled={loading}>
            {loading ? "Generating..." : "Generate Plan"}
          </Button>
        </form>
        
        {result && (
          <div className="mt-6 p-6 bg-slate-900 rounded-3xl border border-emerald-500/20 text-slate-100">
            <h3 className="text-xl font-bold mb-4 text-emerald-400">Your Generated Plan</h3>
            <div className="prose prose-invert prose-sm text-slate-300">
                {result}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}