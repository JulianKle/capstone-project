import GlobalStyle from "../styles";
import Header from "../components/Layout/header/Header.js";
import Footer from "../components/Layout/footer/Footer.js";
import { useState } from "react";
import { uid } from "uid";
import { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const [searchTerm, setSearchTerm] = useState("");

  //Assesments löschen
  function handleDeleteAssessment(id) {
    setAssessments(
      assessments.filter((assessment) => {
        return assessment.id !== id;
      })
    );
  }

  //Filter Funktion
  function changeSearchTerm(newSearchTerm) {
    setSearchTerm(newSearchTerm);
  }

  function resetSearchTerm() {
    setSearchTerm(null);
  }

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <Header />
        <GlobalStyle />
        <Component
          {...pageProps}
          handleDeleteAssessment={handleDeleteAssessment}
          changeSearchTerm={changeSearchTerm}
          resetSearchTerm={resetSearchTerm}
          searchTerm={searchTerm}
        />
        <Footer />
      </SWRConfig>
    </>
  );
}
