export type CreateReservationReq = {
  spaceId: number;
  userName: string;
  date: string; // "YYYY-MM-DD"
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  people: number;
};
export type ReservationItem = {
  reservationId: number;
  spaceId: number;
  userName: string;
  date: string; // "YYYY-MM-DD"
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  people: number;
};

export type CreateReservationResp = {
  reservationId: number;
  status: "CREATED";
};
