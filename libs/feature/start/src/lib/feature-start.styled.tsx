import styled from '@emotion/styled';

export const GameContainer = styled.div`
  height: 50em;
  width: 25em;
  background-color: #EAECF4;
  border-radius: 1em;
`

export const StartContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 3.5em 1.5em;
`;

export const StartLogoContainer = styled.div`
  margin-top: 2em;
  margin-bottom: 1em;
  height: 8em;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
`;


export const StartLogo = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

export const StartTitle = styled.h1`
  color: #121212;
  font-size: 3em;
  text-align: center;
  margin: 0.5em 0;
  font-weight: 900;
`;

export const StartButtonsContainer = styled.div` 
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75em;
`;

export const StartButton = styled.button`
  padding: 1em 0;
  width: 100%;
  background-color: #252936;
  border: none;
  border-radius: 0.75em;
  color: #EAECF4;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid #252936;

  &:hover {
    background-color: #EAECF4;
    color: #252936;
  }
`;

export const StartQrCodeContainer = styled.div`
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25em;
`;

export const StartQrTitle = styled.p`
  color: #121212;
  font-size: 1rem;
  text-align: center;
  margin: 0.5em 0;
  font-weight: 900;
`;

export const QRCodeContainer = styled.div`
  height: 7.5em;
  width: 7.5em;
  padding: 0.5em;
  border-radius: 0.75em;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
  border: 1px solid #252936;
  background-color: #fff;
`;


