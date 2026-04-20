import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, LayoutDashboard, UtensilsCrossed } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Navbar = () => {
  const { cart } = useStore();
  const location = useLocation();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-4xl">
        <Link to="/" className="flex items-center gap-2">
          <UtensilsCrossed className="text-primary w-8 h-8" />
          <span className="font-bold text-xl text-gray-800">อร่อยแซ่บ</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/admin" className={`p-2 rounded-full transition-colors ${location.pathname === '/admin' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-orange-50'}`}>
            <LayoutDashboard size={24} />
          </Link>
          <Link to="/cart" className="relative p-2 text-gray-500 hover:bg-orange-50 rounded-full transition-colors">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
