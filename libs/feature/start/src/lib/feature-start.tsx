import { StartButton, StartButtonsContainer, StartContainer, StartLogo, StartLogoContainer, StartTitle } from './feature-start.styled';


export function TetrisStart() {
  return (
    <StartContainer>
      <StartLogoContainer>
        <StartLogo src="https://raw.githubusercontent.com/wojciechmarek/rtc-tetris/main/libs/feature/start/src/lib/tetris.svg" />
      </StartLogoContainer>
      <StartTitle>TETRIS</StartTitle>
      <StartButtonsContainer>
        <StartButton>START</StartButton>
        <StartButton>SCORES</StartButton>
      </StartButtonsContainer>
    </StartContainer>
  );
}
