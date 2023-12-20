import Link from "next/link.js";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Form } from "@/components/form/Form.js";
import styled from "styled-components";

const StyledContent = styled.div`
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;
`;

const CreateContainer = styled.div`
  padding: 1rem;
  background-color: #1e2124;
  color: #61dafb;
  position: relative;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const CreateTitle = styled.h2`
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
