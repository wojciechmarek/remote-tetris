import { StartButton, StartButtonsContainer, StartContainer, StartLogo, StartLogoContainer, StartTitle } from './feature-start.styled';


export function TetrisStart() {
  return (
    <StartContainer>
      <StartLogoContainer>
        <StartLogo src="./assets/tetris.png" />
      </StartLogoContainer>
      <StartTitle>TETRIS</StartTitle>
      <StartButtonsContainer>
        <StartButton>START</StartButton>
        <StartButton>SCORES</StartButton>
      </StartButtonsContainer>
    </StartContainer>
  );
}
