<div class="status__container">
  <span class="status__dot"></span>
  <p class="status__text">Controller is connected to 192.168.1.1</p>
</div>

<style>
  .status__container {
    position: absolute;
    background-color: #00000090;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    padding: 3px 10px;
    gap: 10px
  }

  .status__dot {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background-color: #00ff00;
    border-radius: 50%;
    margin: 0;
    padding: 0;
  }

  .status__text {
    font-size: 1rem;
    font-weight: 400;
    color: white;
    text-align: center;
    font-weight: bold;
  }
</style>