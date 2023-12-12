import { AssessmentList } from "@/components/assessmentList/AssessmentList";
import styled from "styled-components";

const StyledContent = styled.div`
  padding-top: 1.5cm; /* Abstand zum Header */
  padding-bottom: 2rem; /* Ändere die Höhe nach Bedarf, um Platz für den Footer zu schaffen */
`;

export default function HomePage() {
  return (
    <StyledContent>
      <AssessmentList />
    </StyledContent>
  );
}
