// Formular.js
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";

const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #1e2124;
  color: #61dafb;
  margin-left: 0.7rem;
  margin-right: 0.7rem;
`;

const FormField = styled.article`
  margin-bottom: 1rem;

  label {
    margin-bottom: 8px;
    font-size: 1.2rem;
    display: block;
  }

  .group-label {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 0.8rem;
    border-bottom: 2px solid #61dafb;
    padding-bottom: 0.6rem;
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
    font-size: 1.2rem;
  }

  input {
    width: 100%;
    padding: 0.6rem;
    font-size: 1rem;
    border: 2px solid #61dafb;
    border-radius: 4px;
    background-color: #282c34;
    color: #61dafb;
    outline: none;

    .group-label {
      font-size: 1.4rem;
      font-weight: bold;
      margin-bottom: 1rem;
      border-bottom: 2px solid #61dafb;
      padding-bottom: 0.8rem;
    }

    &:focus {
      border-color: #38a169;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 1.2rem;
  padding: 0.8rem;
  font-size: 1.3rem;
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

const SubmitErrorMessage = styled.p`
  font-size: 1.3rem;
  color: red;
  text-align: center;
  margin-top: 1.1rem;
  width: 100%;
`;

export function Form({ handleAssessmentOperation, defaultData }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: defaultData?.title || "",
    editor: defaultData?.editor || "",
    company: defaultData?.company || "",
    status: defaultData?.status || "",
    cognitiveBehavior: defaultData?.cognitiveBehavior || false,
    socialScoring: defaultData?.socialScoring || false,
    biometricIdentification: defaultData?.biometricIdentification || false,
    useUnderSafetyRegulation: defaultData?.useUnderSafetyRegulation || false,
    useInCertainArea: defaultData?.useInCertainArea || false,
    specificTransparencyRisk: defaultData?.specificTransparencyRisk || false,
    gpai: defaultData?.gpai || false,
    minimalRisk: defaultData?.minimalRisk || false,
  });

  function handleInputChange(event) {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleAssessmentOperation(formData);
    event.target.reset();
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormField>
        <label htmlFor="title">Assessment Title:</label>
        <input
          type="text"
          name="title"
          autocomplete="off"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </FormField>
      <FormField>
        <label htmlFor="editor">Editor:</label>
        <input
          type="text"
          name="editor"
          autocomplete="off"
          value={formData.editor}
          onChange={handleInputChange}
        />
      </FormField>
      <FormField>
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          name="company"
          autocomplete="off"
          value={formData.company}
          onChange={handleInputChange}
        />
      </FormField>
      <FormField>
        <label htmlFor="status">Status:</label>
        <input
          type="text"
          name="status"
          autocomplete="off"
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
          <label htmlFor="useInCertainArea">
            Is the system used in one of the following areas? - Biometric
            identification and categorization of natural persons; - Management
            and operation of critical infrastructure; - Education and training;
            - Employment, management of employees and access to self-employment;
            - Access to and use of essential private and public services and
            benefits; - Law enforcement; - Migration, asylum and border control
            management; - Support in the interpretation and application of laws.
          </label>
          <input
            id="useInCertainArea"
            name="useInCertainArea"
            type="checkbox"
            checked={formData.useInCertainArea}
            onChange={handleInputChange}
          />
        </article>

        <article>
          <p className="group-label">Risk of manipulation</p>
          <label htmlFor="specificTransparencyRisk">
            Will there be a risk of manipulation for the user of the system
            (e.g. when using chatbots)?
          </label>
          <input
            id="specificTransparencyRisk"
            name="specificTransparencyRisk"
            type="checkbox"
            checked={formData.specificTransparencyRisk}
            onChange={handleInputChange}
          />
        </article>

        <article>
          <p className="group-label">General-purpose AI</p>
          <label htmlFor="gpai">
            Will the AI system be trained with a total computational power of or
            more than 10^25 FLOPs?
          </label>
          <input
            id="gpai"
            name="gpai"
            type="checkbox"
            checked={formData.gpai}
            onChange={handleInputChange}
          />
        </article>

        <article>
          <p className="group-label">Minimal Risk</p>
          <label htmlFor="minimalRisk">None of the above applies.</label>
          <input
            id="minimalRisk"
            name="minimalRisk"
            type="checkbox"
            checked={formData.minimalRisk}
            onChange={handleInputChange}
          />
        </article>
      </FormField>

      {formData.cognitiveBehavior ||
      formData.socialScoring ||
      formData.biometricIdentification ||
      formData.useUnderSafetyRegulation ||
      formData.useInCertainArea ||
      formData.specificTransparencyRisk ||
      formData.gpai ||
      formData.minimalRisk ? (
        <SubmitButton type="submit">Submit</SubmitButton>
      ) : (
        <SubmitErrorMessage>
          Please select applicable checkbox(es) to submit form.
        </SubmitErrorMessage>
      )}
    </StyledForm>
  );
}
