import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreHorizontal } from "lucide-react";

import productHeadphones from "@/assets/product-headphones.jpg";
import productTshirt from "@/assets/product-tshirt.jpg";
import productBottle from "@/assets/product-bottle.jpg";
import productWallet from "@/assets/product-wallet.jpg";
import productShoes from "@/assets/product-shoes.jpg";
import productWatch from "@/assets/product-watch.jpg";
import productYogamat from "@/assets/product-yogamat.jpg";
import productMugs from "@/assets/product-mugs.jpg";

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  image: string;
}
const initialProducts: Product[] = [
  { id: 1, name: "Wireless Headphones", sku: "WH-001", price: 79.99, stock: 142, category: "Electronics", status: "In Stock", image: productHeadphones },
  { id: 2, name: "Organic Cotton T-Shirt", sku: "TS-042", price: 29.99, stock: 8, category: "Apparel", status: "Low Stock", image: productTshirt },
  { id: 3, name: "Stainless Steel Bottle", sku: "BT-015", price: 24.99, stock: 230, category: "Accessories", status: "In Stock", image: productBottle },
  { id: 4, name: "Leather Wallet", sku: "LW-008", price: 49.99, stock: 0, category: "Accessories", status: "Out of Stock", image: productWallet },
  { id: 5, name: "Running Shoes Pro", sku: "RS-023", price: 119.99, stock: 65, category: "Footwear", status: "In Stock", image: productShoes },
  { id: 6, name: "Smart Watch Band", sku: "SW-007", price: 19.99, stock: 4, category: "Electronics", status: "Low Stock", image: productWatch },
  { id: 7, name: "Yoga Mat Premium", sku: "YM-011", price: 39.99, stock: 87, category: "Fitness", status: "In Stock", image: productYogamat },
  { id: 8, name: "Ceramic Mug Set", sku: "CM-019", price: 34.99, stock: 54, category: "Home", status: "In Stock", image: productMugs },
];

const statusVariant: Record<string, string> = {
  "In Stock": "bg-success/10 text-success border-success/20",
  "Low Stock": "bg-accent/10 text-accent border-accent/20",
  "Out of Stock": "bg-destructive/10 text-destructive border-destructive/20",
};

const Products = () => {
  const [search, setSearch] = useState("");
  const filtered = initialProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Button className="gradient-accent text-accent-foreground hover:opacity-90 transition-opacity gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <Card className="glass-card overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">SKU</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</th>
                  <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price</th>
                  <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Stock</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="p-4 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-muted overflow-hidden">
                          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                        </div>
                        <span className="font-medium text-sm">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground font-mono">{product.sku}</td>
                    <td className="p-4 text-sm text-muted-foreground">{product.category}</td>
                    <td className="p-4 text-sm font-semibold text-right">${product.price.toFixed(2)}</td>
                    <td className="p-4 text-sm text-right">{product.stock}</td>
                    <td className="p-4">
                      <Badge variant="outline" className={statusVariant[product.status]}>
                        {product.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <button className="p-1 rounded-md hover:bg-muted transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
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
};

export default Products;
