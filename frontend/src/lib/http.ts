// axios 라이브러리 불러오기
import axios from "axios";

// ✅ Next.js에서 브라우저로 노출 가능한 env는 NEXT_PUBLIC_ 접두사만 가능
//    process.env 값은 "빌드 시" 대체되므로, 런타임에 바꾸려면 다시 빌드/재시작 필요
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

// axios 인스턴스(공통 설정) 생성
const http = axios.create({
  baseURL: BASE_URL,     // 모든 요청의 기본 URL
  timeout: 10000,        // 10초 타임아웃
  withCredentials: true, // 쿠키/세션을 쓸 계획이면 true (CORS 서버 설정도 맞춰야 함)
});

// ▽ 요청 인터셉터: 매 요청 전에 실행됨
http.interceptors.request.use((config) => {
  // 예: 로컬스토리지에 저장해둔 액세스 토큰을 Authorization 헤더에 자동 첨부
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ▽ 응답 인터셉터: 성공/실패를 한 곳에서 처리
http.interceptors.response.use(
  (res) => res, // 성공 시 그대로 반환 (필요하면 res.data만 돌려주도록 바꿔도 됨)
  (err) => {
    // 공통 에러 로깅/전처리
    const status = err?.response?.status;
    const msg = err?.response?.data?.message ?? err.message;
    console.error(`[HTTP ${status ?? "ERR"}] ${msg}`);
    return Promise.reject(err); // 호출한 쪽에서 catch 하도록
  }
);

export default http;
