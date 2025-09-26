"use client";

import Link from "next/link";
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

const schema = z
  .object({
    name: z
      .string()
      .min(2, "이름은 2자 이상 입력하세요.")
      .max(30, "이름이 너무 길어요."),
    email: z.string().email("이메일 형식이 아닙니다."),
    password: z.string().min(6, "비밀번호는 최소 6자 이상"),
    confirmPassword: z.string().min(6, "비밀번호 확인을 입력하세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(values: FormValues) {
    try {
      setLoading(true);

      // TODO: 실제 API 연결 시 아래 형태로 사용
      // const base = process.env.NEXT_PUBLIC_API_BASE_URL;
      // const res = await fetch(`${base}/api/auth/register`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name: values.name, email: values.email, password: values.password }),
      // });

      await new Promise((r) => setTimeout(r, 700)); // 데모용
      alert(`회원가입 요청(데모)\n이메일: ${values.email}`);
      // 성공 시: router.push("/login") 등으로 리다이렉트 가능
    } catch (e) {
      console.error(e);
      alert("회원가입 실패(데모). 콘솔을 확인하세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div>
        <h1 className="text-2xl font-bold">회원가입</h1>
        <p className="text-sm text-gray-500">
          계정을 생성하려면 정보를 입력하세요.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input placeholder="홍길동" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 제출 + 로그인 이동 */}
          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? "회원가입 중..." : "회원가입"}
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/login">로그인으로</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
