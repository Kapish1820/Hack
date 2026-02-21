import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Star, Truck, Shield, RotateCcw, Store, ChevronRight, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";

import heroBanner from "@/assets/hero-banner.jpg";
import productHeadphones from "@/assets/product-headphones.jpg";
import productTshirt from "@/assets/product-tshirt.jpg";
import productBottle from "@/assets/product-bottle.jpg";
import productWallet from "@/assets/product-wallet.jpg";
import productShoes from "@/assets/product-shoes.jpg";
import productWatch from "@/assets/product-watch.jpg";
import productYogamat from "@/assets/product-yogamat.jpg";
import productMugs from "@/assets/product-mugs.jpg";
import catElectronics from "@/assets/cat-electronics.jpg";
import catFashion from "@/assets/cat-fashion.jpg";
import catHome from "@/assets/cat-home.jpg";
import catFitness from "@/assets/cat-fitness.jpg";

const categories = [
  { name: "Electronics", image: catElectronics, count: "2,400+ items" },
  { name: "Fashion", image: catFashion, count: "5,100+ items" },
  { name: "Home & Kitchen", image: catHome, count: "3,800+ items" },
  { name: "Sports & Fitness", image: catFitness, count: "1,900+ items" },
];

const dealProducts = [
  { id: 1, name: "Wireless Headphones", image: productHeadphones, price: 79.99, original: 129.99, rating: 4.8, reviews: 2341, badge: "Best Seller" },
  { id: 2, name: "Smart Watch Pro", image: productWatch, price: 199.99, original: 299.99, rating: 4.6, reviews: 1892, badge: "Deal" },
  { id: 3, name: "Running Shoes", image: productShoes, price: 89.99, original: 119.99, rating: 4.7, reviews: 956, badge: "-25%" },
  { id: 4, name: "Leather Wallet", image: productWallet, price: 34.99, original: 49.99, rating: 4.5, reviews: 743, badge: "Popular" },
];

const trendingProducts = [
  { id: 5, name: "Organic Cotton T-Shirt", image: productTshirt, price: 29.99, rating: 4.4, reviews: 512 },
  { id: 6, name: "Steel Water Bottle", image: productBottle, price: 24.99, rating: 4.9, reviews: 3210 },
  { id: 7, name: "Premium Yoga Mat", image: productYogamat, price: 39.99, rating: 4.6, reviews: 887 },
  { id: 8, name: "Ceramic Mug Set", image: productMugs, price: 34.99, rating: 4.7, reviews: 654 },
];

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? "fill-accent text-accent" : "text-border"}`}
      />
    ))}
  </div>
);

const ProductCard = ({
  product,
  showOriginal = false,
}: {
  product: { id: number; name: string; image: string; price: number; original?: number; rating: number; reviews: number; badge?: string };
  showOriginal?: boolean;
}) => (
  <Card className="group glass-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="relative aspect-square overflow-hidden bg-secondary">
      <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
      {product.badge && (
        <Badge className="absolute top-3 left-3 gradient-accent text-accent-foreground border-0 text-xs">{product.badge}</Badge>
      )}
      <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card">
        <Heart className="h-4 w-4 text-foreground" />
      </button>
    </div>
    <CardContent className="p-4 space-y-2">
      <h3 className="font-medium text-sm line-clamp-2 group-hover:text-accent transition-colors">{product.name}</h3>
      <div className="flex items-center gap-2">
        <Stars rating={product.rating} />
        <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
        {showOriginal && product.original && (
          <span className="text-sm text-muted-foreground line-through">${product.original.toFixed(2)}</span>
        )}
      </div>
    </CardContent>
  </Card>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-primary">
        <div className="container mx-auto flex items-center h-14 gap-4 px-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-accent">
              <Store className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="text-lg font-bold text-primary-foreground">StorePro</span>
          </Link>

          <div className="flex-1 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products, brands, categories..." className="pl-9 bg-primary-foreground border-0 h-10" />
            </div>
          </div>

          <nav className="flex items-center gap-3 shrink-0">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                Sign In
              </Button>
            </Link>
            <Link to="/checkout">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full gradient-accent text-[10px] font-bold flex items-center justify-center text-accent-foreground">3</span>
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[420px] overflow-hidden">
        <img src={heroBanner} alt="Featured products" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-lg animate-fade-in">
            <Badge className="gradient-accent text-accent-foreground border-0 mb-4">New Arrivals</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
              Discover Products You'll Love
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-6">
              Up to 40% off on thousands of items. Free shipping on orders over $50.
            </p>
            <div className="flex gap-3">
              <Link to="/products">
                <Button className="gradient-accent text-accent-foreground hover:opacity-90 transition-opacity px-6 h-11 text-base">
                  Shop Now
                </Button>
              </Link>
              <Link to="/signup">
              <Button variant="outline" className="border-primary-foreground/50 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 px-6 h-11 text-base">
                  Join Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: "Free Shipping", sub: "On orders $50+" },
              { icon: Shield, label: "Secure Payment", sub: "256-bit encryption" },
              { icon: RotateCcw, label: "Easy Returns", sub: "30-day policy" },
              { icon: Star, label: "Top Rated", sub: "4.8/5 average" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 justify-center text-center md:text-left">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{label}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Link to="/products" className="text-sm text-accent font-medium hover:underline flex items-center gap-1">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link to="/products" key={cat.name}>
              <Card className="group overflow-hidden glass-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-44 overflow-hidden">
                  <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-primary-foreground font-semibold">{cat.name}</p>
                    <p className="text-primary-foreground/70 text-xs">{cat.count}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Today's Deals */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Today's Deals</h2>
              <p className="text-sm text-muted-foreground">Limited-time offers ending soon</p>
            </div>
            <Link to="/products" className="text-sm text-accent font-medium hover:underline flex items-center gap-1">
              See All Deals <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dealProducts.map((product) => (
              <ProductCard key={product.id} product={product} showOriginal />
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Trending Now</h2>
            <p className="text-sm text-muted-foreground">Popular picks this week</p>
          </div>
          <Link to="/products" className="text-sm text-accent font-medium hover:underline flex items-center gap-1">
            Explore More <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary">
        <div className="container mx-auto px-4 py-14 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-3">Ready to start shopping?</h2>
          <p className="text-primary-foreground/70 mb-6 max-w-md mx-auto">
            Create a free account and get exclusive deals, track orders, and more.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/signup">
              <Button className="gradient-accent text-accent-foreground hover:opacity-90 transition-opacity px-8 h-11">
                Create Account
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 h-11">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-accent">
                  <Store className="h-3.5 w-3.5 text-accent-foreground" />
                </div>
                <span className="font-bold">StorePro</span>
              </div>
              <p className="text-sm text-muted-foreground">Your one-stop shop for quality products at great prices.</p>
            </div>
            {[
              { title: "Shop", links: ["All Products", "Deals", "New Arrivals", "Best Sellers"] },
              { title: "Support", links: ["Help Center", "Returns", "Shipping", "Contact Us"] },
              { title: "Company", links: ["About Us", "Careers", "Blog", "Press"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-sm mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
            © 2026 StorePro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
