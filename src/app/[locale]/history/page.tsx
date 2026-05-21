import { getPlanHistory } from "@/app/actions/history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { format } from "date-fns";

export default async function HistoryPage() {
  const history = await getPlanHistory();

  return (
    <main className="min-h-screen py-16 px-4 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-extrabold mb-8 text-slate-900 dark:text-white">Your Plan History</h1>
            
            {history.length === 0 ? (
                <p className="text-slate-600 dark:text-slate-400">No saved plans found.</p>
            ) : (
                <div className="grid gap-6">
                    {history.map((item) => (
                        <Card key={item.id}>
                            <CardHeader>
                                <CardTitle className="text-xl capitalize">{item.planType} Plan</CardTitle>
                                <p className="text-sm text-slate-500">{format(item.createdAt, 'PPP p')}</p>
                            </CardHeader>
                            <CardContent>
                                <pre className="text-xs bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto">
                                    {JSON.stringify(item.planData, null, 2)}
                                </pre>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    </main>
  );
}
