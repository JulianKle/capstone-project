import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import { Form } from "@/components/form/Form.js";
import styled from "styled-components";

const StyledContent = styled.div`
  padding-top: 1.5cm; /* Abstand zum Header */
  padding-bottom: 1.5cm; /* Ändere die Höhe nach Bedarf, um Platz für den Footer zu schaffen */
`;

const EditContainer = styled.div`
  padding: 20px;
  background-color: #1e2124;
  color: #61dafb;
  position: relative;
  margin-left: 0.5cm; // Hinzugefügt: Linker Rand
  margin-right: 0.5cm; // Hinzugefügt: Rechter Rand
`;

const EditTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px; // Hinzugefügt
`;

const StyledLink = styled.a`
  position: absolute;
  top: 25px;
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
        <Link href={`/assessments/${id}`} passHref legacyBehavior>
          <StyledLink>Back</StyledLink>
        </Link>
        <Form
          handleAssessmentOperation={editAssessment}
          formName={"edit-assessment"}
          defaultData={assessment}
        />
      </EditContainer>
    </StyledContent>
  );
}
