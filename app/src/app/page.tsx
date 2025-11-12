import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-gray-50">
      <main className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">
            Specifai
          </h1>
          <p className="text-xl text-gray-600">
            AI 기반 요구사항 명세서 작성 플랫폼
          </p>
          <p className="text-md text-gray-500">
            분쟁 없는 외주 개발을 위한 명확한 요구사항 명세서를 10-30분 만에 작성하세요
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              핵심 가치
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900">분쟁 방지</h3>
                <p className="text-sm text-blue-700">80% 감소</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900">시간 절약</h3>
                <p className="text-sm text-green-700">70% 단축</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-900">비용 절감</h3>
                <p className="text-sm text-purple-700">30% 절감</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-orange-900">AI 최적화</h3>
                <p className="text-sm text-orange-700">재시도 5회 → 1회</p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Link
              href="/create"
              className="w-full block text-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              프로젝트 시작하기 →
            </Link>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>소요 시간: 10-30분 | 질문 개수: 약 15개</p>
        </div>
      </main>
    </div>
  );
}
