import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="p-4 border-t text-center">
      {t("copyright")}
    </footer>
  );
}