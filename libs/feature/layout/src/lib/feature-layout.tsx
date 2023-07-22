import { TetrisStart } from '@rtc-tetris/feature/start';
import { GameContainer, LayoutContainer } from './feature-layout.styled';
import './styles/global.css';

export function TetrisLayout() {
  return (
    <LayoutContainer>
      <GameContainer>
        <TetrisStart />
      </GameContainer>
    </LayoutContainer>
  );
}
