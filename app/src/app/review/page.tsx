"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProject } from "@/lib/context";
import { ECOMMERCE_QUESTIONS } from "@/lib/questions";

export default function ReviewPage() {
  const router = useRouter();
  const { projectState } = useProject();

  useEffect(() => {
    if (!projectState.analysis || projectState.answers.length === 0) {
      router.push("/create");
      return;
    }
  }, [projectState.analysis, projectState.answers, router]);

  const handleComplete = () => {
    router.push("/result");
  };

  const handleGoBack = () => {
    router.push("/questions");
  };

  const getSelectedOptions = () => {
    return projectState.answers.map((answer) => {
      const question = ECOMMERCE_QUESTIONS.find(
        (q) => q.id === answer.questionId
      );
      return {
        question,
        selectedOptions: answer.selectedOptions
          .map((optId) => question?.options.find((opt) => opt.id === optId))
          .filter((opt) => opt !== undefined),
      };
    });
  };

  if (!projectState.analysis) {
    return null;
  }

  const selectedOptions = getSelectedOptions();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            ✅ 명세서 작성 완료!
          </h1>
          <p className="text-lg text-gray-600">
            총 {projectState.answers.length}개 질문에 답변하셨습니다
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              ━━━ 포함된 기능 (In-Scope) ━━━
            </h2>
            <div className="space-y-4">
              {selectedOptions.map(({ question, selectedOptions }, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {question?.category}: {question?.question}
                  </h3>
                  <ul className="space-y-1">
                    {selectedOptions.map((option, optIndex) => (
                      <li
                        key={optIndex}
                        className="text-sm text-gray-700 flex items-start"
                      >
                        <span className="text-green-500 mr-2">✓</span>
                        <span>{option?.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              ━━━ 초기 요구사항 ━━━
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">{projectState.initialInput}</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">💡 다음 단계</h3>
            <ul className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>개발자/외주사에게 명세서 공유</li>
              <li>견적 받기 (위시켓, 크몽, 프리모아 등)</li>
              <li>AI로 직접 개발 (Cursor, Claude 활용)</li>
            </ul>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleGoBack}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              ← 수정하기
            </button>
            <button
              onClick={handleComplete}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              완료 및 문서 생성 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
