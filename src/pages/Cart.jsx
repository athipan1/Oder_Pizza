import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useStore();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
        <div className="bg-orange-50 p-6 rounded-full text-primary">
          <ShoppingBag size={64} />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">ตะกร้าว่างเปล่า</h2>
          <p className="text-gray-500">คุณยังไม่ได้เลือกเมนูความอร่อยเลย</p>
        </div>
        <Link to="/" className="btn-primary mt-4">
          ไปที่หน้าเมนู
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">ตะกร้าของคุณ</h1>

      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.id} className="card p-4 flex gap-4 items-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-xl shrink-0"
            />
            <div className="flex-grow space-y-1">
              <h3 className="font-bold text-gray-800">{item.name}</h3>
              <p className="text-primary font-bold">฿{item.price}</p>

              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="p-1 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="font-medium min-w-[1.5rem] text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="p-1 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex justify-between items-center text-lg">
          <span className="text-gray-600 font-medium">ราคารวมทั้งหมด</span>
          <span className="text-2xl font-bold text-primary font-bold">฿{total.toLocaleString()}</span>
        </div>
        <Link
          to="/checkout"
          className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-4 rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-100"
        >
          สั่งซื้อเลย
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Cart;
