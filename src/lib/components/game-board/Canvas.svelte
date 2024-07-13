<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { tetrominoes } from "./tetrominoes";

  const dispatch = createEventDispatcher();

  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;

  export let isPaused: boolean = true;
  export let level: number = 1;
  export let buttonId: string = "";

  $: {
    if (!isPaused) {
      gameLoop();
    }

    switch (buttonId) {
      case "left":
        movePiece(-1, 0);
        break;
      case "right":
        movePiece(1, 0);
        break;
      case "down":
        movePiece(0, 1);
        break;
      case "up":
        rotatePiece();
        break;
      case "b":
        rotatePiece();
        break;
    }
  }

  const ROWS = 20;
  const COLS = 10;
  const BLOCK_SIZE = 30;

  let board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

  let currentPiece: {
    color: string;
    shape: number[][];
  };
  let currentX = 0;
  let currentY = 0;

  const resetPiece = () => {
    const piece = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
    currentPiece = { shape: piece.shape, color: piece.color };
    currentX =
      Math.floor(COLS / 2) - Math.floor(currentPiece.shape[0].length / 2);
    currentY = 0;
  };

  const drawBoard = () => {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (board[row][col]) {
          context.fillStyle = board[row][col];
          context.fillRect(
            col * BLOCK_SIZE,
            row * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
          );
          context.strokeRect(
            col * BLOCK_SIZE,
            row * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
          );
        }
      }
    }
  };

  const drawPiece = () => {
    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (currentPiece.shape[row][col]) {
          context.fillStyle = currentPiece.color;
          context.fillRect(
            (currentX + col) * BLOCK_SIZE,
            (currentY + row) * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
          );
          context.strokeRect(
            (currentX + col) * BLOCK_SIZE,
            (currentY + row) * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
          );
        }
      }
    }
  };

  const movePiece = (dx: number, dy: number) => {
    currentX += dx;
    currentY += dy;
    if (isCollision()) {
      currentX -= dx;
      currentY -= dy;
      if (dy > 0) {
        mergePiece();
        checkForFullLines();
        resetPiece();
        if (isCollision()) {
          // Game over
          board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
          dispatch("gameOver");
        }
      }
    }
  };

  const isCollision = () => {
    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (
          currentPiece.shape[row][col] &&
          (board[currentY + row] && board[currentY + row][currentX + col]) !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const rotatePiece = () => {
    const rotatedPiece = currentPiece.shape[0]
      .map((_, colIndex) => currentPiece.shape.map((row) => row[colIndex]))
      .reverse();
    const previousPiece = currentPiece.shape;
    currentPiece.shape = rotatedPiece;
    if (isCollision()) {
      currentPiece.shape = previousPiece; // revert to previous state if collision occurs
    }
  };

  const mergePiece = () => {
    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (currentPiece.shape[row][col]) {
          board[currentY + row][currentX + col] = currentPiece.color;
        }
      }
    }
  };

  const checkForFullLines = () => {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row].every((cell) => cell !== 0)) {
        board.splice(row, 1); // Remove the full row
        board.unshift(Array(COLS).fill(0)); // Add an empty row at the top
        row++; // Check the same row again as rows have shifted down
        dispatch("lineCompleted");
      }
    }
  };

  let timeoutId;

  const gameLoop = () => {
    if (!context || !canvas) {
      return;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (isPaused) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawPiece();

    movePiece(0, 1);

    timeoutId = setTimeout(gameLoop, 1030 - level * 30);
  };

  onMount(() => {
    context = canvas.getContext("2d");
    context.lineWidth = 3;

    canvas.width = COLS * BLOCK_SIZE;
    canvas.height = ROWS * BLOCK_SIZE;

    resetPiece();
    gameLoop();
  });

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case "Escape":
        dispatch("pauseGame");
        break;
      case "KeyA":
        movePiece(-1, 0);
        gameLoop();
        break;
      case "KeyD":
        movePiece(1, 0);
        gameLoop();
        break;
      case "KeyS":
        movePiece(0, 1);
        gameLoop();
        break;
      case "KeyW":
        rotatePiece();
        gameLoop();
        break;
    }
  };
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />
<div class="canvas__container">
  <canvas class="canvas" bind:this={canvas} />
</div>

<style>
  .canvas__container {
    border: 3px solid #284fe6;
  }

  .canvas {
    background-color: rgba(0, 0, 0, 0.3);
  }
</style>
