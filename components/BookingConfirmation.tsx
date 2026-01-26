import React, { useState, useRef } from 'react';
import { BookingData } from '../types';
import { COLORS } from '../constants';
import { ArrowLeft, MoreVertical } from 'lucide-react';

interface BookingConfirmationProps {
  booking: BookingData;
  onBack: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ booking, onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0); 
  const touchStart = useRef<number | null>(null);

  const formatDate = (dateStr: string, offset: number = 0) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + offset);
    const day = date.getDate().toString().padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart.current - touchEnd;

    if (diff > 50) {
      setCurrentSlide(1);
    } else if (diff < -50) {
      setCurrentSlide(0);
    }
    touchStart.current = null;
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f5f5f5] relative font-sans">
      {/* App Bar / Header using the stable brand color */}
      <header className="relative flex items-center justify-between px-4 h-14 text-white shadow-md z-10 bg-custom-purple">
        <button onClick={onBack} className="p-1 active:opacity-60 transition-opacity z-20">
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
        
        <h1 className="absolute inset-0 flex items-center justify-center text-[18px] font-bold tracking-tight pointer-events-none uppercase">
          BOOK SEAT
        </h1>

        <button className="p-1 z-20">
          <MoreVertical size={24} />
        </button>
      </header>

      <main className="flex-1 p-4 flex flex-col items-center">
        <div className="w-full rounded-lg p-4 mb-4 shadow-sm" style={{ backgroundColor: COLORS.bannerBg }}>
          <p className="text-gray-800 text-[14px] leading-snug font-normal">
            <span className="font-bold">Time Slot based seat booking is now live!</span>
            <br />
            <span className="font-medium underline decoration-1" style={{ color: COLORS.linkText }}>
              Click Here
            </span> to choose cities/DCs where time slot-based seat booking is enabled.
          </p>
        </div>

        <div 
          className="w-full bg-white rounded-md border border-gray-200 shadow-sm p-5 relative select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="mb-2">
            <h2 className="text-[16px] font-bold text-gray-900">Recent Booking</h2>
          </div>

          <div className="flex items-center justify-between mb-6 min-h-[32px]">
            <span className="text-[12px] text-gray-500 font-medium transition-opacity duration-300">
              {formatDate(booking.date, currentSlide)}
            </span>
            
            <div className="flex items-center gap-3">
              {/* BOOKED Badge - Precisely centered */}
              <div 
                className="flex items-center justify-center px-4 h-[26px] rounded-full text-[12px] font-bold border tracking-wider whitespace-nowrap leading-none"
                style={{ 
                  color: COLORS.badgeText, 
                  borderColor: COLORS.badgeBorder,
                  backgroundColor: 'transparent'
                }}
              >
                BOOKED
              </div>
              <button className="text-gray-500">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-0.5 mb-6">
            <p className="text-[15px] font-bold text-gray-900">
              Cubicle: MUM02 01 04 A {booking.seatNumber}
            </p>
            <p className="text-[13px] text-gray-500 font-normal">
              Mumbai, ILMUMBAISTP, SDB01, {booking.slot},
            </p>
            <p className="text-[13px] text-gray-500 font-normal">
              {booking.timeRange} Floor, A Wing
            </p>
          </div>

          <div className="flex justify-center gap-1.5 mt-2">
            <div className="w-1.5 h-1.5 rounded-full transition-colors duration-300" style={{ backgroundColor: currentSlide === 0 ? COLORS.primary : '#D1D5DB' }}></div>
            <div className="w-1.5 h-1.5 rounded-full transition-colors duration-300" style={{ backgroundColor: currentSlide === 1 ? COLORS.primary : '#D1D5DB' }}></div>
          </div>
        </div>
      </main>
      <div className="pb-8 bg-transparent"></div>
    </div>
  );
};

export default BookingConfirmation;