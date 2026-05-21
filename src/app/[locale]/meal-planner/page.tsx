import MealPlannerForm from "@/components/ai/MealPlannerForm";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MealPlannerMetadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function MealPlannerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  return (
    <main className="min-h-screen py-16 px-4 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-slate-900 dark:text-white">{t('meal_planner_title')}</h1>
            <MealPlannerForm />
        </div>
    </main>
  );
}
