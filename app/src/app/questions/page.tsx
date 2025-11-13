"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProject } from "@/lib/context";
import { ECOMMERCE_QUESTIONS } from "@/lib/questions";
import { UserAnswer } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* 질문 영역 */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">
                      질문 {currentQuestionIndex + 1}
                    </span>
                    <span className="text-sm text-gray-400">/</span>
                    <span className="text-sm text-gray-600">
                      {questions.length}
                    </span>
                  </div>
                  <Badge variant="default" className="text-xs">
                    {Math.round(progress)}% 완료
                  </Badge>
                </div>
                <Progress value={progress} max={100} className="h-2" />
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <Badge variant="secondary" className="mb-3">
                    {currentQuestion.category}
                  </Badge>
                  <CardTitle className="mb-2">
                    {currentQuestion.question}
                  </CardTitle>
                  {currentQuestion.type === "multiple" && (
                    <CardDescription>
                      여러 개 선택 가능
                    </CardDescription>
                  )}
                </div>

                <div className="space-y-3">
                  {currentQuestion.options.map((option) => {
                    const isSelected = selectedOptions.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option.id)}
                        className={`w-full text-left p-5 border-2 rounded-xl transition-all duration-200 ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-200"
                            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                              currentQuestion.type === "single"
                                ? "rounded-full"
                                : "rounded-lg"
                            } ${
                              isSelected
                                ? "bg-blue-600 border-blue-600 scale-110"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {isSelected && (
                              <Check className="w-4 h-4 text-white" strokeWidth={3} />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className={`font-semibold mb-1 transition-colors ${
                              isSelected ? "text-blue-900" : "text-gray-900"
                            }`}>
                              {option.text}
                            </p>
                            <p className="text-sm text-gray-600">
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    variant="outline"
                    size="default"
                  >
                    ← 이전
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={selectedOptions.length === 0}
                    variant="default"
                    size="default"
                    className="flex-1"
                  >
                    {currentQuestionIndex < questions.length - 1
                      ? "다음 →"
                      : "완료 →"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 명세서 미리보기 영역 */}
          <div className="hidden lg:block">
            <Card className="shadow-lg sticky top-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">📄 명세서 미리보기</CardTitle>
                  <Button
                    onClick={() => setShowSpec(!showSpec)}
                    variant="ghost"
                    size="sm"
                  >
                    {showSpec ? "접기" : "펼치기"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showSpec && (
                  <div className="bg-gray-50 p-4 rounded-lg max-h-[600px] overflow-y-auto border border-gray-200">
                    <pre className="whitespace-pre-wrap text-xs text-gray-700 font-mono">
                      {generateSpecification(projectState.answers)}
                    </pre>
                  </div>
                )}
                {!showSpec && (
                  <div className="text-sm text-gray-600 space-y-2">
                    <p className="flex items-center gap-2">
                      <Badge variant="success" className="text-xs">
                        {projectState.answers.length}개
                      </Badge>
                      <span>질문에 답변하셨습니다</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      답변할 때마다 명세서가 실시간으로 생성됩니다.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 모바일용 명세서 보기 버튼 */}
        <div className="lg:hidden fixed bottom-6 right-6">
          <Button
            onClick={() => setShowSpec(!showSpec)}
            size="lg"
            className="shadow-lg"
          >
            📄 명세서 보기
          </Button>
        </div>
      </div>
    </div>
  );
}
