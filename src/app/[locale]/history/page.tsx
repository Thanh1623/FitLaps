import { getPlanHistory, deletePlanHistory } from "@/app/actions/history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { format } from "date-fns";
import { Dumbbell, Calendar, Target, Clock, Zap, Utensils, Trash2 } from "lucide-react";
import Link from "next/link";
import { getAffiliateRecommendations } from "@/services/affiliate";
import { RecommendationSlider } from "@/components/affiliate/RecommendationSlider";

export default async function HistoryPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { tab?: string };
}) {
  const history = await getPlanHistory();
  const { locale } = await params;
  const { tab } = await searchParams;
  
  const activeTab = tab || 'workout';

  const workoutPlans = history.filter(item => item.planType === 'workout');
  const mealPlans = history.filter(item => item.planType === 'meal');

  const basePlans = activeTab === 'workout' ? workoutPlans : mealPlans;

  const plansToDisplay = await Promise.all(
    basePlans.map(async (item) => {
      const recommendations = await getAffiliateRecommendations(item.planData);
      return { ...item, recommendations };
    })
  );

  return (
    <main className="min-h-screen py-16 px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-slate-900 dark:text-white flex items-center gap-3">
          <Calendar className="w-8 h-8 text-blue-600" />
          Your Plan History
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-200 dark:border-slate-800">
          <Link 
            href={`/${locale}/history?tab=workout`}
            className={`px-6 py-3 font-semibold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'workout' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <Dumbbell className="w-5 h-5" />
            Workout Plans
          </Link>
          <Link 
            href={`/${locale}/history?tab=meal`}
            className={`px-6 py-3 font-semibold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'meal' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <Utensils className="w-5 h-5" />
            Meal Plans
          </Link>
        </div>

        {plansToDisplay.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-600 dark:text-slate-400">No {activeTab} plans found.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {plansToDisplay.map((item) => {
              const plan = item.planData as any;
              
              const isWorkout = item.planType === 'workout';
              const workout = isWorkout ? plan.workoutPlan : null;
              const mealPlan = !isWorkout ? plan.mealPlan : null;

              return (
                <Card key={item.id} className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm">
                  <CardHeader className="bg-slate-100/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white capitalize flex items-center gap-2">
                          {isWorkout ? <Dumbbell className="text-blue-500" /> : <Utensils className="text-emerald-500" />}
                          {item.planType} Plan
                        </CardTitle>
                        <p className="text-sm text-slate-500 mt-1">{format(item.createdAt, 'PPP p')}</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        {isWorkout && (
                            <div className="flex gap-2">
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                {workout?.level || "N/A"}
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                                {workout?.goal || "N/A"}
                                </span>
                            </div>
                        )}
                        <form action={deletePlanHistory.bind(null, item.id)}>
                            <button type="submit" className="p-2 text-red-500 hover:text-red-700 transition-colors">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </form>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {isWorkout ? (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                <Clock className="w-4 h-4 text-blue-500" />
                                {workout?.duration} min
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                <Zap className="w-4 h-4 text-yellow-500" />
                                {workout?.frequency} days/week
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                <Target className="w-4 h-4 text-red-500" />
                                {workout?.equipment}
                            </div>
                            </div>

                            <div className="space-y-4">
                            <h4 className="font-semibold text-slate-900 dark:text-white">Workout Days:</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                {workout?.days?.map((day: any, idx: number) => (
                                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                    <h5 className="font-bold text-blue-600 dark:text-blue-400">{day.day}</h5>
                                    <p className="text-xs text-slate-500 mb-2">{day.targetMuscleGroup}</p>
                                    <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                                    {day.exercises?.map((ex: any, exIdx: number) => (
                                        <li key={exIdx}>• {ex.name} ({ex.sets}x{ex.reps})</li>
                                    ))}
                                    </ul>
                                </div>
                                ))}
                            </div>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <Target className="w-4 h-4 text-emerald-500" />
                                    {mealPlan?.goal}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <Zap className="w-4 h-4 text-yellow-500" />
                                    {mealPlan?.calorieTarget} kcal
                                </div>
                            </div>

                            <h4 className="font-semibold text-slate-900 dark:text-white">Meal Schedule:</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                {mealPlan?.days?.map((day: any, idx: number) => (
                                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                    <h5 className="font-bold text-emerald-600 dark:text-emerald-400">{day.day}</h5>
                                    <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2 mt-2">
                                    {day.meals?.map((meal: any, mIdx: number) => (
                                        <li key={mIdx} className="bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-bold text-slate-800 dark:text-slate-200">{meal.name}</span>
                                                <span className="text-xs text-emerald-600 dark:text-emerald-400 uppercase">{meal.type}</span>
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {meal.calories} kcal | P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g
                                            </div>
                                            {meal.recipe && <p className="mt-2 text-slate-500 italic">{meal.recipe}</p>}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recommendations Section */}
                    {item.recommendations && item.recommendations.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Recommended Products</h4>
                            <RecommendationSlider products={item.recommendations} />
                        </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
