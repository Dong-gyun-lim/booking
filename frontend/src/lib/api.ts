export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export async function apiPost<TBody extends object, TResp = unknown>(
  path: string,
  body: TBody
): Promise<TResp> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    // 필요 시: credentials, Authorization 등 추가
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `API ${path} 실패 (status ${res.status})${text ? `: ${text}` : ""}`
    );
  }
  return (await res.json().catch(() => ({}))) as TResp; // 응답이 빈 바디여도 안전
}
