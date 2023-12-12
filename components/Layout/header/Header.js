// Header.js
import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #282c34;
  color: #61dafb;
  padding: 1rem; /* Ändere die Höhe nach Bedarf */
  text-align: center;
  z-index: 2; /* Stelle sicher, dass der Header immer über dem Content ist */
  box-sizing: border-box; /* Behalte die Gesamtbreite von 100% bei, auch mit Padding und Border */
`;

export default function Header() {
  return <StyledHeader>KRAT</StyledHeader>;
}
