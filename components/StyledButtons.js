import styled from "styled-components";

const BaseButton = styled.button`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: #61dafb;
  color: #282c34;

  &:hover {
    background-color: #38a169;
  }
`;

export const ButtonForm = styled(BaseButton)`
  padding: 0.7rem;
  font-size: 1.2rem;
  margin-top: 0.8rem;
  margin-right: 0.5rem;
`;

export const SearchButton = styled(BaseButton)`
  flex: 0 0 40%;
  margin-top: 1.6rem;
  padding: 0.6rem;
  font-size: 0.9rem;
`;

export const BackToOverviewButton = styled(BaseButton)`
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

export const DetailCardButton = styled(BaseButton)`
  margin-top: 0.9rem;
  padding: 0.7rem;
  font-size: 1.2rem;
`;
