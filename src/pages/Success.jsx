import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';

const Success = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || 'N/A';

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-8 text-center">
      <div className="relative">
        <div className="bg-green-100 p-8 rounded-full text-green-600 animate-bounce">
          <CheckCircle size={80} />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full border-4 border-white">
          <ShoppingBag size={24} />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">สั่งซื้อสำเร็จ!</h1>
        <p className="text-gray-500">ขอบคุณที่เลือกใช้บริการ อร่อยแซ่บ พีซซ่า & ส้มตำ</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm w-full max-w-sm space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-50">
          <span className="text-gray-500">หมายเลขออเดอร์</span>
          <span className="font-bold text-gray-800">#{orderId}</span>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-400">สถานะปัจจุบัน</p>
          <p className="font-bold text-orange-500">รอดำเนินการ</p>
        </div>
        <p className="text-sm text-gray-500 pt-2">
          พนักงานกำลังตรวจสอบคำสั่งซื้อของคุณ <br />
          คุณสามารถแจ้งเบอร์โทรเพื่อสอบถามได้ที่ <br />
          <span className="font-bold text-gray-700">081-234-5678</span>
        </p>
      </div>

      <div className="flex flex-col w-full gap-3 max-w-sm">
        <Link to="/" className="btn-primary flex items-center justify-center gap-2 py-4">
          <Home size={20} />
          กลับสู่หน้าหลัก
        </Link>
      </div>
    </div>
  );
};

export default Success;
