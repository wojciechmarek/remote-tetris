import styled from '@emotion/styled';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';

const GamepadContainer = styled.div`
  background-color: #eaeaea;
  height: 100%;
  width: 100%;
  padding: 1em;
`;

const GamepadVerticalContainer = styled.div`
  display: none;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  height: 100%;

  @media (orientation: portrait) {
    display: flex;
  }
`;

const VerticalButtonContainer = styled.div`
  display: flex;
  gap: 1em;
`;

const VerticalButton = styled.button`
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

const VerticalDescription = styled.p`
  color: #252936;
  font-size: 1em;
  font-weight: bold;
  text-align: center;
`;

const VerticalSwipeContainer = styled.div`
  height: 30em;
  width: 100%;
  border: 10px solid #252936;
`;

const GamepadHorizontalContainer = styled.div`
  display: none;
  flex-direction: row;
  align-items: center;
  height: 100%;



  @media (orientation: landscape) {
    display: flex;
  }
`;

const HorizontalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1em;
  width: 100%;
  border-radius: 0.75em;
`;

const GridButton = styled.button`
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

  &.rotate {
    grid-column: 1 / span 2;
    grid-row: 3 / span 1;
  }

  &.hold {
    grid-column: 3 / span 1;
    grid-row: 3 / span 1;
  }

  &.pause {
    grid-column: 4 / span 1;
    grid-row: 3 / span 1;
  }

  &.left {
    grid-column: 7 / span 1;
    grid-row: 2 / span 1;
  }

  &.up {
    grid-column: 8 / span 1;
    grid-row: 1 / span 1;
  }

  &.down {
    grid-column: 8 / span 1;
    grid-row: 3 / span 1;
  }

  &.right {
    grid-column: 9 / span 1;
    grid-row: 2 / span 1;
  }
`;


export function Gamepad() {
  return (
    <GamepadContainer>
      <GamepadVerticalContainer>
        <VerticalButtonContainer>
          <VerticalButton>
            HOLD
          </VerticalButton>
          <VerticalButton>
            PAUSE
          </VerticalButton>
        </VerticalButtonContainer>
        <VerticalDescription>
          Swipe in the box below to move and tap to rotate the piece.
        </VerticalDescription>
        <VerticalSwipeContainer />
      </GamepadVerticalContainer>
      <GamepadHorizontalContainer>
        <HorizontalGrid>
          <GridButton className="rotate">ROTATE</GridButton>
          <GridButton className="hold">HOLD</GridButton>
          <GridButton className="pause">PAUSE</GridButton>
          <GridButton className="left"><ChevronLeft /></GridButton>
          <GridButton className="up"><ChevronUp /></GridButton>
          <GridButton className="down"><ChevronDown /></GridButton>
          <GridButton className="right"><ChevronRight /></GridButton>
        </HorizontalGrid>
      </GamepadHorizontalContainer>
    </GamepadContainer>
  );
}
