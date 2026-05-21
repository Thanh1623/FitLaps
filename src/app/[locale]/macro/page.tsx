import MacroCalculator from "@/components/calculators/MacroCalculator";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MacroMetadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function MacroPage() {
  return (
    <main className="min-h-screen py-16 px-4 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-2xl mx-auto">
            <MacroCalculator />
        </div>
    </main>
  );
}
