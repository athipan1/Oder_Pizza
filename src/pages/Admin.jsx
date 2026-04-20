import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  Truck,
  ChefHat,
  CheckCircle,
  Phone,
  MapPin,
  Eye,
  X,
  Plus,
  Pencil,
  Trash2,
  Package
} from 'lucide-react';

const Admin = () => {
  const {
    orders,
    updateOrderStatus,
    products,
    addProduct,
    updateProduct,
    deleteProduct
  } = useStore();
  const [activeTab, setActiveTab] = useState('orders'); // orders, menu
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'pizza',
    image: ''
  });

  const statusMap = {
    pending: { label: 'รอชำระเงิน', color: 'bg-yellow-100 text-yellow-700', icon: <Clock size={16} /> },
    paid: { label: 'ชำระแล้ว', color: 'bg-blue-100 text-blue-700', icon: <CheckCircle2 size={16} /> },
    cooking: { label: 'กำลังทำ', color: 'bg-orange-100 text-orange-700', icon: <ChefHat size={16} /> },
    sent: { label: 'ส่งแล้ว', color: 'bg-purple-100 text-purple-700', icon: <Truck size={16} /> },
    completed: { label: 'เสร็จสิ้น', color: 'bg-green-100 text-green-700', icon: <CheckCircle size={16} /> },
  };

  const getStatusBadge = (status) => {
    const config = statusMap[status] || statusMap.pending;
    return (
      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${config.color}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  const handleOpenProductModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setProductForm(product);
    } else {
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        price: '',
        category: 'pizza',
        image: ''
      });
    }
    setIsProductModalOpen(true);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(productForm);
    } else {
      addProduct(productForm);
    }
    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบเมนูนี้?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'orders' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <ClipboardList size={20} />
          ออเดอร์
        </button>
        <button
          onClick={() => setActiveTab('menu')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'menu' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Package size={20} />
          จัดการเมนู
        </button>
      </div>

      {activeTab === 'orders' ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <ClipboardList className="text-primary" />
              รายการออเดอร์ทั้งหมด
            </h1>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm font-bold">
              {orders.length} ออเดอร์
            </span>
          </div>

          <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">ยังไม่มีรายการสั่งซื้อเข้ามา</p>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="card p-4 space-y-4 relative">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-400 font-medium">#{order.id}</p>
                  <h3 className="font-bold text-gray-800 text-lg">{order.customer.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Phone size={14} />
                    <span>{order.customer.phone}</span>
                  </div>
                </div>
                {getStatusBadge(order.status)}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">ยอดรวม</p>
                  <p className="text-xl font-bold text-primary">฿{order.total.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="flex items-center gap-2 text-primary font-bold hover:bg-orange-50 px-4 py-2 rounded-xl transition-colors"
                >
                  <Eye size={20} />
                  ดูรายละเอียด
                </button>
              </div>
            </div>
          ))
        )}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Package className="text-primary" />
              จัดการรายการอาหาร
            </h1>
            <button
              onClick={() => handleOpenProductModal()}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              เพิ่มเมนู
            </button>
          </div>

          <div className="grid gap-4">
            {products.map(product => (
              <div key={product.id} className="card p-4 flex gap-4 items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-xl shrink-0"
                />
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-800">{product.name}</h3>
                  <p className="text-primary font-bold">฿{product.price}</p>
                  <p className="text-xs text-gray-400 capitalize">{product.category}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenProductModal(product)}
                    className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[110] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                {editingProduct ? 'แก้ไขเมนู' : 'เพิ่มเมนูใหม่'}
              </h2>
              <button onClick={() => setIsProductModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleProductSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label htmlFor="product-name" className="text-sm font-medium text-gray-700">ชื่อเมนู</label>
                <input
                  id="product-name"
                  required
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="product-price" className="text-sm font-medium text-gray-700">ราคา (บาท)</label>
                  <input
                    id="product-price"
                    required
                    type="number"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="product-category" className="text-sm font-medium text-gray-700">หมวดหมู่</label>
                  <select
                    id="product-category"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none"
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  >
                    <option value="pizza">พิซซ่า</option>
                    <option value="somtum">ส้มตำ/ไก่ย่าง</option>
                    <option value="drinks">เครื่องดื่ม</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="product-description" className="text-sm font-medium text-gray-700">คำอธิบาย</label>
                <textarea
                  id="product-description"
                  rows="2"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="product-image" className="text-sm font-medium text-gray-700">URL รูปภาพ</label>
                <input
                  id="product-image"
                  required
                  type="url"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                />
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full btn-primary py-3 text-lg">
                  {editingProduct ? 'บันทึกการแก้ไข' : 'เพิ่มเมนู'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-3xl shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-gray-800">รายละเอียดออเดอร์ #{selectedOrder.id}</h2>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Order Status Update */}
              <section className="space-y-3">
                <h3 className="font-bold text-gray-800">เปลี่ยนสถานะออเดอร์</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(statusMap).map(([status, config]) => (
                    <button
                      key={status}
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, status);
                        setSelectedOrder({ ...selectedOrder, status });
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                        selectedOrder.status === status
                          ? config.color + ' ring-2 ring-offset-1 ring-current'
                          : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      {config.icon}
                      {config.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Customer Info */}
              <section className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-800">ข้อมูลลูกค้า</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-400">ชื่อ:</span> {selectedOrder.customer.name}</p>
                    <p><span className="text-gray-400">เบอร์โทร:</span> {selectedOrder.customer.phone}</p>
                    <p><span className="text-gray-400">วิธีรับ:</span> {selectedOrder.customer.deliveryMethod === 'delivery' ? 'เดลิเวอรี่' : 'รับหน้าร้าน'}</p>
                    {selectedOrder.customer.address && (
                      <div className="flex gap-2">
                        <MapPin size={16} className="text-gray-400 shrink-0" />
                        <p>{selectedOrder.customer.address}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-800">การชำระเงิน</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-400">วิธีชำระ:</span> {selectedOrder.customer.paymentMethod}</p>
                    {selectedOrder.slip && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-400 mb-1">หลักฐานการโอน:</p>
                        <img
                          src={selectedOrder.slip}
                          alt="Slip"
                          className="w-32 h-40 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => window.open(selectedOrder.slip)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Items */}
              <section className="space-y-3">
                <h3 className="font-bold text-gray-800">รายการอาหาร</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 flex items-center justify-center bg-white rounded-lg font-bold text-primary border border-gray-100">
                          {item.quantity}
                        </span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="font-bold text-gray-700">฿{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4 px-3">
                    <span className="font-bold text-gray-800">ราคารวมทั้งสิ้น</span>
                    <span className="text-2xl font-bold text-primary">฿{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
