import Link from "next/link.js";
import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "@/components/form/Form.js";
import styled from "styled-components";

const CreateContainer = styled.div`
  padding: 20px;
  background-color: #282c34;
  color: #61dafb;
  position: relative; // Hinzugefügt
`;

const CreateTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px; // Hinzugefügt
`;

const StyledLink = styled.a`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px;
  font-size: 18px;
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

  async function onSubmit(formData) {
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
    <CreateContainer>
      <CreateTitle id="add-assessment">Add Assessment</CreateTitle>
      <Link href="/" passHref legacyBehavior>
        <StyledLink>Back</StyledLink>
      </Link>
      <Form handleAssessmentOperation={onSubmit} formName={"add-assessment"} />
    </CreateContainer>
  );
}
