"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Space } from "./page";
import { createReservation, fetchReservationsByDate } from "@/api/reservations";
import type {
  CreateReservationReq,
  ReservationItem,
} from "@/types/reservation";
import { addToast } from "@/components/ui/toaster"; // ✅ 커스텀 addToast import

export default function ClientSpaceDetail({ space }: { space: Space }) {
  const [userName, setUserName] = useState("임동균");
  const [date, setDate] = useState(""); // YYYY-MM-DD
  const [startTime, setStartTime] = useState(""); // HH:mm
  const [endTime, setEndTime] = useState(""); // HH:mm
  const [people, setPeople] = useState(2);

  const [submitting, setSubmitting] = useState(false);
  const [dayReservations, setDayReservations] = useState<ReservationItem[]>([]);
  const [loadingResv, setLoadingResv] = useState(false);
  const [errorResv, setErrorResv] = useState<string | null>(null);

  // 날짜가 바뀔 때, 해당 날짜의 예약 목록을 불러온다
  useEffect(() => {
    if (!date) {
      setDayReservations([]);
      return;
    }
    (async () => {
      try {
        setLoadingResv(true);
        setErrorResv(null);
        const list = await fetchReservationsByDate(space.id, date);
        setDayReservations(list);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "예약 목록 조회 실패";
        setErrorResv(msg);
        setDayReservations([]);
      } finally {
        setLoadingResv(false);
      }
    })();
  }, [date, space.id]);

  // HH:mm → 분 단위 정수
  function timeToMin(t: string) {
    const [h, m] = t.split(":").map((x) => Number(x));
    return h * 60 + m;
  }

  // 겹침 여부 계산 (열린구간 [start,end)로 가정)
  function isOverlap(
    aStart: string,
    aEnd: string,
    bStart: string,
    bEnd: string
  ) {
    const s1 = timeToMin(aStart);
    const e1 = timeToMin(aEnd);
    const s2 = timeToMin(bStart);
    const e2 = timeToMin(bEnd);
    return s1 < e2 && s2 < e1;
  }

  // 이미 예약된 구간을 표시용 문자열로
  const reservedRanges = useMemo(
    () => dayReservations.map((r) => `${r.startTime} ~ ${r.endTime}`).sort(),
    [dayReservations]
  );

  async function handleReserve() {
    // 간단 유효성
    if (!date || !startTime || !endTime) {
      addToast({
        variant: "destructive",
        title: "입력 오류",
        description: "날짜와 시간을 설정해 주세요.",
      });
      return;
    }
    if (people < 1) {
      addToast({
        variant: "destructive",
        title: "입력 오류",
        description: "인원은 1명 이상이어야 합니다.",
      });
      return;
    }
    if (timeToMin(startTime) >= timeToMin(endTime)) {
      addToast({
        variant: "destructive",
        title: "시간 오류",
        description: "시작 시간이 종료 시간보다 빨라야 합니다.",
      });
      return;
    }
    const hasConflict = dayReservations.some((r) =>
      isOverlap(startTime, endTime, r.startTime, r.endTime)
    );
    if (hasConflict) {
      addToast({
        variant: "destructive",
        title: "겹치는 시간",
        description: "이미 예약된 시간과 겹칩니다.",
      });
      return;
    }

    try {
      setSubmitting(true);
      const payload: CreateReservationReq = {
        spaceId: space.id,
        userName,
        date,
        startTime,
        endTime,
        people,
      };
      const res = await createReservation(payload);
      addToast({
        title: "예약 완료",
        description: `예약번호: #${res.reservationId}`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "다시 시도해 주세요.";
      addToast({
        variant: "destructive",
        title: "예약 실패",
        description: msg,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="p-6 max-w-5xl mx-auto">
      {/* 상단 이미지 */}
      <div className="relative w-full aspect-[3/2] overflow-hidden rounded-2xl shadow">
        <Image
          src={space.imageUrl}
          alt={space.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 기본 정보 */}
      <section className="mt-6 grid gap-2">
        <h1 className="text-2xl font-semibold">{space.name}</h1>
        <p className="text-sm text-zinc-500">
          유형: {space.type} · 정원: {space.capacity}명 · 시간당{" "}
          {space.pricePerHour.toLocaleString()}원
        </p>
        <p className="text-sm text-zinc-500">위치: {space.location}</p>
        <p className="mt-2">{space.description}</p>
      </section>

      {/* 예약 폼 */}
      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">예약하기</h2>

        <input
          className="border px-3 py-2 rounded w-full"
          placeholder="예약자명"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="date"
          className="border px-3 py-2 rounded w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="time"
            className="border px-3 py-2 rounded w-full"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="time"
            className="border px-3 py-2 rounded w-full"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <input
          type="number"
          min={1}
          className="border px-3 py-2 rounded w-full"
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
        />

        <button
          onClick={handleReserve}
          disabled={submitting}
          className="rounded-2xl px-4 py-2 border shadow w-full disabled:opacity-60"
        >
          {submitting ? "예약 처리 중..." : "예약하기"}
        </button>
      </section>

      {/* 날짜 선택 후: 이미 예약된 시간대 안내 */}
      <section className="mt-8">
        <h3 className="font-semibold mb-2">해당 날짜의 예약 현황</h3>
        {loadingResv && <p className="text-sm text-zinc-500">불러오는 중…</p>}
        {errorResv && <p className="text-sm text-red-600">{errorResv}</p>}
        {!loadingResv && !errorResv && (
          <>
            {reservedRanges.length === 0 ? (
              <p className="text-sm text-emerald-600">
                현재 예약이 없습니다. 원하는 시간에 예약할 수 있어요.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {reservedRanges.map((range) => (
                  <span
                    key={range}
                    className="text-xs px-2 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800"
                  >
                    {range}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
