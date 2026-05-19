import BMICalculator from "@/components/calculators/BMICalculator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12 space-y-8">
      <h1 className="text-4xl font-bold">FitLaps Tools</h1>
      <BMICalculator />
    </main>
  );
}