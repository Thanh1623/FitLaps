import { Link } from "@/i18n/routing";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Dumbbell, Utensils, Scale, Activity, Calculator } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'DashboardMetadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function DashboardPage() {
  const t = useTranslations("Home");
  
  const tools = [
    { 
        href: "/bmi", 
        title: t("bmi_title"), 
        desc: t("bmi_desc"), 
        icon: Scale, 
        color: "text-emerald-500", 
        bg: "bg-emerald-500/10",
        hover: "hover:border-emerald-500 hover:shadow-emerald-500/20" 
    },
    { 
        href: "/tdee", 
        title: t("tdee_title"), 
        desc: t("tdee_desc"), 
        icon: Calculator, 
        color: "text-blue-500", 
        bg: "bg-blue-500/10",
        hover: "hover:border-blue-500 hover:shadow-blue-500/20" 
    },
    { 
        href: "/macro", 
        title: t("macro_title"), 
        desc: t("macro_desc"), 
        icon: Activity, 
        color: "text-purple-500", 
        bg: "bg-purple-500/10",
        hover: "hover:border-purple-500 hover:shadow-purple-500/20" 
    },
    { 
        href: "/workout", 
        title: t("workout_title"), 
        desc: t("workout_desc"), 
        icon: Dumbbell, 
        color: "text-orange-500", 
        bg: "bg-orange-500/10",
        hover: "hover:border-orange-500 hover:shadow-orange-500/20" 
    },
    { 
        href: "/meal-planner", 
        title: t("meal_planner_title"), 
        desc: t("meal_planner_desc"), 
        icon: Utensils, 
        color: "text-emerald-600", 
        bg: "bg-emerald-600/10",
        hover: "hover:border-emerald-600 hover:shadow-emerald-600/20" 
    },
  ];

  return (
    <main className="min-h-screen py-16 px-4 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-500 bg-clip-text text-transparent">
          {t("welcome")}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link key={tool.href} href={tool.href}>
              <Card className={`h-full border-2 transition-all duration-300 ${tool.hover} shadow-lg shadow-transparent hover:shadow-xl dark:bg-slate-900/50`}>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className={`p-3 rounded-2xl ${tool.bg} ${tool.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900 dark:text-slate-100">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 dark:text-slate-400 pt-2">
                  {tool.desc}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
