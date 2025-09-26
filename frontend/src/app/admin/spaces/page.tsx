"use client";

import Link from "next/link";
import { useState } from "react";

type Space = {
  id: number;
  name: string;
  type: string;
  capacity: number;
  pricePerHour: number;
};

// 목업 공간 데이터
const INITIAL: Space[] = [
  {
    id: 1,
    name: "대회의실 A",
    type: "meeting",
    capacity: 12,
    pricePerHour: 30000,
  },
  {
    id: 2,
    name: "소회의실 B",
    type: "meeting",
    capacity: 4,
    pricePerHour: 15000,
  },
  {
    id: 101,
    name: "1인실 스터디룸",
    type: "study",
    capacity: 1,
    pricePerHour: 7000,
  },
];

export default function AdminSpacesPage() {
  const [spaces, setSpaces] = useState<Space[]>(INITIAL);

  function handleDelete(id: number) {
    if (confirm("정말 삭제할까요?")) {
      setSpaces((prev) => prev.filter((s) => s.id !== id));
    }
  }

  return (
    <main className="mx-auto max-w-screen-lg px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">공간 관리</h1>
        <button className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50">
          + 새 공간 추가
        </button>
      </div>

      {spaces.length === 0 ? (
        <div className="rounded-xl border p-6 text-center text-gray-600">
          등록된 공간이 없습니다.
        </div>
      ) : (
        <table className="w-full border-collapse rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">이름</th>
              <th className="px-3 py-2 text-left">유형</th>
              <th className="px-3 py-2 text-left">정원</th>
              <th className="px-3 py-2 text-left">가격(시간당)</th>
              <th className="px-3 py-2 text-right">관리</th>
            </tr>
          </thead>
          <tbody>
            {spaces.map((s) => (
              <tr key={s.id} className="border-t text-sm">
                <td className="px-3 py-2">{s.id}</td>
                <td className="px-3 py-2">{s.name}</td>
                <td className="px-3 py-2">{s.type}</td>
                <td className="px-3 py-2">{s.capacity}명</td>
                <td className="px-3 py-2">
                  {s.pricePerHour.toLocaleString()}원
                </td>
                <td className="px-3 py-2 text-right space-x-2">
                  <button className="text-blue-600 hover:underline text-sm">
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    삭제
                  </button>
                  <Link
                    href={`/spaces/${s.id}`}
                    className="text-gray-600 hover:underline text-sm"
                  >
                    보기
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
