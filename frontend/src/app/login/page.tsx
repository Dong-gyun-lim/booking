"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const schema = z.object({
  email: z.string().email("이메일 형식이 아닙니다."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(values: FormValues) {
    try {
      setLoading(true);

      // ⚠️ 아직 백엔드 연결 전: 동작 확인용
      // 실제 연결 시에는 아래 fetch를 사용:
      // const base = process.env.NEXT_PUBLIC_API_BASE_URL;
      // const res = await fetch(`${base}/api/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });

      await new Promise((r) => setTimeout(r, 600)); // 데모용 딜레이
      alert(`로그인 요청 전송(데모)\n이메일: ${values.email}`);

      // TODO: 성공 시 리다이렉트 등
      // router.push("/");
    } catch (e) {
      console.error(e);
      alert("로그인 실패(데모). 콘솔 확인 바람.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div>
        <h1 className="text-2xl font-bold">로그인</h1>
        <p className="text-sm text-gray-500">이메일과 비밀번호를 입력하세요.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </Button>

          {/* 회원가입: 파란색 배경 */}
          <Button
            asChild
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            type="button"
          >
            <Link href="/register">회원가입</Link>
          </Button>
        </form>
      </Form>
    </div>
  );
}
