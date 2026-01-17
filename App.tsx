
import React, { useState } from 'react';
import { AppStep, BookingData, SlotType } from './types';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('FORM');
  const [booking, setBooking] = useState<BookingData>({
    date: new Date().toISOString().split('T')[0],
    seatNumber: '103',
    slot: SlotType.SLOT_1,
    timeRange: '8AM-1PM'
  });

  const handleBookingSubmit = (data: BookingData) => {
    setBooking(data);
    setStep('CONFIRMATION');
  };

  const handleBack = () => {
    setStep('FORM');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {step === 'FORM' ? (
        <BookingForm 
          initialData={booking} 
          onSubmit={handleBookingSubmit} 
        />
      ) : (
        <BookingConfirmation 
          booking={booking} 
          onBack={handleBack} 
        />
      )}
    </div>
  );
};

export default App;
