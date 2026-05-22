"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { calculateBMI } from "@/lib/calculators/fitness";
import { Info, Scale } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BMICalculator() {
  const t = useTranslations("BMICalculator");
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

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: t("underweight"), color: "text-blue-400" };
    if (bmi < 25) return { label: t("healthy"), color: "text-emerald-400" };
    if (bmi < 30) return { label: t("overweight"), color: "text-yellow-400" };
    return { label: t("obese"), color: "text-red-400" };
  };

  const category = result !== null ? getBMICategory(result) : null;

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
                whileHover={{ rotate: -10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <Scale className="w-8 h-8 text-emerald-600 dark:text-emerald-500" />
            </motion.div>
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Decorative SVG Illustration */}
          <div className="flex justify-center mb-6">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-500/20" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 2V12L19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-600 dark:text-slate-400 font-medium">{t("weight")}</label>
              <Input 
                type="number" 
                placeholder={t("placeholder_weight")}
                value={weight} 
                onChange={(e) => setWeight(e.target.value)} 
                className="bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-600 dark:text-slate-400 font-medium">{t("height")}</label>
              <Input 
                type="number" 
                placeholder={t("placeholder_height")}
                value={height} 
                onChange={(e) => setHeight(e.target.value)} 
                className="bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>
          </div>
          
          <Button onClick={handleCalculate} variant="neon" className="w-full text-lg font-bold">
            {t("button")}
          </Button>

          <AnimatePresence>
            {result !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between p-6 bg-slate-100 dark:bg-slate-900 rounded-3xl border border-emerald-500/20">
                  <p className="text-lg text-slate-800 dark:text-slate-300 font-medium">{t("result")}</p>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`text-6xl font-extrabold ${category?.color}`}
                  >
                    {result}
                  </motion.p>
                </div>
                <div className="text-center font-bold text-xl uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    {category?.label}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3 p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm">
              <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
              <p>{t("info")}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}