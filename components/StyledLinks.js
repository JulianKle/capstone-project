import Link from "next/link.js";
import styled from "styled-components";

export const BaseLink = styled(Link)`
  background-color: #61dafb;
  color: #282c34;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;

  &:hover {
    background-color: #38a169;
  }
`;

export const CreateEditLink = styled(BaseLink)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.8rem;
  font-size: 1.2rem;
`;
export const NewLink = styled(BaseLink)`
  position: fixed;
  bottom: 4rem;
  right: 0.2rem;
  padding: 0.5rem 0.3rem;
  font-size: 1rem;
  z-index: 2;
`;

export const DetailPageLink = styled(BaseLink)`
  position: absolute;
  top: 4.5rem;
  right: 1.5rem;
  padding: 0.8rem;
  font-size: 1.2rem;
`;
