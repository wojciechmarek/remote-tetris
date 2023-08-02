import { Pause } from 'lucide-react';
import {
  PauseContainer,
  ConnectionDot,
  ConnectionText,
  ContainerTitle,
  HoldItem,
  HoldText,
  LevelContainer,
  LevelScoreValue,
  NextItem,
  NextItemsContainer,
  PlayPauseButton,
  Progress,
  ProgressContainer,
  ProgressText,
  ScoreContainer,
  TetrisBoard,
  TetrisConnectionContainer,
  TetrisContainer,
  TetrisHold,
  TetrisHoldAndNextContainer,
  TetrisLevelScoreContainer,
  TetrisNext,
  TetrisPlayPauseContainer,
  TetrisProgress,
  TetrisScoreAndPauseContainer,
  ResumeButton,
  PauseTitle,
  PauseButtonsContainer,
} from './feature-tetris.styled';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import korobeiniki from './korobeiniki.mp3';

export const Tetris = () => {
  const navigation = useNavigate();
  const [isPaused, setIsPaused] = useState(false);

  const audio = useRef(new Audio(korobeiniki));
  audio.current.playbackRate = 1;

  const handleOnPauseClick = () => {
    setIsPaused(!isPaused);
  }

  const handleOnExitClick = () => {
    setIsPaused(false);
    navigation('/');
  }

  useEffect(() => {
    if (isPaused) {
      audio.current.pause();
    } else {
      audio.current.play();
    }
  }, [isPaused, audio]);

  return (
    <>
      {isPaused && <PauseContainer>
        <PauseTitle>
          The game is paused
        </PauseTitle>
        <PauseButtonsContainer>
          <ResumeButton onClick={handleOnPauseClick}>
            RESUME
          </ResumeButton>
          <ResumeButton onClick={handleOnExitClick}>
            EXIT THE GAME
          </ResumeButton>
        </PauseButtonsContainer>

      </PauseContainer>}

      <TetrisContainer>
        <TetrisProgress>
          <ProgressText>Level progress:</ProgressText>
          <ProgressContainer>
            <Progress />
          </ProgressContainer>
        </TetrisProgress>
        <TetrisHoldAndNextContainer>
          <TetrisHold>
            <HoldText>Hold</HoldText>
            <HoldItem>L</HoldItem>
          </TetrisHold>
          <TetrisNext>
            <HoldText>Next</HoldText>
            <NextItemsContainer>
              <NextItem>L</NextItem>
              <NextItem>O</NextItem>
              <NextItem>S</NextItem>
            </NextItemsContainer>
          </TetrisNext>
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
            <PlayPauseButton onClick={handleOnPauseClick}>
              <Pause />
            </PlayPauseButton>
          </TetrisPlayPauseContainer>
        </TetrisScoreAndPauseContainer>
        <TetrisConnectionContainer>
          <ConnectionDot />
          <ConnectionText>Connected to 123.122.244.2</ConnectionText>
        </TetrisConnectionContainer>
      </TetrisContainer>
    </>
  );
};
