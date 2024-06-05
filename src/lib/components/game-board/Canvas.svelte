<script lang="ts">
  import { onMount } from "svelte";

  let canvas;
  let context;
  let t, l;
  let isDrawing;
  let start;

  export let color = "#333";
  export let background = "#fff";

  onMount(() => {
    context = canvas.getContext("2d");
    context.lineWidth = 3;

    handleSize();
  });

  const handleSize = () => {
    const { top, left } = canvas.getBoundingClientRect();
    t = top;
    l = left;
  };

  const handleMove = ({ offsetX: x1, offsetY: y1 }) => {
    if (!isDrawing) return;

    const { x, y } = start;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x1, y1);
    context.closePath();
    context.stroke();

    start = { x: x1, y: y1 };
  };

  const handleEnd = () => {
    isDrawing = false;
  };

  const handleStart = ({ offsetX: x, offsetY: y }) => {
    if (color === background) {
      context.clearRect(0, 0, 48, 64);
    } else {
      isDrawing = true;
      start = { x, y };
    }
  };
</script>

<div class="canvas__container">
  <canvas
    class="canvas"
    bind:this={canvas}
    on:mousemove={handleMove}
    on:mouseleave={handleEnd}
    on:mousedown={handleStart}
    on:mousemove={handleMove}
  />
</div>

<style>
  .canvas__container {
    border: 3px solid #284fe6;
    height: 640px;
    width: 480px;
  }

  .canvas {
    display: inline-block;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
</style>
