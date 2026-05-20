"use client";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: 'en' | 'vi') => {
    router.replace(pathname, { locale: newLocale });
  };

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/dashboard", label: t("dashboard") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-2 sm:px-4">
        <Link href="/" className="font-bold text-xl sm:text-2xl text-emerald-600 dark:text-emerald-500 tracking-tight flex-shrink-0">
          FitLaps
        </Link>
        <nav className="flex items-center gap-1 sm:gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`text-xs sm:text-sm font-medium transition-colors px-1 sm:px-2 ${
                (pathname === "/" && link.href === "/") || (pathname.startsWith("/dashboard") && link.href === "/dashboard")
                  ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                  : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-1 sm:gap-2 ml-1 sm:ml-2 border-l border-slate-200 dark:border-slate-800 pl-2 sm:pl-4">
            <ThemeToggle />
            <button 
              onClick={() => switchLocale(locale === 'en' ? 'vi' : 'en')} 
              className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {locale.toUpperCase()}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
