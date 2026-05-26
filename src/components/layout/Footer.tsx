"use client";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

export default function Footer() {
  const t = useTranslations("Footer");
  const pathname = usePathname();

  if (pathname.includes("/auth") || pathname.includes("/admin/login")) return null;
  
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4 col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">FitLaps</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm">
            {t("description")}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{t("links_title")}</h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><Link href="/dashboard" className="hover:text-emerald-600 dark:hover:text-emerald-400">{t("links.dashboard")}</Link></li>
            <li><Link href="/workout" className="hover:text-emerald-600 dark:hover:text-emerald-400">{t("links.workout")}</Link></li>
            <li><Link href="/meal-planner" className="hover:text-emerald-600 dark:hover:text-emerald-400">{t("links.meal_planner")}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{t("legal_title")}</h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">{t("legal.privacy")}</a></li>
            <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">{t("legal.terms")}</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-500">
        {t("copyright")}
      </div>
    </footer>
  );
}
