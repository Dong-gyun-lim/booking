"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchReservationsByDate } from "@/api/reservations";
import type { ReservationItem } from "@/types/reservation";

// ✅ 현재 프로젝트는 mock 공간을 쓰고 있으므로, 임시로 고정 ID 배열 사용
// (나중에 DB 연동되면 /api/spaces 로 리스트 받아서 대체)
const SPACE_IDS = [1, 2, 101, 102];

// 프로필 페이지: 특정 유저의 하루치 예약 모아보기
export default function ProfilePage() {
  const [userName, setUserName] = useState("임동균"); // 로그인 연동 전 임시
  const [date, setDate] = useState(() => {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd}`; // YYYY-MM-DD
  });

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ReservationItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 공간 이름 매핑 (목업)
  const spaceNameMap: Record<number, string> = {
    1: "대회의실 A",
    2: "소회의실 B",
    101: "1인실 스터디룸",
    102: "4인실 스터디룸",
  };

  async function load() {
    try {
      setLoading(true);
      setError(null);

      // 모든 공간에 대해 날짜별 예약 조회 → 평면배열로 병합
      const listPerSpace = await Promise.all(
        SPACE_IDS.map((id) => fetchReservationsByDate(id, date))
      );
      const merged = listPerSpace.flat();

      // 현재 유저 예약만 필터링
      const mine = merged.filter((r) => r.userName === userName);

      // 시간순 정렬
      mine.sort((a, b) => a.startTime.localeCompare(b.startTime));

      setItems(mine);
    } catch (e: unknown) {
      const msg =
        e instanceof Error ? e.message : "예약 내역을 불러오지 못했습니다.";
      setError(msg);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName, date]);

  const totalCount = items.length;

  const groupBySpace = useMemo(() => {
    // 공간별로 묶어서 테이블로 보여주기
    const map = new Map<number, ReservationItem[]>();
    for (const it of items) {
      const arr = map.get(it.spaceId) ?? [];
      arr.push(it);
      map.set(it.spaceId, arr);
    }
    return Array.from(map.entries()); // [ [spaceId, items[]], ... ]
  }, [items]);

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">내 예약 내역</h1>

      {/* 필터 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
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
        <button
          onClick={load}
          className="rounded-2xl px-4 py-2 border shadow w-full"
          disabled={loading}
        >
          {loading ? "불러오는 중..." : "새로고침"}
        </button>
      </div>

      {/* 상태 표시 */}
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      {!error && (
        <p className="text-sm text-zinc-500 mb-4">
          {date} · <b>{userName}</b>님의 예약 {totalCount}건
        </p>
      )}

      {/* 결과 표시 */}
      {loading ? (
        <p className="text-sm text-zinc-500">불러오는 중…</p>
      ) : totalCount === 0 ? (
        <p className="text-sm">해당 날짜에 예약이 없습니다.</p>
      ) : (
        <div className="space-y-6">
          {groupBySpace.map(([spaceId, arr]) => (
            <section key={spaceId}>
              <h2 className="font-semibold mb-2">
                {spaceNameMap[spaceId] ?? `공간 #${spaceId}`}
              </h2>
              <div className="overflow-x-auto rounded-2xl border">
                <table className="min-w-full text-sm">
                  <thead className="bg-zinc-100 dark:bg-zinc-900">
                    <tr>
                      <th className="text-left px-3 py-2">시간</th>
                      <th className="text-left px-3 py-2">인원</th>
                      <th className="text-left px-3 py-2">예약번호</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arr.map((it) => (
                      <tr key={it.reservationId} className="border-t">
                        <td className="px-3 py-2">
                          {it.startTime} ~ {it.endTime}
                        </td>
                        <td className="px-3 py-2">{it.people}명</td>
                        <td className="px-3 py-2">#{it.reservationId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
