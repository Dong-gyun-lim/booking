// src/lib/reservation-store.ts
export type Reservation = {
  id: string; // uuid
  spaceId: number;
  spaceName: string;
  date: string; // yyyy-mm-dd
  start: string; // HH:MM
  end: string; // HH:MM
  hours: number;
  people: number;
  totalPrice: number;
  createdAt: string; // ISO
};

const KEY = "booking_reservations";

export function getReservations(): Reservation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Reservation[]) : [];
  } catch {
    return [];
  }
}

export function addReservation(r: Reservation) {
  const list = getReservations();
  list.unshift(r); // 최근 것이 위로
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function clearReservations() {
  localStorage.removeItem(KEY);
}
