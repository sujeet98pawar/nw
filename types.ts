
export enum SlotType {
  SLOT_1 = 'SLOT-1',
  SLOT_2 = 'SLOT-2'
}

export interface BookingData {
  date: string;
  seatNumber: string;
  slot: SlotType;
  timeRange: string;
}

export type AppStep = 'FORM' | 'CONFIRMATION';
