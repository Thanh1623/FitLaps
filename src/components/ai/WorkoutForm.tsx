"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/CustomSelect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Dumbbell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WorkoutForm() {
  const t = useTranslations("WorkoutForm");
  const { locale } = useParams();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      goal: formData.get("goal"),
      fitnessLevel: formData.get("fitnessLevel"),
      equipment: formData.get("equipment"),
      durationMinutes: parseInt(formData.get("durationMinutes") as string),
      frequencyPerWeek: parseInt(formData.get("frequencyPerWeek") as string),
      feedback: formData.get("feedback") as string || undefined,
      locale: locale,
    };

    try {
      const response = await fetch("/api/workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const contentType = response.headers.get("content-type") ?? "";
      if (!contentType.includes("application/json")) {
        setError("Server returned an unexpected response format.");
        return;
      }

      const json = await response.json();

      if (!response.ok || !json.success) {
        setError(json.error ?? "Failed to generate workout plan.");
        return;
      }

      setResult(json.data);
    } catch (error) {
      console.error(error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="max-w-xl mx-auto border-emerald-500/20 shadow-2xl bg-white dark:bg-slate-950/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-500 bg-clip-text text-transparent flex items-center gap-3">
            <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <Dumbbell className="w-8 h-8 text-emerald-600 dark:text-emerald-500" />
            </motion.div>
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Decorative SVG Illustration */}
          <div className="flex justify-center mb-6">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-500/20">
              <path d="M6 12H18M10 9V15M14 9V15M5 6H19M5 18H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Select name="goal" required>
              <SelectTrigger>
                <SelectValue placeholder={t("goal")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weight_loss">{t("weight_loss")}</SelectItem>
                <SelectItem value="muscle_gain">{t("muscle_gain")}</SelectItem>
                <SelectItem value="endurance">{t("endurance")}</SelectItem>
              </SelectContent>
            </Select>

            <Select name="fitnessLevel" required>
              <SelectTrigger>
                <SelectValue placeholder={t("fitnessLevel")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">{t("beginner")}</SelectItem>
                <SelectItem value="intermediate">{t("intermediate")}</SelectItem>
                <SelectItem value="advanced">{t("advanced")}</SelectItem>
              </SelectContent>
            </Select>

            <Select name="equipment" required>
              <SelectTrigger>
                <SelectValue placeholder={t("equipment")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gym">{t("gym")}</SelectItem>
                <SelectItem value="home">{t("home")}</SelectItem>
                <SelectItem value="none">{t("none")}</SelectItem>
              </SelectContent>
            </Select>
            <Input name="durationMinutes" type="number" placeholder={t("duration")} required className="bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
            <Input name="frequencyPerWeek" type="number" placeholder={t("frequency")} required className="bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
            
            {result && (
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Feedback for regeneration:</label>
                    <textarea name="feedback" className="w-full p-2 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-sm" placeholder="Tell the AI what you'd like to change..."></textarea>
                </div>
            )}

            <Button type="submit" variant="neon" className="w-full text-lg font-bold" disabled={loading}>
              {loading ? t("generating") : (result ? "Regenerate Plan" : t("submit"))}
            </Button>
          </form>
          
          <AnimatePresence>
            {result && result.workoutPlan && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-6 p-6 bg-slate-100 dark:bg-slate-900 rounded-3xl border border-emerald-500/20 text-slate-800 dark:text-slate-100"
              >
                <h3 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Your Generated Plan</h3>
                
                {/* Overview Section */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm bg-slate-200 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <p><span className="text-slate-600 dark:text-slate-400">Goal:</span> {result.workoutPlan.goal?.replace('_', ' ')}</p>
                    <p><span className="text-slate-600 dark:text-slate-400">Level:</span> {result.workoutPlan.level}</p>
                    <p><span className="text-slate-600 dark:text-slate-400">Duration:</span> {result.workoutPlan.duration} mins</p>
                    <p><span className="text-slate-600 dark:text-slate-400">Frequency:</span> {result.workoutPlan.frequency} days/week</p>
                </div>

                {/* Days Section */}
                <div className="space-y-6">
                    {result.workoutPlan.days?.map((dayPlan: any, index: number) => (
                        <div key={index} className="bg-slate-200 dark:bg-slate-950 p-5 rounded-2xl border border-emerald-500/10">
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">{dayPlan.day}</h4>
                                <span className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 rounded-full">{dayPlan.targetMuscleGroup}</span>
                            </div>
                            
                            <div className="text-sm text-slate-600 dark:text-slate-400 mb-3 space-y-1">
                                <p><span className="text-emerald-600 dark:text-emerald-500/80 font-medium">Warmup:</span> {dayPlan.warmUp}</p>
                                <p><span className="text-emerald-600 dark:text-emerald-500/80 font-medium">Rest:</span> {dayPlan.restTime}</p>
                                <p><span className="text-emerald-600 dark:text-emerald-500/80 font-medium">Notes:</span> {dayPlan.notes}</p>
                            </div>
                            
                            <div className="space-y-2">
                                {dayPlan.exercises?.map((ex: any, exIndex: number) => (
                                    <div key={exIndex} className="flex justify-between items-center text-sm bg-slate-300 dark:bg-slate-900 p-2 rounded-lg">
                                        <span className="font-medium text-slate-800 dark:text-slate-200">{ex.name}</span>
                                        <span className="text-slate-600 dark:text-slate-400">{ex.sets}x{ex.reps} {ex.weight && `(@ ${ex.weight})`}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
