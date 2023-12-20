import { useRouter } from "next/router";
import useSWR from "swr";
import { Form } from "@/components/form/Form.js";
import { CreateEditLink } from "@/components/StyledLinks";
import { StyledContent } from "@/components/StyledContent";
import { Container, Title } from "@/components/StyledCreateEditPage";

export default function CreateAssessmentPage() {
  const router = useRouter();
  const { mutate } = useSWR("/api/assessments/");

  async function newAssessment(formData) {
    const response = await fetch("/api/assessments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      mutate();
      router.push("/");
    }
  }

  return (
    <StyledContent>
      <Container>
        <Title id="add-assessment">Add Assessment</Title>
        <CreateEditLink href="/">Back </CreateEditLink>
        <Form
          handleAssessmentOperation={newAssessment}
          formName={"add-assessment"}
        />
      </Container>
    </StyledContent>
  );
}
