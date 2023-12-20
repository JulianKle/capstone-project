import styled, { keyframes } from "styled-components";
import { AssessmentList } from "@/components/assessmentList/AssessmentList";
import { SearchAssessment } from "@/components/searchAssessment/SearchAssessment";
import useSWR from "swr";
import { useRouter } from "next/router.js";
import { useState } from "react";
import { StyledContent } from "@/components/StyledContent";
import { NewAssessmentLink } from "@/components/StyledLinks";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const BackgroundAnimation = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #61dafb, #38a169);
  z-index: -1;
  animation: ${fadeIn} 2s ease-in-out;
`;

const StyledContentWithAssessments = styled.section`
  position: relative;
  padding-top: 2rem;
  text-align: center;
  z-index: 1;
`;

const StyledContentWithoutAssessments = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  z-index: 1;
`;

const StyledMessage = styled.p`
  font-size: 1.8rem;
  color: #282c34;
  margin-top: 1.7rem;
`;

export default function HomePage() {
  const router = useRouter();
  const { data: assessments, isLoading } = useSWR("/api/assessments");
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return (
      <StyledContent>
        <h1>Loading...</h1>
      </StyledContent>
    );
  }

  if (!assessments) {
    return;
  }

  function changeSearchTerm(newSearchTerm) {
    setSearchTerm(newSearchTerm);
  }

  function resetSearchTerm() {
    setSearchTerm(null);
  }

  return (
    <StyledContent>
      {assessments.length === 0 && <BackgroundAnimation />}
      {assessments.length > 0 ? (
        <>
          <SearchAssessment
            onFilter={changeSearchTerm}
            onOverview={resetSearchTerm}
          />
          <StyledContentWithAssessments>
            <AssessmentList searchFilter={searchTerm} />
          </StyledContentWithAssessments>
        </>
      ) : (
        <StyledContentWithoutAssessments>
          <>
            <StyledMessage>
              Please add a new assessment using the button below in the right
              corner.
            </StyledMessage>
          </>
        </StyledContentWithoutAssessments>
      )}
      <NewAssessmentLink href="/create">Add Assessment</NewAssessmentLink>
    </StyledContent>
  );
}
