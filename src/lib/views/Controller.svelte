<script lang="ts">
  import { onMount } from "svelte";
  import { Nintendo, Status, Warning } from "@components/controller";
  import { ApiUtils, WebRTCUtils } from "@utils/index";

  export let id: string;

  //#region Utilities
  const {
    initWebRTCPeerBasedOnOfferAndIceCandidates,
    getIceCandidates,
    calculateRemoteIpAddress,
    sendKeyIdThoughtChannel
  } = WebRTCUtils();
  const {
    getOfferAndIceCandidatesByIdFromTheServer,
    postTheAnswerAndIceCandidatesToTheServer
  } = ApiUtils();
  //#endregion

  //#region Private variables
  let remoteIp = "";
  //#endregion

  //#region Event handlers
  const handleOnButtonPress = (event: CustomEvent) => {
    sendKeyIdThoughtChannel(event.detail);
  };
  //#endregion

  //#region OnMount
  onMount(async () => {
    const remoteOfferAndIceCandidates =
      await getOfferAndIceCandidatesByIdFromTheServer(id);
    const answer = await initWebRTCPeerBasedOnOfferAndIceCandidates(
      remoteOfferAndIceCandidates
    );

    remoteIp = calculateRemoteIpAddress(
      remoteOfferAndIceCandidates.iceCandidates
    );

    const myIceCandidates = getIceCandidates();

    setTimeout(async () => {
      await postTheAnswerAndIceCandidatesToTheServer(
        id,
        answer,
        myIceCandidates
      );
    }, 1000);
  });
  //#endregion
</script>

<div class="controller__container">
  <Status connectedTo={remoteIp} />
  <div class="controller__nintendo">
    <Nintendo on:buttonPress={handleOnButtonPress} />
  </div>
  <div class="controller__orientation-warning">
    <Warning />
  </div>
</div>

<style>
  .controller__container {
    width: 100%;
    height: 100vh;
    background-color: white;
    position: relative;
  }

  .controller__nintendo {
    width: 100%;
    height: 100%;

    @media (orientation: portrait) {
      display: none;
    }
  }

  .controller__orientation-warning {
    display: none;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;

    @media (orientation: portrait) {
      display: flex;
    }
  }
</style>
