import styled from "styled-components";

const StyledFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #282c34;
  color: #61dafb;
  padding: 1rem; /* Ändere die Höhe nach Bedarf */
  text-align: center;
  z-index: 1; /* Stelle sicher, dass der Footer immer oben ist */
`;

export default function Footer() {
  return (
    <StyledFooter>
      &copy; {new Date().getFullYear()} JK LegalSolutions
    </StyledFooter>
  );
}
