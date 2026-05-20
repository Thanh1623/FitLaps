import { Link } from "@/i18n/routing";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("Home");
  
  const tools = [
    { href: "/bmi", title: t("bmi_title"), desc: t("bmi_desc"), border: "border-emerald-500/20" },
    { href: "/tdee", title: t("tdee_title"), desc: t("tdee_desc"), border: "border-blue-500/20" },
    { href: "/macro", title: t("macro_title"), desc: t("macro_desc"), border: "border-emerald-500/20" },
    { href: "/workout", title: t("workout_title"), desc: t("workout_desc"), border: "border-blue-500/20" },
  ];

  return (
    <main className="min-h-screen py-16 px-4 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-500 bg-clip-text text-transparent">
          {t("welcome")}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href}>
            <Card className={`h-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-all ${tool.border}`}>
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900 dark:text-slate-100">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 dark:text-slate-400">
                {tool.desc}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
