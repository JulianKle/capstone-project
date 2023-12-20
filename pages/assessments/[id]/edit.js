import { useRouter } from "next/router";
import useSWR from "swr";
import { Form } from "@/components/form/Form.js";
import styled from "styled-components";
import { StyledLink } from "@/components/StyledLink";
import { StyledContent } from "@/components/StyledContent";

const EditContainer = styled.div`
  padding: 1rem;
  background-color: #1e2124;
  color: #61dafb;
  position: relative;
  margin-left: 0.8rem;
  margin-right: 1rem;
`;

const EditTitle = styled.h2`
  font-size: 1.7rem;
  margin-bottom: 0.8rem;
`;

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const {
    data: assessment,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/assessments/${id}`);

  async function editAssessment(formData) {
    const response = await fetch(`/api/assessments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push(`/assessments/${id}`);
      mutate();
    }
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <StyledContent>
      <EditContainer>
        <EditTitle id="edit-assessment">
          Edit Assessment: {assessment.title}
        </EditTitle>
        <StyledLink href={`/assessments/${id}`}>Back</StyledLink>
        <Form
          handleAssessmentOperation={editAssessment}
          formName={"edit-assessment"}
          defaultData={assessment}
        />
      </EditContainer>
    </StyledContent>
  );
}
