import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class", // 다크모드 스위치 전략
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // 네가 src 폴더 쓰고 있으니 이 라인 중요!
  ],
  theme: { extend: {} },
  plugins: [],
}
export default config
