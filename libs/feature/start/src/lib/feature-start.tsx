import { useNavigate } from 'react-router-dom';
import {
  QRCodeContainer,
  StartButton,
  StartButtonsContainer,
  StartContainer,
  StartLogo,
  StartLogoContainer,
  StartQrCodeContainer,
  StartQrTitle,
  StartTitle,
} from './feature-start.styled';
import QRCode from 'react-qr-code';

export function Start() {
  const navigation = useNavigate();

  const handleStartClick = () => {
    navigation('/tetris');
  };
  return (
    <StartContainer>
      <StartLogoContainer>
        <StartLogo src="https://raw.githubusercontent.com/wojciechmarek/rtc-tetris/main/libs/feature/start/src/lib/tetris.svg" />
      </StartLogoContainer>
      <StartTitle>TETRIS</StartTitle>
      <StartButtonsContainer>
        <StartButton onClick={handleStartClick}>START</StartButton>
        <StartButton>SCORES</StartButton>
      </StartButtonsContainer>
      <StartQrCodeContainer>
        <StartQrTitle>Use you phone as a gamepad:</StartQrTitle>
        <QRCodeContainer>
          <QRCode value="https://web-rtc-tetris.netlify.app/gamepad/asdasd-asd-asda-sdasdasd-asd-asd-asd" />
        </QRCodeContainer>
      </StartQrCodeContainer>
    </StartContainer>
  );
}
