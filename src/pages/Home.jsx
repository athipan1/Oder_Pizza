import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Plus, Search } from 'lucide-react';

const Home = () => {
  const { products, addToCart } = useStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'ทั้งหมด' },
    { id: 'pizza', name: 'พิซซ่า' },
    { id: 'somtum', name: 'ส้มตำ/ไก่ย่าง' },
    { id: 'drinks', name: 'เครื่องดื่ม' },
  ];

  const filteredItems = products.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">อร่อยแซ่บ พีซซ่า & ส้มตำ</h1>
        <p className="text-gray-500">อาหารอร่อย สดใหม่ ส่งตรงถึงโต๊ะคุณ</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="ค้นหาเมนูอาหาร..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all font-medium ${
              activeCategory === category.id
                ? 'bg-primary text-white shadow-md shadow-orange-200'
                : 'bg-white text-gray-600 border border-gray-100 hover:bg-orange-50'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="card group">
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                <span className="text-primary font-bold text-lg">฿{item.price}</span>
              </div>
              <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
              <button
                onClick={() => addToCart(item)}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-orange-50 text-primary font-bold py-2 rounded-xl hover:bg-primary hover:text-white transition-all active:scale-95"
              >
                <Plus size={20} />
                เพิ่มลงตะกร้า
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">ไม่พบเมนูที่คุณค้นหา...</p>
        </div>
      )}
    </div>
  );
};

export default Home;
