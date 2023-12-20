import { useRouter } from "next/router";
import useSWR from "swr";
import { Form } from "@/components/form/Form.js";
import styled from "styled-components";
import { StyledLink } from "@/components/StyledLink";
import { StyledContent } from "@/components/StyledContent";

const CreateContainer = styled.section`
  padding: 1rem;
  background-color: #1e2124;
  color: #61dafb;
  position: relative;
  margin-left: 0.8rem;
  margin-right: 1rem;
`;

const CreateTitle = styled.h2`
  font-size: 1.7rem;
  margin-bottom: 0.8rem;
`;

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
      <CreateContainer>
        <CreateTitle id="add-assessment">Add Assessment</CreateTitle>
        <StyledLink href="/">Back </StyledLink>
        <Form
          handleAssessmentOperation={newAssessment}
          formName={"add-assessment"}
        />
      </CreateContainer>
    </StyledContent>
  );
}
