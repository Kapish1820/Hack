import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
navigate("/dashboard")

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

const initialCart: CartItem[] = [
  { id: 1, name: "Wireless Headphones", price: 79.99, qty: 1 },
  { id: 3, name: "Stainless Steel Bottle", price: 24.99, qty: 2 },
  { id: 5, name: "Running Shoes Pro", price: 119.99, qty: 1 },
];

const Checkout = () => {
  const [cart, setCart] = useState(initialCart);
 

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const remove = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id));

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
        <p className="text-muted-foreground">Review your order before payment</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card key={item.id} className="glass-card">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-xs font-mono">
                  IMG
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="h-8 w-8 rounded-md border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="h-8 w-8 rounded-md border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <p className="font-semibold w-20 text-right">${(item.price * item.qty).toFixed(2)}</p>
                <button onClick={() => remove(item.id)} className="p-2 hover:bg-destructive/10 rounded-md transition-colors">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="glass-card h-fit sticky top-20">
          <CardHeader>
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="promo">Promo Code</Label>
              <div className="flex gap-2">
                <Input id="promo" placeholder="Enter code" />
                <Button variant="outline">Apply</Button>
              </div>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-success">Free</span>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button
              onClick={() => navigate("/payment")}
              className="w-full gradient-accent text-accent-foreground hover:opacity-90 transition-opacity"
            >
              Proceed to Payment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
