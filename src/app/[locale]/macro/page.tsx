import MacroCalculator from "@/components/calculators/MacroCalculator";

export default function MacroPage() {
  return (
    <main className="min-h-screen py-16 px-4 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-2xl mx-auto">
            <MacroCalculator />
        </div>
    </main>
  );
}
