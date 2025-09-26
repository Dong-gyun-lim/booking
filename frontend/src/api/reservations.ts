import { apiPost } from "@/lib/api";
import type {
  CreateReservationReq,
  CreateReservationResp,
} from "@/types/reservation";

export async function createReservation(payload: CreateReservationReq) {
  return await apiPost<CreateReservationReq, CreateReservationResp>(
    "/api/reservations",
    payload
  );
}

import type { ReservationItem } from "@/types/reservation";

export async function fetchReservationsByDate(spaceId: number, date: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";
  const url = `${base}/api/reservations?spaceId=${spaceId}&date=${date}`;
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `예약 목록 조회 실패(status ${res.status})${text ? `: ${text}` : ""}`
    );
  }
  const data = (await res.json()) as ReservationItem[]; // 백엔드 응답 배열 가정
  return data;
}
