import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock } from "lucide-react";
import { toast } from "sonner";

const Payment = () => {
  const [processing, setProcessing] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      toast.success("Payment successful! Order confirmed.");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Payment</h1>
        <p className="text-muted-foreground">Complete your purchase securely</p>
      </div>

      <div className="grid gap-6">
        {/* Payment Form */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Card Details
            </CardTitle>
            <CardDescription>Your payment info is encrypted and secure</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePayment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input id="cardName" placeholder="John Patel" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="4242 4242 4242 4242" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" required />
                </div>
              </div>

              <Separator />

              {/* Order total */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>$249.96</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>$20.00</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg pt-1">
                  <span>Total</span>
                  <span>$269.96</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={processing}
                className="w-full gradient-accent text-accent-foreground hover:opacity-90 transition-opacity gap-2"
              >
                <Lock className="h-4 w-4" />
                {processing ? "Processing..." : "Pay $269.96"}
              </Button>

              <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                <Lock className="h-3 w-3" />
                Secured with 256-bit SSL encryption
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
