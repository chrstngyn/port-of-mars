<template></template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from "vue-property-decorator";
import { GameRequestAPI } from "@port-of-mars/client/api/game/request";

@Component({})
export default class Basic extends Vue {
  @Inject() readonly api!: GameRequestAPI;
  @Prop({ default: "" }) case!: string;

  get eventCase(): string {
    switch (this.case) {
      case "NO_CHANGE":
        return "This event requries no interaction";
      case "AUDIT":
        return "Click a player in the Player Scores area to view an overview of their investment inventory.";
      case "DISABLE_CHAT":
        return "This event requires no interaction.";
      default:
        return "This event requires no interaction.";
    }
  }

  setReadiness(): void {
    console.log("EVENT (CONTINUE)");
    this.api.setPlayerReadiness(true);
  }
}
</script>

<style></style>
