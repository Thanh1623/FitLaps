"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/CustomSelect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Utensils, Save, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { savePlanHistory } from "@/app/actions/history";
import { RecommendationSlider } from "@/components/affiliate/RecommendationSlider";

export default function MealPlannerForm() {
  const t = useTranslations("MealPlannerForm");
  const { locale } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    try {
        await savePlanHistory('meal', result);
        setSaved(true);
    } catch (e) {
        console.error(e);
        router.push(`/${locale}/auth`);
    } finally {
        setSaving(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setSaved(false);
    
    const formData = new FormData(e.currentTarget);
    const mealsPerDay = parseInt(formData.get("mealsPerDay") as string);
    if (isNaN(mealsPerDay) || mealsPerDay < 3) {
      setError("Meals per day must be at least 3.");
      setLoading(false);
      return;
    }

    const data = {
      goal: formData.get("goal"),
      dietaryRestrictions: formData.get("dietaryRestrictions"),
      calorieTarget: formData.get("calorieTarget") ? parseInt(formData.get("calorieTarget") as string) : undefined,
      mealsPerDay: mealsPerDay,
      feedback: formData.get("feedback") as string || undefined,
      locale: locale,
    };

    const fetchWithRetry = async (url: string, options: RequestInit, retries = 1): Promise<Response> => {
        try {
            const response = await fetch(url, options);
            if (!response.ok && retries > 0) {
                return fetchWithRetry(url, options, retries - 1);
            }
            return response;
        } catch (error) {
            if (retries > 0) {
                return fetchWithRetry(url, options, retries - 1);
            }
            throw error;
        }
    };

    try {
      const response = await fetchWithRetry("/api/meal-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        let errorMessage = json.error ?? "Failed to generate meal plan.";
        if (json.details && Array.isArray(json.details)) {
          errorMessage += ": " + json.details.map((d: any) => `${d.path}: ${d.message}`).join(", ");
        }
        setError(errorMessage + " (Please try again)");
        return;
      }

      setResult(json.data);
      setRecommendations(json.recommendations || []);
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
                <Utensils className="w-8 h-8 text-emerald-600 dark:text-emerald-500" />
            </motion.div>
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select name="goal" required>
              <SelectTrigger>
                <SelectValue placeholder={t("goal")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weight_loss">{t("weight_loss")}</SelectItem>
                <SelectItem value="maintenance">{t("maintenance")}</SelectItem>
                <SelectItem value="muscle_gain">{t("muscle_gain")}</SelectItem>
              </SelectContent>
            </Select>

            <Select name="dietaryRestrictions" required>
              <SelectTrigger>
                <SelectValue placeholder={t("dietaryRestrictions")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">{t("none")}</SelectItem>
                <SelectItem value="vegan">{t("vegan")}</SelectItem>
                <SelectItem value="keto">{t("keto")}</SelectItem>
                <SelectItem value="paleo">{t("paleo")}</SelectItem>
                <SelectItem value="gluten_free">{t("gluten_free")}</SelectItem>
              </SelectContent>
            </Select>

            <Input name="calorieTarget" type="number" placeholder={t("calorieTarget")} className="bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
            <Input name="mealsPerDay" type="number" min="3" max="6" placeholder={t("mealsPerDay")} required className="bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
            
            {result && (
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Feedback for regeneration:</label>
                    <textarea name="feedback" className="w-full p-2 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-sm" placeholder="e.g. Only use these ingredients: chicken, pork, mango, cabbage... or exclude dairy/nuts."></textarea>
                </div>
            )}

            <Button type="submit" variant="neon" className="w-full text-lg font-bold" disabled={loading}>
              {loading ? t("generating") : (result ? "Regenerate Plan" : t("submit"))}
            </Button>
          </form>
          
          <AnimatePresence>
            {result && result.mealPlan && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-6 p-6 bg-slate-100 dark:bg-slate-900 rounded-3xl border border-emerald-500/20 text-slate-800 dark:text-slate-100"
              >
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">Your Generated Plan</h3>
                    <Button onClick={handleSave} disabled={saving || saved} variant="neon" className="gap-2">
                        {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                        {saved ? "Saved" : "Save Plan"}
                    </Button>
                </div>
                
                <div className="space-y-6">
                    {result.mealPlan.days?.map((dayPlan: any, index: number) => (
                        <div key={index} className="bg-slate-200 dark:bg-slate-950 p-5 rounded-2xl border border-emerald-500/10">
                            <h4 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300 mb-3">{dayPlan.day}</h4>
                            
                            <div className="space-y-2">
                                {dayPlan.meals?.map((meal: any, mIndex: number) => (
                                    <div key={mIndex} className="bg-slate-300 dark:bg-slate-900 p-3 rounded-lg text-sm">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-bold text-slate-800 dark:text-slate-200">{meal.name}</span>
                                            <span className="text-xs text-emerald-600 dark:text-emerald-400 uppercase">{meal.type}</span>
                                        </div>
                                        <div className="text-slate-600 dark:text-slate-400">
                                            {meal.calories} kcal | P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g
                                        </div>
                                        {meal.recipe && <p className="mt-2 text-slate-500 italic">{meal.recipe}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recommendations Section */}
                {recommendations && recommendations.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-slate-300 dark:border-slate-800">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Recommended for you</h3>
                        <RecommendationSlider products={recommendations} />
                    </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
