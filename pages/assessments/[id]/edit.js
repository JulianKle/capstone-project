import { useRouter } from "next/router";
import useSWR from "swr";
import { Form } from "@/components/form/Form.js";
import styled from "styled-components";
import { CreateEditLink } from "@/components/StyledLinks";
import { StyledContent } from "@/components/StyledContent";
import { Container, Title } from "@/components/StyledCreateEditPage";

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
      <Container>
        <Title id="edit-assessment">Edit Assessment: {assessment.title}</Title>
        <CreateEditLink href={`/assessments/${id}`}>Back</CreateEditLink>
        <Form
          handleAssessmentOperation={editAssessment}
          formName={"edit-assessment"}
          defaultData={assessment}
        />
      </Container>
    </StyledContent>
  );
}
