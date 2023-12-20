import styled from "styled-components";

const BaseButton = styled.button`
  padding: 0.7rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: #61dafb;
  color: #282c34;
  margin-top: 0.8rem;

  &:hover {
    background-color: #38a169;
  }
`;

export const ButtonEdit = styled(BaseButton)`
  margin-right: 0.5rem;
`;

export const ButtonDelete = styled(BaseButton)`
  margin-left: 0.5rem;
`;
