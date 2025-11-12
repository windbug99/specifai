"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProject } from "@/lib/context";
import { ECOMMERCE_QUESTIONS } from "@/lib/questions";
import { UserAnswer } from "@/types";

export default function QuestionsPage() {
  const router = useRouter();
  const { projectState, addAnswer, setCurrentStep, updateSpecification } =
    useProject();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showSpec, setShowSpec] = useState(false);

  useEffect(() => {
    if (!projectState.analysis) {
      router.push("/create");
      return;
    }
  }, [projectState.analysis, router]);

  const questions = ECOMMERCE_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (optionId: string) => {
    if (currentQuestion.type === "single") {
      setSelectedOptions([optionId]);
    } else {
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
      } else {
        setSelectedOptions([...selectedOptions, optionId]);
      }
    }
  };

  const handleNext = () => {
    if (selectedOptions.length === 0) return;

    const answer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOptions,
    };
    addAnswer(answer);

    // 명세서 업데이트 (간단한 버전)
    updateSpecification(generateSpecification([...projectState.answers, answer]));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions([]);
    } else {
      router.push("/review");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // 이전 답변 불러오기
      const prevAnswer = projectState.answers[currentQuestionIndex - 1];
      if (prevAnswer) {
        setSelectedOptions(prevAnswer.selectedOptions);
      }
    }
  };

  const generateSpecification = (answers: UserAnswer[]): string => {
    let spec = `# 프로젝트 명세서\n\n`;
    spec += `## 1. 프로젝트 개요\n`;
    spec += `- 유형: ${projectState.analysis?.type}\n`;
    spec += `- 초기 요구사항: ${projectState.initialInput}\n\n`;
    spec += `## 2. 핵심 기능\n\n`;

    answers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      if (question) {
        spec += `### ${question.category}\n`;
        spec += `**${question.question}**\n\n`;
        answer.selectedOptions.forEach((optId) => {
          const option = question.options.find((opt) => opt.id === optId);
          if (option) {
            spec += `- ${option.text}\n`;
            spec += `  ${option.description}\n`;
          }
        });
        spec += `\n`;
      }
    });

    return spec;
  };

  if (!projectState.analysis || !currentQuestion) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 질문 영역 */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    질문 {currentQuestionIndex + 1} / {questions.length}
                  </span>
                  <span className="text-sm text-gray-600">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-3">
                  {currentQuestion.category}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentQuestion.question}
                </h2>
                {currentQuestion.type === "multiple" && (
                  <p className="text-sm text-gray-500">
                    (여러 개 선택 가능)
                  </p>
                )}
              </div>

              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedOptions.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                        isSelected
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start">
                        <div
                          className={`mt-1 flex-shrink-0 w-5 h-5 rounded ${
                            currentQuestion.type === "single"
                              ? "rounded-full"
                              : "rounded"
                          } border-2 mr-3 ${
                            isSelected
                              ? "bg-blue-500 border-blue-500"
                              : "border-gray-300"
                          } flex items-center justify-center`}
                        >
                          {isSelected && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 mb-1">
                            {option.text}
                          </p>
                          <p className="text-sm text-gray-600">
                            {option.description}
                          </p>
                          {option.impact && option.impact.dev_time_days > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              개발 시간: +{option.impact.dev_time_days}일 |
                              비용: +{(option.impact.cost_krw / 10000).toFixed(0)}만원
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  ← 이전
                </button>
                <button
                  onClick={handleNext}
                  disabled={selectedOptions.length === 0}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {currentQuestionIndex < questions.length - 1
                    ? "다음 →"
                    : "완료 →"}
                </button>
              </div>
            </div>
          </div>

          {/* 명세서 미리보기 영역 */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  📄 명세서 미리보기
                </h3>
                <button
                  onClick={() => setShowSpec(!showSpec)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  {showSpec ? "접기" : "펼치기"}
                </button>
              </div>
              {showSpec && (
                <div className="prose prose-sm max-w-none">
                  <div className="bg-gray-50 p-4 rounded-lg max-h-[600px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-xs text-gray-700 font-mono">
                      {generateSpecification(projectState.answers)}
                    </pre>
                  </div>
                </div>
              )}
              {!showSpec && (
                <div className="text-sm text-gray-600">
                  <p className="mb-2">
                    현재까지 {projectState.answers.length}개 질문에 답변하셨습니다.
                  </p>
                  <p>답변할 때마다 명세서가 실시간으로 생성됩니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 모바일용 명세서 보기 버튼 */}
        <div className="lg:hidden fixed bottom-4 right-4">
          <button
            onClick={() => setShowSpec(!showSpec)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
          >
            📄 명세서 보기
          </button>
        </div>
      </div>
    </div>
  );
}
