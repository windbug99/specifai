"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProject } from "@/lib/context";

export default function CreatePage() {
  const [input, setInput] = useState("");
  const router = useRouter();
  const { setInitialInput } = useProject();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setInitialInput(input);
      router.push("/analyze");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-gray-50">
      <main className="max-w-3xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Specifai - 프로젝트 시작하기
          </h1>
          <p className="text-lg text-gray-600">
            어떤 프로젝트를 만들고 싶으신가요?
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="예: 소규모 쇼핑몰을 만들고 싶습니다. 의류를 판매하고, 회원 관리와 결제 기능이 필요합니다."
                className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-900 font-semibold mb-2">
                💡 팁: 다음 내용을 포함해주세요
              </p>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>어떤 서비스인지 (쇼핑몰, 커뮤니티, 예약 시스템 등)</li>
                <li>누가 사용하는지 (일반 사용자, 기업, 특정 그룹)</li>
                <li>주요 기능은 무엇인지</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={!input.trim()}
              className="w-full px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              시작하기 →
            </button>
          </form>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>예상 소요 시간: 10-30분 | 질문 개수: 약 15개</p>
        </div>
      </main>
    </div>
  );
}
