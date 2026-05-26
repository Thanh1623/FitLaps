import { prisma } from "@/lib/db";
import { addProduct, deleteProduct } from "@/app/actions/admin";
import { Trash2, Plus, BarChart3, Package } from "lucide-react";
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
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
                <Package size={24} />
            </div>
            <div>
                <p className="text-sm text-slate-500">Total Products</p>
                <p className="text-2xl font-bold">{products.length}</p>
            </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                <BarChart3 size={24} />
            </div>
            <div>
                <p className="text-sm text-slate-500">Total Clicks</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalClicks}</p>
            </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Add New Product</h2>
        <form action={addProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Product Name</label>
                <input name="name" placeholder="Product Name" className="p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" required />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Affiliate Link</label>
                <input name="affiliateLink" placeholder="Affiliate Link" className="p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" required />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Product Image</label>
                <input 
                    type="file" 
                    name="image" 
                    accept="image/*" 
                    className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-emerald-50 file:text-emerald-700
                        dark:file:bg-emerald-900/30 dark:file:text-emerald-400
                        hover:file:bg-emerald-100 dark:hover:file:bg-emerald-900/50
                        cursor-pointer
                        p-2 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800" 
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Price ($)</label>
                <input name="price" placeholder="Price" type="number" step="0.01" className="p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" required />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                <CategorySelector />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
                <textarea name="description" placeholder="Description" className="p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <button className="flex items-center justify-center gap-2 bg-emerald-600 text-white p-3 rounded-xl col-span-2 hover:bg-emerald-700 transition font-semibold">
                <Plus size={20} /> Add Product
            </button>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <h2 className="text-xl font-bold p-6 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">Products Management</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm uppercase">
                    <tr>
                        <th className="px-6 py-4">Image</th>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Clicks</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {products.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                            <td className="px-6 py-4">
                                {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-16 h-16 object-cover rounded-lg" />}
                            </td>
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{p.name}</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{p.category}</td>
                            <td className="px-6 py-4 text-sm">${p.price?.toString()}</td>
                            <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">{p._count.clickLogs}</td>
                            <td className="px-6 py-4 flex justify-end">
                                <form action={deleteProduct.bind(null, p.id)}>
                                    <button className="text-red-600 dark:text-red-400 hover:text-red-800 p-2"><Trash2 size={18}/></button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
