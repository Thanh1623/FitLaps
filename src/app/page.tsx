import BMICalculator from "@/components/calculators/BMICalculator";
import TDEECalculator from "@/components/calculators/TDEECalculator";
import MacroCalculator from "@/components/calculators/MacroCalculator";
import WorkoutForm from "@/components/ai/WorkoutForm";

export default function Home() {
  return (
    <main className="min-h-screen p-12 space-y-12">
      <h1 className="text-4xl font-bold text-center">FitLaps Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <BMICalculator />
        <TDEECalculator />
        <MacroCalculator />
      </div>
      <section className="mt-12">
        <WorkoutForm />
      </section>
    </main>
  );
}