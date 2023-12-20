import Link from "next/link.js";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.8rem;
  font-size: 1.2rem;
  background-color: #61dafb;
  color: #282c34;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;

  &:hover {
    background-color: #38a169;
    text-decoration: underline;
  }
`;
