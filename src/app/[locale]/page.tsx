import { Link } from "@/i18n/routing";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("Landing");

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 px-4 border-b border-slate-200 dark:border-slate-900 bg-gradient-to-b from-slate-100 dark:from-slate-900 to-white dark:to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_50%)]" />
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            ✨ Powered by Llama 3 & next-intl
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:via-teal-300 dark:to-blue-500 bg-clip-text text-transparent max-w-4xl mx-auto">
            {t("hero_title")}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-normal">
            {t("hero_subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link 
              href="/dashboard" 
              className="px-8 py-4 bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600 text-white dark:text-slate-950 font-bold rounded-3xl text-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-emerald-500/20"
            >
              {t("cta_start")}
            </Link>
            <Link 
              href="/dashboard" 
              className="px-8 py-4 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 font-bold rounded-3xl text-lg transition-all"
            >
              {t("cta_explore")}
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-24 px-4 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            {t("feature_title")}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            {t("feature_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card className="border-emerald-500/10 hover:border-emerald-500/20 hover:bg-slate-100 dark:hover:bg-slate-900/30 transition-all p-8 flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-2xl font-bold mb-6 border border-emerald-500/20">
                🤖
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">{t("feat1_title")}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t("feat1_desc")}</p>
            </div>
            <div className="mt-6">
              <Link href="/workout" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold text-sm inline-flex items-center gap-1 group">
                Try Workout AI <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </Card>

          {/* Feature 2 */}
          <Card className="border-blue-500/10 hover:border-blue-500/20 hover:bg-slate-100 dark:hover:bg-slate-900/30 transition-all p-8 flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl font-bold mb-6 border border-blue-500/20">
                ⚡
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">{t("feat2_title")}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t("feat2_desc")}</p>
            </div>
            <div className="mt-6 flex gap-4 text-sm font-semibold text-blue-600 dark:text-blue-400">
              <Link href="/bmi" className="hover:text-blue-500 dark:hover:text-blue-300">BMI</Link>
              <span>•</span>
              <Link href="/tdee" className="hover:text-blue-500 dark:hover:text-blue-300">TDEE</Link>
              <span>•</span>
              <Link href="/macro" className="hover:text-blue-500 dark:hover:text-blue-300">Macros</Link>
            </div>
          </Card>

          {/* Feature 3 */}
          <Card className="border-emerald-500/10 hover:border-emerald-500/20 hover:bg-slate-100 dark:hover:bg-slate-900/30 transition-all p-8 flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-2xl font-bold mb-6 border border-emerald-500/20">
                🌐
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">{t("feat3_title")}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t("feat3_desc")}</p>
            </div>
            <div className="mt-6">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">EN & VI Enabled</span>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white dark:from-slate-950 to-slate-100 dark:to-slate-900 border-t border-slate-200 dark:border-slate-900">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t("cta_banner_title")}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-md max-w-xl mx-auto">
            {t("cta_banner_subtitle")}
          </p>
          <div className="pt-4">
            <Link 
              href="/dashboard" 
              className="px-8 py-4 bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600 text-white dark:text-slate-950 font-bold rounded-3xl text-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-emerald-500/20"
            >
              {t("cta_banner_button")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
