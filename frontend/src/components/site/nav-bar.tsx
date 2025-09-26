"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, User, Settings, LogOut } from "lucide-react";
import ThemeToggle from "@/components/site/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const routes = [
  { href: "/", label: "홈" },
  { href: "/about", label: "About" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4">
        {/* 로고 */}
        <Link href="/" className="font-semibold">
          오늘의 자리
        </Link>

        {/* 데스크탑 메뉴 */}
        <nav className="hidden items-center gap-2 md:flex">
          {routes.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors hover:bg-gray-100",
                pathname === r.href ? "text-black" : "text-gray-600"
              )}
            >
              {r.label}
            </Link>
          ))}

          <Button size="sm" asChild>
            <Link href="/login">로그인</Link>
          </Button>

          {/* 다크모드 토글 */}
          <ThemeToggle />

          {/* 프로필 드롭다운 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full border p-0.5 outline-none focus:ring-2 focus:ring-gray-300">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="profile" />
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>내 계정</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />내 정보
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  설정
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  alert("로그아웃 동작 자리입니다. 나중에 실제 로직 연결!")
                }
                className="flex items-center gap-2 text-red-600"
              >
                <LogOut className="h-4 w-4" />
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* 모바일 햄버거 메뉴 */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="메뉴 열기">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64">
              {/* 접근성용 제목 (시각적으로 숨김) */}
              <SheetHeader>
                <SheetTitle className="sr-only">모바일 메뉴</SheetTitle>
              </SheetHeader>

              <nav className="mt-6 flex flex-col gap-2">
                {routes.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm transition-colors hover:bg-gray-100",
                      pathname === r.href ? "text-black" : "text-gray-600"
                    )}
                  >
                    {r.label}
                  </Link>
                ))}

                <Button size="sm" asChild className="mt-1">
                  <Link href="/login">로그인</Link>
                </Button>

                {/* 모바일: 추가 메뉴 */}
                <Link
                  href="/profile"
                  className="mt-2 flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                >
                  <User className="h-4 w-4" />내 정보
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                >
                  <Settings className="h-4 w-4" />
                  설정
                </Link>

                {/* 모바일: 다크모드 토글 */}
                <div className="mt-2 border-t pt-2">
                  <ThemeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
