import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { CreditCard, Truck, Store, Upload, CheckCircle2 } from 'lucide-react';

const Checkout = () => {
  const { cart, addOrder } = useStore();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryMethod: 'delivery', // delivery, pickup
    paymentMethod: 'promptpay', // promptpay, transfer, cod
  });

  const [slip, setSlip] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSlip(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = addOrder({
      customer: formData,
      slip: slip
    });
    navigate('/success', { state: { orderId: order.id } });
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="space-y-6 pb-10">
      <h1 className="text-2xl font-bold text-gray-800">ข้อมูลการสั่งซื้อ</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Customer Info */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">1</span>
            ข้อมูลผู้ติดต่อ
          </h2>
          <div className="grid gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">ชื่อ-นามสกุล</label>
              <input
                required
                type="text"
                name="name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="กรอกชื่อของคุณ"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">เบอร์โทรศัพท์</label>
              <input
                required
                type="tel"
                name="phone"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="08X-XXX-XXXX"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Delivery Method */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">2</span>
            วิธีรับสินค้า
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, deliveryMethod: 'delivery' }))}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                formData.deliveryMethod === 'delivery' ? 'border-primary bg-orange-50 text-primary' : 'border-gray-100 bg-white text-gray-500'
              }`}
            >
              <Truck size={24} />
              <span className="font-bold">เดลิเวอรี่</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, deliveryMethod: 'pickup' }))}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                formData.deliveryMethod === 'pickup' ? 'border-primary bg-orange-50 text-primary' : 'border-gray-100 bg-white text-gray-500'
              }`}
            >
              <Store size={24} />
              <span className="font-bold">รับหน้าร้าน</span>
            </button>
          </div>
          {formData.deliveryMethod === 'delivery' && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">ที่อยู่จัดส่ง</label>
              <textarea
                required
                name="address"
                rows="3"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="กรอกที่อยู่จัดส่งโดยละเอียด"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          )}
        </section>

        {/* Payment Method */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">3</span>
            วิธีชำระเงิน
          </h2>
          <div className="grid gap-3">
            {[
              { id: 'promptpay', name: 'สแกน QR PromptPay', icon: <CreditCard size={20} /> },
              { id: 'transfer', name: 'โอนบัญชีธนาคาร', icon: <CreditCard size={20} /> },
              { id: 'cod', name: 'เก็บเงินปลายทาง', icon: <Truck size={20} /> },
            ].map(method => (
              <label
                key={method.id}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === method.id ? 'border-primary bg-orange-50 ring-1 ring-primary' : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={formData.paymentMethod === method.id}
                  onChange={handleChange}
                  className="hidden"
                />
                <div className={`text-primary ${formData.paymentMethod === method.id ? 'opacity-100' : 'opacity-40'}`}>
                  {method.icon}
                </div>
                <span className={`font-medium ${formData.paymentMethod === method.id ? 'text-primary' : 'text-gray-700'}`}>
                  {method.name}
                </span>
                {formData.paymentMethod === method.id && <CheckCircle2 className="ml-auto text-primary" size={20} />}
              </label>
            ))}
          </div>

          {(formData.paymentMethod === 'promptpay' || formData.paymentMethod === 'transfer') && (
            <div className="mt-4 p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-300 space-y-4 text-center">
              <div className="space-y-1">
                <p className="font-bold text-gray-800">ธนาคารกสิกรไทย</p>
                <p className="text-xl font-bold text-primary tracking-wider">012-3-45678-9</p>
                <p className="text-sm text-gray-500">นายสมชาย อร่อยมาก</p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-2">อัปโหลดสลิปชำระเงิน</p>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer hover:bg-gray-100 transition-colors relative overflow-hidden">
                  {slip ? (
                    <img src={slip} alt="Slip" className="w-full h-full object-contain p-2" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500 font-medium">กดเพื่อเลือกไฟล์ภาพ</p>
                    </div>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              </div>
            </div>
          )}
        </section>

        {/* Order Summary Button */}
        <div className="pt-4 sticky bottom-4 z-10">
          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-4 rounded-2xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-200 flex justify-between px-8"
          >
            <span>ยืนยันการสั่งซื้อ</span>
            <span>฿{total.toLocaleString()}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
