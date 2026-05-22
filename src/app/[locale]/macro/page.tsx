import MacroCalculator from "@/components/calculators/MacroCalculator";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MacroMetadata' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://fitlaps.com/${locale}/macro`,
      type: "website",
    },
  };
}

export default async function MacroPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Macro Calculator",
    "description": "Calculate your daily macronutrient needs for weight loss, maintenance, or muscle gain.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <main className="min-h-screen py-16 px-4 bg-white dark:bg-slate-950 transition-colors duration-300">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-slate-900 dark:text-white">{t('macro_title')}</h1>
            <MacroCalculator />
        </div>
    </main>
  );
}
