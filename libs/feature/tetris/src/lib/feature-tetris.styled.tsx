import styled from '@emotion/styled';

export const GameContainer = styled.div`
  height: 50em;
  width: 25em;
  background-color: #EAECF4;
  border-radius: 1em;
`

export const PauseContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 3em;
  padding: 1.25em;
`;

export const PauseTitle = styled.p`
  color: #252936;
  font-size: 1.75rem;
  font-weight: bold;
  text-align: center;
`;

export const PauseButtonsContainer = styled.div`
  width: 100%;
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75em;
`;

export const ResumeButton = styled.button`
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

export const TetrisContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  gap: 0.75em;
  flex-direction: column;
  padding: 3.5em 1.5em 2.75em;
`;

export const TetrisProgress = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ProgressText = styled.p`
  color: #252936;
  font-size: 0.75rem;
  font-weight: bold;
  margin-top: 0.25em;
  text-align: start;
`;

export const ProgressContainer = styled.div`
  height: 0.5em;
  width: 100%;
  background-color: #2529363c;
  border-radius: 1em;
`;

export const Progress = styled.div`
  height: 100%;
  width: 50%;
  background-color: #252936;
  border-radius: 1em;
`;

export const TetrisHoldAndNextContainer = styled.div`
  height: 5.5em;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 0.75em;
`;

export const TetrisHold = styled.div`
  flex: 1;
  height: 100%;
  background-color: #252936;
  border-radius: 1em;
`;

export const HoldText = styled.p`
  color: #eaecf4;
  font-size: 0.75rem;
  font-weight: bold;
  margin-left: 1em;
  margin-top: 0.25em;
  text-align: start;
`;

export const HoldItem = styled.div`
  display: flex;
  justify-content: end;
  margin: 0 2em;
`;

export const TetrisNext = styled.div`
  flex: 2;
  height: 100%;
  background-color: #252936;
  border-radius: 1em;
`;

export const NextText = styled.p`
  color: #eaecf4;
  font-size: 0.75rem;
  font-weight: bold;
  margin-left: 1em;
  margin-top: 0.25em;
  text-align: start;
`;

export const NextItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 1em;
  margin: 0 1em;
`;

export const NextItem = styled.div`
  display: flex;
  justify-content: end;
  margin: 0 0.25em;
`;

export const TetrisBoard = styled.div`
  height: 100%;
  background-color: #252936;
  border-radius: 1em;
`;

export const TetrisScoreAndPauseContainer = styled.div`
  height: 5.5em;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 0.75em;
`;

export const TetrisLevelScoreContainer = styled.div`
  flex: 2;
  height: 100%;
  width: 50%;
  background-color: #252936;
  border-radius: 1em;
  display: flex;
`;

export const LevelContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ScoreContainer = styled.div`
  flex: 1;
  height: 100%;
`;

export const ContainerTitle = styled.p`
  color: #eaecf4;
  font-size: 0.75rem;
  font-weight: bold;
  margin-left: 1em;
  margin-top: 0.25em;
  text-align: start;
`;

export const LevelScoreValue = styled.p`
  color: #eaecf4;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

export const TetrisPlayPauseContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PlayPauseButton = styled.button`
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

export const TetrisConnectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  align-items: center;
`;

export const ConnectionDot = styled.div`
  height: 0.75em;
  width: 0.75em;
  border-radius: 50%;
  background-color: #10c010;
`;

export const ConnectionText = styled.p`
  color: #252936;
  font-size: 0.75rem;
  font-weight: bold;
  text-align: start;
`;

