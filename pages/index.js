import { AssessmentList } from "@/components/assessmentList/AssessmentList";
import styled from "styled-components";
import Link from "next/link";

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

const StyledContent = styled.div`
  padding-top: 1.5cm; /* Abstand zum Header */
  padding-bottom: 2rem; /* Ändere die Höhe nach Bedarf, um Platz für den Footer zu schaffen */
`;

const StyledMessage = styled.p`
  font-size: 24px;
  color: #282c34; /* Dunklere Schriftfarbe */
  text-align: center; /* Zentrierte Ausrichtung */
  margin-top: 20px;
`;

export default function HomePage({ assessments }) {
  return (
    <StyledContent>
      {assessments.length > 0 ? (
        <AssessmentList assessments={assessments} />
      ) : (
        <StyledMessage>
          Please add Assessment via the Add New Assessment button.
        </StyledMessage>
      )}
      <StyledLink href="/form">Add New Assessment</StyledLink>
    </StyledContent>
  );
}
