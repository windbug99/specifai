"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProject } from "@/lib/context";
import { generateMarkdownSpec, generateAIPrompt } from "@/lib/generator";

export default function ResultPage() {
  const router = useRouter();
  const { projectState, resetProject } = useProject();
  const [markdownSpec, setMarkdownSpec] = useState("");
  const [aiPrompt, setAIPrompt] = useState("");
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  useEffect(() => {
    if (!projectState.analysis || projectState.answers.length === 0) {
      router.push("/create");
      return;
    }

    const md = generateMarkdownSpec(projectState);
    const prompt = generateAIPrompt(projectState);
    setMarkdownSpec(md);
    setAIPrompt(prompt);
  }, [projectState, router]);

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownSpec);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(aiPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdownSpec], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `specifai-spec-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPrompt = () => {
    const blob = new Blob([aiPrompt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `specifai-prompt-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleNewProject = () => {
    resetProject();
    router.push("/create");
  };

  if (!markdownSpec || !aiPrompt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">문서 생성 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            🎉 명세서 완성!
          </h1>
          <p className="text-lg text-gray-600">
            다음 문서가 생성되었습니다
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Markdown 명세서 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  📄 요구사항 명세서 (Markdown)
                </h2>
                <p className="text-sm text-gray-600">
                  계약서로 사용 가능한 상세 문서
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-[400px] overflow-y-auto">
              <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                {markdownSpec}
              </pre>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopyMarkdown}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                {copiedMarkdown ? "✓ 복사됨!" : "📋 복사"}
              </button>
              <button
                onClick={handleDownloadMarkdown}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                ⬇️ 다운로드
              </button>
            </div>
          </div>

          {/* AI 프롬프트 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  🤖 AI 프롬프트 (TXT)
                </h2>
                <p className="text-sm text-gray-600">
                  Cursor, Claude에 바로 사용 가능
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-[400px] overflow-y-auto">
              <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                {aiPrompt}
              </pre>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopyPrompt}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                {copiedPrompt ? "✓ 복사됨!" : "📋 복사"}
              </button>
              <button
                onClick={handleDownloadPrompt}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                ⬇️ 다운로드
              </button>
            </div>
          </div>
        </div>

        {/* 다음 단계 안내 */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            💼 다음 단계
          </h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  개발자/외주사에게 명세서 공유
                </h3>
                <p className="text-sm text-gray-600">
                  생성된 Markdown 명세서를 위시켓, 크몽, 프리모아 등에 첨부하여
                  견적을 받으세요
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  견적 받기
                </h3>
                <p className="text-sm text-gray-600">
                  여러 개발자로부터 견적을 받고 비교하세요. 명확한 명세서로
                  정확한 견적을 받을 수 있습니다
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  AI로 직접 개발 (1인 개발자)
                </h3>
                <p className="text-sm text-gray-600">
                  생성된 AI 프롬프트를 Cursor나 Claude에 붙여넣어 자동으로
                  프로젝트를 생성하세요
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            홈으로
          </button>
          <button
            onClick={handleNewProject}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            새 프로젝트 시작
          </button>
        </div>
      </div>
    </div>
  );
}
