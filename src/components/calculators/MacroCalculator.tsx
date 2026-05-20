"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { calculateMacros } from "@/lib/calculators/fitness";
import { Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/CustomSelect";

export default function MacroCalculator() {
  const t = useTranslations("MacroCalculator");
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
                <Zap className="w-8 h-8 text-emerald-600 dark:text-emerald-500" />
            </motion.div>
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Decorative SVG Illustration */}
          <div className="flex justify-center mb-6">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-500/20">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <Input type="number" placeholder={t("calories")} value={calories} onChange={(e) => setCalories(e.target.value)} className="bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
          
          <Select value={goal} onValueChange={(val) => setGoal(val as 'cut' | 'maintain' | 'bulk')}>
            <SelectTrigger className="bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <SelectValue placeholder={t("goal")} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="cut">{t("cut")}</SelectItem>
                <SelectItem value="maintain">{t("maintain")}</SelectItem>
                <SelectItem value="bulk">{t("bulk")}</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleCalculate} variant="neon" className="w-full text-lg font-bold">{t("button")}</Button>
          
          <AnimatePresence>
            {result !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="grid grid-cols-3 gap-4 pt-6"
              >
                {[
                    { label: t("protein"), value: result.protein, color: "text-emerald-600 dark:text-emerald-400" },
                    { label: t("carbs"), value: result.carbs, color: "text-blue-600 dark:text-blue-400" },
                    { label: t("fat"), value: result.fat, color: "text-yellow-600 dark:text-yellow-400" },
                ].map((item, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-center p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800"
                    >
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">{item.label}</p>
                        <p className={`text-2xl font-bold ${item.color}`}>{item.value}g</p>
                    </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}