import { GameContainer, LayoutContainer } from './feature-layout.styled';
import './styles/global.css';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <LayoutContainer>
      <GameContainer>
        <Outlet />
      </GameContainer>
    </LayoutContainer>
  );
}
