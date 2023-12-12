import GlobalStyle from "../styles";
import Header from "../components/Layout/header/Header.js";
import Footer from "../components/Layout/footer/Footer.js";
import { useState } from "react";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [assessments, setAssessments] = useState([]);

  function handleNewAssessment(newAssessment) {
    const updatedAssessment = [{ id: uid(), ...newAssessment }, ...assessments];
    setAssessments(updatedAssessment);
  }

  return (
    <>
      <Header />
      <GlobalStyle />
      <Component
        {...pageProps}
        assessments={assessments}
        handleNewAssessment={handleNewAssessment}
      />
      <Footer />
    </>
  );
}
