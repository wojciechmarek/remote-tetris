import styled from '@emotion/styled';
import { Pause } from 'lucide-react';

const TetrisContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  gap: 0.75em;
  flex-direction: column;
  padding: 3.5em 1.5em 2.75em;
`;

const TetrisProgress = styled.div`
  width: 100%;
  background-color: #2d3348;
  height: 1.5em;
`;

const TetrisHoldAndNextContainer = styled.div`
  height: 5.5em;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 0.75em;
`;

const TetrisHold = styled.div`
  flex: 1;
  height: 100%;
  background-color: #252936;
  border-radius: 1em;
`;

const TetrisNext = styled.div`
  flex: 2;
  height: 100%;
  background-color: #252936;
  border-radius: 1em;
`;

const TetrisBoard = styled.div`
  height: 100%;
  background-color: #252936;
  border-radius: 1em;
`;

const TetrisScoreAndPauseContainer = styled.div`
  height: 5.5em;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 0.75em;
`;

const TetrisLevelScoreContainer = styled.div`
  flex: 2;
  height: 100%;
  width: 50%;
  background-color: #252936;
  border-radius: 1em;
  display: flex;
`;

const LevelContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ScoreContainer = styled.div`
  flex: 1;
  height: 100%;
`;

const ContainerTitle = styled.p`
  color: #eaecf4;
  font-size: 0.75rem;
  font-weight: bold;
  margin-left: 1em;
  margin-top: 0.25em;
  text-align: start;
`;

const LevelScoreValue = styled.p`
  color: #eaecf4;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const TetrisPlayPauseContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayPauseButton = styled.button`
  height: 100%;
  width: 100%;

  background-color: transparent;
  border: none;
  border-radius: 1em;
  color: #252936;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid #252936;

  &:hover {
    background-color: #252936;
    color: #eaecf4;
  }
`;

const TetrisConnectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  align-items: center;
`;

const ConnectionDot = styled.div`
  height: 0.75em;
  width: 0.75em;
  border-radius: 50%;
  background-color: #10c010;
`;

const ConnectionText = styled.p`
  color: #252936;
  font-size: 0.75rem;
  font-weight: bold;
  text-align: start;
`;

export function Tetris() {
  return (
    <TetrisContainer>
      <TetrisProgress>Progress</TetrisProgress>
      <TetrisHoldAndNextContainer>
        <TetrisHold>Hold</TetrisHold>
        <TetrisNext>Next</TetrisNext>
      </TetrisHoldAndNextContainer>
      <TetrisBoard>Board</TetrisBoard>
      <TetrisScoreAndPauseContainer>
        <TetrisLevelScoreContainer>
          <LevelContainer>
            <ContainerTitle>Level:</ContainerTitle>
            <LevelScoreValue>8</LevelScoreValue>
          </LevelContainer>
          <ScoreContainer>
            <ContainerTitle>Score:</ContainerTitle>
            <LevelScoreValue>3357</LevelScoreValue>
          </ScoreContainer>
        </TetrisLevelScoreContainer>
        <TetrisPlayPauseContainer>
          <PlayPauseButton>
            <Pause />
          </PlayPauseButton>
        </TetrisPlayPauseContainer>
      </TetrisScoreAndPauseContainer>
      <TetrisConnectionContainer>
        <ConnectionDot />
        <ConnectionText>Connected to 123.122.244.2</ConnectionText>
      </TetrisConnectionContainer>
    </TetrisContainer>
  );
}
