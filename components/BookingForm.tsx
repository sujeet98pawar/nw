import React, { useState } from 'react';
import { BookingData, SlotType } from '../types';
import { SLOT_CONFIG, COLORS } from '../constants';
import { AlertCircle } from 'lucide-react';

interface BookingFormProps {
  initialData: BookingData;
  onSubmit: (data: BookingData) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<BookingData>(initialData);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setErrorMessage(null);
    
    if (name === 'slot') {
      const selectedSlot = value as SlotType;
      setFormData(prev => ({
        ...prev,
        slot: selectedSlot,
        timeRange: SLOT_CONFIG[selectedSlot]
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const seat = parseInt(formData.seatNumber, 10);
    if (isNaN(seat) || seat < 1) {
      setErrorMessage("Please enter a valid seat number");
      return;
    }

    if (formData.slot === SlotType.SLOT_3) {
      if (seat < 32 || seat > 85) {
        setErrorMessage("This seat is not available for full day seat number should be between 032 to 085");
        return;
      }
    }

    const formattedSeat = formData.slot === SlotType.SLOT_3 
      ? String(seat).padStart(3, '0') 
      : formData.seatNumber;

    onSubmit({
      ...formData,
      seatNumber: formattedSeat
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="flex items-center justify-center h-14 text-white shadow-md z-10 shrink-0 bg-brand-color">
        <h1 className="text-lg font-bold tracking-widest uppercase">
          BOOK SEAT
        </h1>
      </header>

      <form onSubmit={handleSubmit} className="p-6 space-y-6 flex-1 overflow-y-auto">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-2">
           <p className="text-blue-800 text-sm">Fill in the details below to reserve your workstation.</p>
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-lg flex items-start gap-2.5 text-sm font-medium animate-shake">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

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
            placeholder={formData.slot === SlotType.SLOT_3 ? "e.g. 035 (032 to 085)" : "e.g. 403"}
            required
            className={`w-full p-3 border rounded-lg focus:ring-2 outline-none ${
              errorMessage && formData.slot === SlotType.SLOT_3 && (parseInt(formData.seatNumber, 10) < 32 || parseInt(formData.seatNumber, 10) > 85)
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {formData.slot === SlotType.SLOT_3 && (
            <p className="text-xs text-gray-500 mt-1">Available seats for Full Day: 032 to 085</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Slot</label>
          <select
            name="slot"
            value={formData.slot}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            <option value={SlotType.SLOT_1}>Slot 1 (7 AM - 1 PM)</option>
            <option value={SlotType.SLOT_2}>Slot 2 (1 PM - 7 PM)</option>
            <option value={SlotType.SLOT_3}>Slot 3 (FULL-DAY)</option>
          </select>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-4 text-white font-bold rounded-lg shadow-lg active:scale-95 transition-transform bg-brand-color"
          >
            BOOK SEAT
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;