import { notFound } from "next/navigation";
import ClientSpaceDetail from "./ClientSpaceDetail";

// (목업) 목록·상세 공통으로 쓸 더미 데이터
const SPACES = [
  {
    id: 1,
    type: "meeting",
    name: "대회의실 A",
    capacity: 12,
    pricePerHour: 30000,
    location: "서울 강남구 테헤란로 123",
    description: "프로젝터, 화상회의 장비 완비. 대규모 미팅에 적합합니다.",
    imageUrl: "https://source.unsplash.com/1200x800/?meeting-room,conference",
  },
  {
    id: 2,
    type: "meeting",
    name: "소회의실 B",
    capacity: 4,
    pricePerHour: 15000,
    location: "서울 서초구 서초대로 45",
    description: "화이트보드/TV 제공. 소규모 팀 미팅에 좋아요.",
    imageUrl: "https://source.unsplash.com/1200x800/?office,meeting",
  },
  {
    id: 101,
    type: "study",
    name: "1인실 스터디룸",
    capacity: 1,
    pricePerHour: 7000,
    location: "서울 마포구 독막로 21",
    description: "집중 학습용 1인 부스. 정숙 환경 제공.",
    imageUrl: "https://source.unsplash.com/1200x800/?study-room,booth",
  },
  {
    id: 102,
    type: "study",
    name: "4인실 스터디룸",
    capacity: 4,
    pricePerHour: 16000,
    location: "서울 관악구 남부순환로 12",
    description: "팀 스터디에 적합. 화이트보드 제공.",
    imageUrl: "https://source.unsplash.com/1200x800/?study,library",
  },
] as const;

export type Space = (typeof SPACES)[number];

function getSpace(id: number): Space | undefined {
  return SPACES.find((s) => s.id === id);
}

export default function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const space = getSpace(id);

  if (Number.isNaN(id) || !space) {
    // 서버에서 존재성 검증 → 없는 경우 곧장 404
    return notFound();
  }

  // 존재가 확정된 space를 클라이언트 컴포넌트로 전달
  return <ClientSpaceDetail space={space} />;
}
