import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { AssessmentList } from "@/components/assessmentList/AssessmentList";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const BackgroundAnimation = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #61dafb, #38a169);
  z-index: -1;
  animation: ${fadeIn} 2s ease-in-out;
`;

const StyledContentWithAssessments = styled.div`
  position: relative;
  padding-top: 2rem;
  text-align: center;
  z-index: 1;
`;

const StyledContentWithoutAssessments = styled.div`
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
  font-size: 24px;
  color: #282c34;
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  position: fixed;
  bottom: 80px; /* Verhindere, dass der Button den Footer überlappt */
  right: 20px;
  padding: 8px 12px;
  font-size: 16px;
  background-color: #61dafb;
  color: #282c34;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  z-index: 2; /* Stelle sicher, dass der Button über dem Footer liegt */

  &:hover {
    background-color: #38a169;
  }
`;

export default function HomePage({
  assessments,
  handleEditAssessment,
  handleDeleteAssessment,
}) {
  return (
    <>
      {assessments.length === 0 && <BackgroundAnimation />}
      {assessments.length > 0 ? (
        <StyledContentWithAssessments>
          <AssessmentList
            assessments={assessments}
            onEditAssessment={handleEditAssessment}
            onDeleteAssessment={handleDeleteAssessment}
          />
        </StyledContentWithAssessments>
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
      <StyledLink href="/form">Add New Assessment</StyledLink>
    </>
  );
}
