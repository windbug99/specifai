"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProject } from "@/lib/context";
import {
  analyzeProject,
  getProjectTypeName,
  getComplexityName,
} from "@/lib/analyzer";

export default function AnalyzePage() {
  const router = useRouter();
  const { projectState, setAnalysis, setCurrentStep } = useProject();
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    if (!projectState.initialInput) {
      router.push("/create");
      return;
    }

    // 분석 시뮬레이션 (1.5초 대기)
    setTimeout(() => {
      const analysis = analyzeProject(projectState.initialInput);
      setAnalysis(analysis);
      setCurrentStep(1);
      setIsAnalyzing(false);
    }, 1500);
  }, [projectState.initialInput, router, setAnalysis, setCurrentStep]);

  const handleContinue = () => {
    router.push("/questions");
  };

  const handleGoBack = () => {
    router.push("/create");
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <h2 className="text-2xl font-semibold text-gray-800">
              프로젝트 분석 중...
            </h2>
            <p className="text-gray-600">
              입력하신 내용을 분석하고 있습니다
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!projectState.analysis) {
    return null;
  }

  const { analysis } = projectState;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-gray-50">
      <main className="max-w-3xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            프로젝트 분석 결과
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700 mb-1">📊 프로젝트 유형</p>
              <p className="text-xl font-semibold text-blue-900">
                {getProjectTypeName(analysis.type)}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700 mb-1">📏 예상 복잡도</p>
              <p className="text-xl font-semibold text-green-900">
                {getComplexityName(analysis.complexity)}
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-700 mb-1">⏱️ 예상 질문 수</p>
              <p className="text-xl font-semibold text-purple-900">
                약 {analysis.estimatedQuestions}개
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-700 mb-1">🕐 예상 소요 시간</p>
              <p className="text-xl font-semibold text-orange-900">
                {analysis.estimatedTime}
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              AI가 파악한 주요 내용:
            </h3>
            <ul className="space-y-2">
              {analysis.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>입력하신 내용:</strong>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {projectState.initialInput}
            </p>
          </div>

          <div className="pt-4">
            <p className="text-center text-gray-700 mb-4 font-medium">
              맞나요?
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleGoBack}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                ← 아니요, 수정할게요
              </button>
              <button
                onClick={handleContinue}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                네, 맞습니다 →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
