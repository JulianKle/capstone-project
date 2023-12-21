import styled from "styled-components";

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #282c34;
  color: #61dafb;
  padding: 1rem;
  text-align: center;
  z-index: 2;
`;

export default function Header() {
  return <StyledHeader>KRAT</StyledHeader>;
}
