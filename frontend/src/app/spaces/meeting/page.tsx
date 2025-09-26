"use client"

import Image from "next/image"
import Link from "next/link"

export default function MeetingPage() {
  // 회의실 목업 데이터 (2개만)
  const meetingRooms = [
    {
      id: 1,
      name: "대회의실 A",
      capacity: 12,
      price: 30000,
      img: "https://source.unsplash.com/800x500/?meeting-room,conference",
    },
    {
      id: 2,
      name: "소회의실 B",
      capacity: 4,
      price: 15000,
      img: "https://source.unsplash.com/800x500/?office,meeting",
    },
  ]

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">회의실 목록</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {meetingRooms.map((room) => (
          <Link
            key={room.id}
            href={`/spaces/${room.id}`}
            className="rounded-lg border p-3 transition hover:shadow-lg"
          >
            <div className="relative h-40 w-full overflow-hidden rounded-md">
              <Image
                src={room.img}
                alt={room.name}
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="mt-3">
              <div className="font-semibold">{room.name}</div>
              <div className="text-sm text-gray-600">수용 {room.capacity}인</div>
              <div className="text-sm font-semibold">
                {room.price.toLocaleString()}원 / 시간
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
