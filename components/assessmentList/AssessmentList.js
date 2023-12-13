// Card.js
import React from "react";
import styled from "styled-components";
import Link from "next/link";

export const CardSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 20px;
  border: 2px solid #61dafb;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #282c34;
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
  } else if (assessment.useGenAI) {
    return "#1F3A4D"; // Dunkles Blau für Only use of GenAI
  } else if (assessment.noneAboveApplies) {
    return "#3D8B37"; // Dunkles Grün für No special classification
  }
}

export function AssessmentList({
  assessments,
  onEditAssessment,
  onDeleteAssessment,
}) {
  if (!assessments?.length === 0) {
    return <p>Bitte Assessments hinzufügen.</p>;
  }

  return (
    <>
      {assessments.map((assessment) => (
        <CardSection
          key={assessment.id}
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
          ) : assessment.useGenAI ? (
            <p>Result: Only use of GenAI. Extended transparency obligations.</p>
          ) : assessment.noneAboveApplies ? (
            <p>
              Result: No special classification. Only minor transparency
              obligations.
            </p>
          ) : null}
          <Link href="/form">
            <button onClick={() => onEditAssessment(assessment.id)}>
              Edit
            </button>
          </Link>

          <button onClick={() => onDeleteAssessment(assessment.id)}>
            Delete
          </button>
        </CardSection>
      ))}
    </>
  );
}
