import GlobalStyle from "../styles";
import Header from "../components/Layout/header/Header.js";
import Footer from "../components/Layout/footer/Footer.js";
import { useState } from "react";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [assessments, setAssessments] = useState([]);
  const [editingAssessment, setEditingAssessment] = useState(null);

  function handleNewAssessment(newAssessment) {
    const updatedAssessment = [{ id: uid(), ...newAssessment }, ...assessments];
    setAssessments(updatedAssessment);
  }

  function handleEditAssessment(id) {
    const assessmentToEdit = assessments.find(
      (assessment) => assessment.id === id
    );

    setEditingAssessment(assessmentToEdit);
  }

  function handleUpdateAssessment(updatedData) {
    const updatedAssessments = assessments.map((assessment) =>
      assessment.id === editingAssessment.id
        ? { ...assessment, ...updatedData }
        : assessment
    );

    setEditingAssessment(null);

    setAssessments(updatedAssessments);
  }

  return (
    <>
      <Header />
      <GlobalStyle />
      <Component
        {...pageProps}
        assessments={assessments}
        handleNewAssessment={handleNewAssessment}
        handleEditAssessment={handleEditAssessment}
        handleUpdateAssessment={handleUpdateAssessment}
        editingAssessment={editingAssessment}
      />
      <Footer />
    </>
  );
}
