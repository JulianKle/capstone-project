import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import { Form } from "@/components/form/Form.js";
import styled from "styled-components";

const StyledContent = styled.div`
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;
`;

const EditContainer = styled.div`
  padding: 1rem;
  background-color: #1e2124;
  color: #61dafb;
  position: relative;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const EditTitle = styled.h2`
  font-size: 1.7rem;
  margin-bottom: 0.8rem;
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.8rem;
  font-size: 1.2rem;
  background-color: #61dafb;
  color: #282c34;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;

  &:hover {
    background-color: #38a169;
    text-decoration: underline;
  }
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
