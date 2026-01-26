import React, { useState } from 'react';
import { BookingData, SlotType } from '../types';
import { SLOT_CONFIG, COLORS } from '../constants';

interface BookingFormProps {
  initialData: BookingData;
  onSubmit: (data: BookingData) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<BookingData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'slot') {
      setFormData(prev => ({
        ...prev,
        slot: value as SlotType,
        timeRange: SLOT_CONFIG[value as SlotType]
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const seat = parseInt(formData.seatNumber);
    if (isNaN(seat) || seat < 1) {
      alert("Please enter a valid seat number");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header with stable blue background */}
      <header className="flex items-center justify-center h-14 text-white shadow-md z-10 shrink-0 bg-custom-purple">
        <h1 className="text-lg font-bold tracking-widest uppercase">
          BOOK SEAT
        </h1>
      </header>

      <form onSubmit={handleSubmit} className="p-6 space-y-6 flex-1 overflow-y-auto">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-2">
           <p className="text-blue-800 text-sm">Fill in the details below to reserve your workstation.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Seat Number</label>
          <input
            type="number"
            name="seatNumber"
            value={formData.seatNumber}
            onChange={handleChange}
            placeholder="e.g. 103"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Slot</label>
          <select
            name="slot"
            value={formData.slot}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            <option value={SlotType.SLOT_1}>Slot 1 (8 AM - 1 PM)</option>
            <option value={SlotType.SLOT_2}>Slot 2 (2 PM - 7 PM)</option>
          </select>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-4 text-white font-bold rounded-lg shadow-lg active:scale-95 transition-transform bg-custom-purple"
          >
            BOOK SEAT
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;