import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { prisma } from "@/lib/db";
import { addProduct, deleteProduct } from "@/app/actions/admin";
import { Trash2 } from "lucide-react";
import CategorySelector from "@/components/admin/CategorySelector";

export default async function AdminDashboardPage() {
  const products = await prisma.product.findMany({
    include: {
      _count: {
        select: { clickLogs: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const totalClicks = products.reduce((acc, p) => acc + p._count.clickLogs, 0);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <CardHeader><CardTitle>Total Products</CardTitle></CardHeader>
            <CardContent><p className="text-4xl font-bold">{products.length}</p></CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Total Clicks</CardTitle></CardHeader>
            <CardContent><p className="text-4xl font-bold text-blue-600">{totalClicks}</p></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Add New Product</CardTitle></CardHeader>
        <CardContent>
            <form action={addProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" placeholder="Name" className="p-2 border rounded dark:bg-slate-900" required />
                <input name="affiliateLink" placeholder="Link" className="p-2 border rounded dark:bg-slate-900" required />
                <input name="price" placeholder="Price" type="number" className="p-2 border rounded dark:bg-slate-900" required />
                <CategorySelector />
                <textarea name="description" placeholder="Description" className="p-2 border rounded dark:bg-slate-900 md:col-span-2" />
                <button className="bg-blue-600 text-white p-3 rounded-xl col-span-2 hover:bg-blue-700 transition">Add Product</button>
            </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Products Management</CardTitle></CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                      <tr className="border-b dark:border-slate-800 text-slate-500 text-sm">
                        <th className="p-3">Name</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Clicks</th>
                        <th className="p-3">Link</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id} className="border-b dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition">
                                <td className="p-3 font-medium">{p.name}</td>
                                <td className="p-3 text-sm text-slate-600 dark:text-slate-400">{p.category}</td>
                                <td className="p-3 text-sm">${p.price?.toString()}</td>
                                <td className="p-3 font-bold text-blue-600">{p._count.clickLogs}</td>
                                <td className="p-3 text-sm max-w-[200px] truncate text-slate-500">{p.affiliateLink}</td>
                                <td className="p-3">
                                    <form action={deleteProduct.bind(null, p.id)}>
                                        <button className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18}/></button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
