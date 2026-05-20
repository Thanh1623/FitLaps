import TDEECalculator from "@/components/calculators/TDEECalculator";

export default function TDEEPage() {
  return (
    <main className="min-h-screen py-16 px-4 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-2xl mx-auto">
            <TDEECalculator />
        </div>
    </main>
  );
}
