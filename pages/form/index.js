import Form from "../../components/form/Form.js";
import styled from "styled-components";

const StyledContent = styled.div`
  padding-top: 1.5cm; /* Abstand zum Header */
  padding-bottom: 1.5cm; /* Ändere die Höhe nach Bedarf, um Platz für den Footer zu schaffen */
`;

export default function AssessmentForm({ handleNewAssessment }) {
  return (
    <>
      <StyledContent>
        <Form handleNewAssessment={handleNewAssessment} />
      </StyledContent>
    </>
  );
}