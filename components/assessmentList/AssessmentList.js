// Card.js
import styled from "styled-components";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router.js";

export const CardSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 20px;
  border: 2px solid #1e2124;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #1e2124;
  color: #61dafb;

  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 8px;
    font-size: 18px;
  }

  button {
    margin-top: 15px;
    padding: 10px;
    font-size: 18px;
    background-color: #61dafb;
    color: #282c34;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #38a169;
    }
  }
`;

function getColorCode(assessment) {
  if (
    assessment.cognitiveBehavior ||
    assessment.socialScoring ||
    assessment.biometricIdentification
  ) {
    return "#8B0000"; // Dunkles Weinrot für Unacceptable Risk
  } else if (
    assessment.useUnderSafetyRegulation ||
    assessment.useInCertainArea
  ) {
    return "#A05600"; // Dunkles Orange für High Risk
  } else if (assessment.specificTransparencyRisk) {
    return "#1F3A4D"; // Dunkles Blau für Only use of GenAI
  } else if (assessment.gpai) {
    return "#1F3A4D"; // Dunkles Grün für No special classification
  } else if (assessment.minimalRisk) {
    return "#3D8B37"; // Dunkles Grün für No special classification
  }
}

export function AssessmentList({ onEditAssessment, onDeleteAssessment }) {
  const router = useRouter();
  const { data: assessments, isLoading } = useSWR("/api/assessments");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!assessments) {
    return;
  }

  return (
    <>
      {assessments.map((assessment) => (
        <CardSection
          key={assessment._id}
          style={{ backgroundColor: getColorCode(assessment) }}
        >
          <h3>{assessment.title}</h3>
          <ul>
            <li>{assessment.editor}</li>
            <li>{assessment.company}</li>
          </ul>
          {assessment.cognitiveBehavior ||
          assessment.socialScoring ||
          assessment.biometricIdentification ? (
            <p>Result: Unacceptable Risk</p>
          ) : assessment.useUnderSafetyRegulation ||
            assessment.useInCertainArea ? (
            <p>Result: High Risk</p>
          ) : assessment.specificTransparencyRisk ? (
            <p>
              Result: There might be some risks for users. Extended transparency
              obligations.
            </p>
          ) : assessment.minimalRisk && !assessment.gpai ? (
            <p>Result: Minimal Risk. Only voluntary &quot;obligations&quot;.</p>
          ) : null}
          {assessment.gpai ? (
            <p>
              The prerequisites for classification as general-purpose AI are met
              and therefore systematic risks may exist.{" "}
            </p>
          ) : null}

          <button onClick={() => onDeleteAssessment(assessment._id)}>
            Delete
          </button>
          <Link href={`/assessments/${assessment._id}`}>
            <button>Details</button>
          </Link>
        </CardSection>
      ))}
    </>
  );
}
