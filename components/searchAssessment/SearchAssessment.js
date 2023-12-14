// SearchAssessment.js
import styled from "styled-components";

const StyledSearchForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center; /* Ändere auf 'center', um die Elemente auf einer Höhe zu zentrieren */
  padding: 20px;
  background-color: #1e2124;
  color: #61dafb;
`;

const SearchField = styled.article`
  flex: 0 0 50%;
  margin-bottom: 16px;

  label {
    margin-bottom: 8px;
    font-size: 18px;
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

    &:focus {
      border-color: #38a169;
    }
  }
`;

const SearchButton = styled.button`
  flex: 0 0 40%;
  margin-top: 0.7cm; /* Ändere auf den gewünschten Abstand, z.B. '1cm' */
  padding: 10px;
  font-size: 14px;
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

const BackToOverviewButton = styled.button`
  width: 100%;
  margin-top: 8px;
  padding: 8px;
  font-size: 16px;
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

export function SearchAssessment({ onFilter, onOverview }) {
  function filterName(event) {
    event.preventDefault();
    onFilter(event.target.elements.search.value.toLowerCase());
  }

  return (
    <StyledSearchForm onSubmit={filterName}>
      <SearchField>
        <label htmlFor="search">Search for Assessment Title:</label>
        <input type="text" name="search" />
      </SearchField>

      <SearchButton type="submit">Search</SearchButton>
      <BackToOverviewButton type="reset" onClick={onOverview}>
        Back to overview
      </BackToOverviewButton>
    </StyledSearchForm>
  );
}
