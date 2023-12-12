// Formular.js
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";

const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #282c34;
  color: #61dafb;
  margin-left: 0.5cm; // Hinzugefügt: Linker Rand
  margin-right: 0.5cm; // Hinzugefügt: Rechter Rand
`;

const FormField = styled.article`
  margin-bottom: 24px;

  label {
    margin-bottom: 8px;
    font-size: 18px;
    display: block;
  }

  .group-label {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 12px;
    border-bottom: 2px solid #61dafb;
    padding-bottom: 8px;
  }

  .checkbox-group {
    margin-bottom: 16px;
  }

  .checkbox-items {
    display: flex;
    flex-wrap: wrap;
  }

  .checkbox-item {
    display: flex;
    align-items: center;
    margin-right: 16px;
  }

  input[type="checkbox"] {
    width: auto;
    margin-right: 8px;
  }

  .checkbox-label {
    font-size: 16px;
  }

  input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 2px solid #61dafb;
    border-radius: 4px;
    background-color: #282c34;
    color: #61dafb;
    outline: none;

    .group-label {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 12px;
      border-bottom: 2px solid #61dafb;
      padding-bottom: 8px;
    }

    &:focus {
      border-color: #38a169;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
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
`;

export default function Formular({ handleNewAssessment }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    editor: "",
    company: "",
    status: "",
    cognitiveBehavior: false,
    socialScoring: false,
    biometricIdentification: false,
    useUnderSafetyRegulation: false,
    useInCertainArea: false,
    useGenAI: false,
    noneAboveApplies: false,
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleCheckboxChange(checkboxName) {
    setFormData({
      ...formData,
      [checkboxName]: !formData[checkboxName],
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const updatedData = {
      ...formData,
    };

    handleNewAssessment(updatedData);

    router.push("/");
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormField>
        <label htmlFor="title">Assessment Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </FormField>
      <FormField>
        <label htmlFor="editor">Editor:</label>
        <input
          type="text"
          name="editor"
          value={formData.editor}
          onChange={handleInputChange}
        />
      </FormField>
      <FormField>
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
        />
      </FormField>
      <FormField>
        <label htmlFor="status">Status:</label>
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        />
      </FormField>

      <FormField>
        <article>
          <p className="group-label">Unacceptable Risk</p>
          <label htmlFor="cognitiveBehavior">
            Is the system capable of cognitive behavioral manipulation of
            individuals or certain vulnerable groups (e.g. children)?
          </label>
          <input
            id="cognitiveBehavior"
            name="cognitiveBehavior"
            type="checkbox"
            checked={formData.cognitiveBehavior}
            onChange={() => handleCheckboxChange("cognitiveBehavior")}
          />
          <label htmlFor="socialScoring">
            Is the system able to classify people on the basis of behavior,
            socio-economic status and personal characteristics (social scoring)?
          </label>
          <input
            id="socialScoring"
            name="socialScoring"
            type="checkbox"
            checked={formData.socialScoring}
            onChange={() => handleCheckboxChange("socialScoring")}
          />
          <label htmlFor="biometricIdentification">
            Is the system capable of performing real-time remote biometric
            identification systems, for example facial recognition?
          </label>
          <input
            id="biometricIdentification"
            name="biometricIdentification"
            type="checkbox"
            checked={formData.biometricIdentification}
            onChange={() => handleCheckboxChange("biometricIdentification")}
          />
        </article>

        <article>
          <p className="group-label">High Risk</p>
          <label htmlFor="useUnderSafetyRegulation">
            Will the system be used in products that fall under EU product
            safety regulations? This includes toys, aviation, vehicles, medical
            devices and elevators.
          </label>
          <input
            id="useUnderSafetyRegulation"
            name="useUnderSafetyRegulation"
            type="checkbox"
            checked={formData.useUnderSafetyRegulation}
            onChange={() => handleCheckboxChange("useUnderSafetyRegulation")}
          />
          <label htmlFor="useInCertainArea">
            Is the system used in one of the following areas? - Biometric
            identification and categorization of natural persons; - management
            and operation of critical infrastructure; - Education and training;
            - Employment, management of employees and access to self-employment;
            - access to and use of essential private and public services and
            benefits; - Law enforcement; - Migration, asylum and border control
            management; - Support in the interpretation and application of laws.
          </label>
          <input
            id="useInCertainArea"
            name="useInCertainArea"
            type="checkbox"
            checked={formData.useInCertainArea}
            onChange={() => handleCheckboxChange("useInCertainArea")}
          />
        </article>

        <article>
          <p className="group-label">GenAI</p>
          <label htmlFor="useGenAI">
            Will the system use or be based on Generative Foundation models such
            as ChatGPT?
          </label>
          <input
            id="useGenAI"
            name="useGenAI"
            type="checkbox"
            checked={formData.useGenAI}
            onChange={() => handleCheckboxChange("useGenAI")}
          />
        </article>

        <article>
          <p className="group-label">Low Risk</p>
          <label htmlFor="noneAboveApplies">None of the above applies.</label>
          <input
            id="noneAboveApplies"
            name="noneAboveApplies"
            type="checkbox"
            checked={formData.noneAboveApplies}
            onChange={() => handleCheckboxChange("noneAboveApplies")}
          />
        </article>
      </FormField>

      <SubmitButton type="submit">Submit</SubmitButton>
    </StyledForm>
  );
}
