import styled from '@emotion/styled';

export const StartContainer = styled.div`
  color: pink;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StartLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
`;


export const StartLogo = styled.img`
  height: 10em;
  width: 10em;
  object-fit: contain;
`;

export const StartTitle = styled.h1`
  margin-top: 1em;
  color: #121212;
  font-size: 3em;
  text-align: center;
  margin: 0.5em 0;
  font-weight: bold;
`;

export const StartButtonsContainer = styled.div` 
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75em;
`;

export const StartButton = styled.button`
padding: 1em 0;
  width: 20em;
  background-color: #2d3348;
  border: none;
  border-radius: 0.75em;
  color: #EAECF4;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #3e4664;
    color: #EAECF4;
  }
`;


