
import React, { useState, useRef } from 'react';
import { BookingData, SlotType } from '../types';
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

    // Minimum swipe distance for transition
    if (diff > 40) {
      setCurrentSlide(1);
    } else if (diff < -40) {
      setCurrentSlide(0);
    }
    touchStart.current = null;
  };

  const CardContent = ({ dateOffset }: { dateOffset: number }) => {
    // Dynamically set cubicle code: Slot 1 (8AM-1PM) -> 04, Slot 2 (2PM-7PM) -> 05
    const slotCode = booking.slot === SlotType.SLOT_1 ? '04' : '05';
    
    return (
      <div className="w-full shrink-0 px-4 py-3.5 select-none">
        <div className="mb-1.5">
          <h2 className="text-[16px] font-medium text-black-800">Recent Booking</h2>
        </div>

        <div className="flex items-center justify-between mb-4 min-h-[32px]">
          <span className="text-[12px] text-gray-500 font-medium">
            {formatDate(booking.date, dateOffset)}
          </span>
          
          <div className="flex items-center gap-3">
            <div 
              className="flex items-center justify-center px-5 h-[26px] rounded-full text-[12px] font-bold border tracking-wider whitespace-nowrap leading-none"
              style={{ 
                color: COLORS.badgeText, 
                borderColor: COLORS.badgeBorder,
                backgroundColor: 'transparent'
              }}
            >
              BOOKED
            </div>
            <button className="text-gray-500">
              <MoreVertical size={28} />
            </button>
          </div>
        </div>

        <div className="space-y-0.5 mb-4">
          <p className="text-[15px] font-bold text-black-900">
            Cubicle: MUM02 01 {slotCode} A {booking.seatNumber}
          </p>
          <p className="text-[13px] text-black-500 font-roboto">
            Mumbai, ILMUMBAISTP, SDB01, {booking.slot},
          </p>
          <p className="text-[13px] text-black-500 font-roboto">
            {booking.timeRange} Floor, A Wing
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f5f5f5] relative font-roboto">
      <header className="relative flex items-center justify-between px-4 h-14 text-white shadow-md z-10 bg-brand-color">
        <button onClick={onBack} className="p-1 active:opacity-60 transition-opacity z-20">
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
        
        <h1 className="absolute inset-0 flex items-center justify-center text-[18px] font-bold tracking-[0.04em] pointer-events-none uppercase">
          BOOK SEAT
        </h1>

        <button className="p-1 z-20">
          <MoreVertical size={24} />
        </button>
      </header>

      <main className="flex-1 p-4 flex flex-col items-center">
        <div className="w-full rounded-lg p-4 mb-4 shadow-sm" style={{ backgroundColor: COLORS.bannerBg }}>
          <p className="text-gray-800 text-[14px] leading-snug font-medium">
            <span className="font-bold">Time Slot based seat booking is now live!</span>
            <br />
            <span className="font-medium underline decoration-1" style={{ color: COLORS.linkText }}>
              Click Here
            </span> to choose cities/DCs where time slot-based seat booking is enabled.
          </p>
        </div>

        {/* Swipe Container with Enhanced Transition and reduced box dimensions */}
        <div className="w-full bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden relative">
          <div 
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <CardContent dateOffset={0} />
            <CardContent dateOffset={1} />
          </div>

          <div className="flex justify-center gap-2 pb-4">
            <div 
              className="w-1.5 h-1.5 rounded-full transition-all duration-300" 
              style={{ 
                backgroundColor: currentSlide === 0 ? COLORS.primary : '#D1D5DB',
                transform: currentSlide === 0 ? 'scale(1.2)' : 'scale(1)'
              }}
            ></div>
            <div 
              className="w-1.5 h-1.5 rounded-full transition-all duration-300" 
              style={{ 
                backgroundColor: currentSlide === 1 ? COLORS.primary : '#D1D5DB',
                transform: currentSlide === 1 ? 'scale(1.2)' : 'scale(1)'
              }}
            ></div>
          </div>
        </div>
      </main>
      <div className="pb-8 bg-transparent"></div>
    </div>
  );
};

export default BookingConfirmation;
