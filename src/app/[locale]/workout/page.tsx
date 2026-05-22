import WorkoutForm from "@/components/ai/WorkoutForm";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'WorkoutMetadata' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://fitlaps.com/${locale}/workout`,
      type: "website",
    },
  };
}

export default async function WorkoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Workout Generator",
    "description": "Generate personalized workout plans based on your goals, fitness level, and available equipment.",
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
            <h1 className="text-4xl font-extrabold text-center mb-8 text-slate-900 dark:text-white">{t('workout_title')}</h1>
            <WorkoutForm />
        </div>
    </main>
  );
}
