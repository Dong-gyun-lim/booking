"use client";

import { useEffect, useState } from "react";
import {
  getReservations,
  type Reservation,
  clearReservations,
} from "@/lib/reservation-store";
import Link from "next/link";

export default function ProfilePage() {
  const [items, setItems] = useState<Reservation[]>([]);

  useEffect(() => {
    setItems(getReservations());
  }, []);

  function handleClear() {
    clearReservations();
    setItems([]);
  }

  return (
    <main className="mx-auto max-w-screen-lg px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">예약 내역</h1>
        <button
          onClick={handleClear}
          className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
        >
          로컬 내역 초기화
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border p-6 text-center text-gray-600">
          아직 예약 내역이 없어요.{" "}
          <Link
            href="/spaces/meeting"
            className="text-blue-600 hover:underline"
          >
            공간 보러가기
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((r) => (
            <li key={r.id} className="rounded-xl border p-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{r.spaceName}</div>
                <div className="text-sm text-gray-500">
                  {new Date(r.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="mt-1 text-sm text-gray-700">
                날짜: {r.date} · 시간: {r.start}~{r.end} ({r.hours}시간) · 인원:{" "}
                {r.people}명
              </div>
              <div className="mt-1 text-sm font-semibold">
                결제 예정 금액: {r.totalPrice.toLocaleString()}원
              </div>
              <div className="mt-2">
                <Link
                  href={`/spaces/${r.spaceId}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  상세 보기
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
