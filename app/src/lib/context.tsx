"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProjectState, ProjectAnalysis, UserAnswer } from "@/types";

interface ProjectContextType {
  projectState: ProjectState;
  setInitialInput: (input: string) => void;
  setAnalysis: (analysis: ProjectAnalysis) => void;
  setCurrentStep: (step: number) => void;
  addAnswer: (answer: UserAnswer) => void;
  updateSpecification: (spec: string) => void;
  resetProject: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const initialState: ProjectState = {
  initialInput: "",
  analysis: null,
  currentStep: 0,
  answers: [],
  specification: "",
};

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projectState, setProjectState] = useState<ProjectState>(initialState);

  const setInitialInput = (input: string) => {
    setProjectState((prev) => ({ ...prev, initialInput: input }));
  };

  const setAnalysis = (analysis: ProjectAnalysis) => {
    setProjectState((prev) => ({ ...prev, analysis }));
  };

  const setCurrentStep = (step: number) => {
    setProjectState((prev) => ({ ...prev, currentStep: step }));
  };

  const addAnswer = (answer: UserAnswer) => {
    setProjectState((prev) => ({
      ...prev,
      answers: [...prev.answers, answer],
    }));
  };

  const updateSpecification = (spec: string) => {
    setProjectState((prev) => ({ ...prev, specification: spec }));
  };

  const resetProject = () => {
    setProjectState(initialState);
  };

  return (
    <ProjectContext.Provider
      value={{
        projectState,
        setInitialInput,
        setAnalysis,
        setCurrentStep,
        addAnswer,
        updateSpecification,
        resetProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
