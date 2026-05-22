"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { calculateTDEE } from "@/lib/calculators/fitness";
import { Calculator } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/CustomSelect";

export default function TDEECalculator() {
  const t = useTranslations("TDEECalculator");
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="max-w-xl mx-auto border-blue-500/20 shadow-2xl bg-white dark:bg-slate-950/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-500 bg-clip-text text-transparent flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Calculator className="w-8 h-8 text-blue-600 dark:text-blue-500" />
            </motion.div>
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Decorative SVG Illustration */}
          <div className="flex justify-center mb-6">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500/20" aria-hidden="true">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-4">
              <Input type="number" placeholder={t("weight")} value={weight} onChange={(e) => setWeight(e.target.value)} className="bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
              <Input type="number" placeholder={t("height")} value={height} onChange={(e) => setHeight(e.target.value)} className="bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
              <Input type="number" placeholder={t("age")} value={age} onChange={(e) => setAge(e.target.value)} className="bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
              <Select value={gender} onValueChange={(val) => setGender(val as 'male' | 'female')}>
                <SelectTrigger className="bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder={t("gender")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="male">{t("male")}</SelectItem>
                    <SelectItem value="female">{t("female")}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={activity.toString()} onValueChange={(val) => setActivity(parseFloat(val))}>
                <SelectTrigger className="bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder={t("activity")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1.2">{t("sedentary")}</SelectItem>
                    <SelectItem value="1.375">{t("lightly")}</SelectItem>
                    <SelectItem value="1.55">{t("moderately")}</SelectItem>
                    <SelectItem value="1.725">{t("very")}</SelectItem>
                </SelectContent>
              </Select>
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
                className="p-6 bg-slate-100 dark:bg-slate-900 rounded-3xl border border-blue-500/20 text-center"
              >
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{t("result")}</p>
                <p className="text-5xl font-extrabold text-blue-600 dark:text-blue-400">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {result}
                  </motion.span>
                  <span className="text-xl ml-2">kcal</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}