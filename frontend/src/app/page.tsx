"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-screen-xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">공간 예약 플랫폼</h1>
      <p className="mb-10 text-gray-600">회의실과 스터디룸을 예약해보세요!</p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 회의실 */}
        <Link href="/spaces/meeting" className="block">
          <Card className="transition hover:shadow-lg">
            <CardHeader>
              <CardTitle>회의실 예약</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-40 w-full overflow-hidden rounded-md">
                <Image
                  src="https://source.unsplash.com/600x400/?meeting-room,conference"
                  alt="회의실"
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
              <p className="mt-3 text-gray-600">
                팀 회의, 비즈니스 미팅에 적합한 공간
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* 스터디룸 */}
        <Link href="/spaces/study" className="block">
          <Card className="transition hover:shadow-lg">
            <CardHeader>
              <CardTitle>스터디룸 예약</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-40 w-full overflow-hidden rounded-md">
                <Image
                  src="https://source.unsplash.com/600x400/?study-room,library"
                  alt="스터디룸"
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-gray-600">
                개인/소규모 학습에 최적화된 공간
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  );
}
