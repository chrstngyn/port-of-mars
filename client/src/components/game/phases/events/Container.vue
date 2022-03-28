<template>
  <b-container class="h-100" fluid style="color: var(--light-shade)">
    <b-row align-v="center" class="h-100 w-100">
      <component :is="type" :case="eventCase"></component>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { MarsEventData, EventCase } from "@port-of-mars/shared/types";

@Component({})
export default class Container extends Vue {
  @Prop() event!: MarsEventData;
  basicCases: Array<EventCase> = ["NO_CHANGE", "AUDIT", "DISABLE_CHAT"];

  interactionCases: Array<EventCase> = [
    // inventory
    "DRAW_RESOURCE",
    "SAVE_RESOURCE",
    "DISCARD_ACCOMPLISHMENT",
    // votes
    "VOTE_YES_NO",
    "VOTE_PLAYER",
    "VOTE_HERO_PARIAH"
  ];

  get eventCase() {
    return this.event.eventCaseClientHandler;
  }

  get type(): string {
    // TODO: NO_CHANGE VIEW (MAYBE)
    if (this.basicCases.includes(this.eventCase)) {
      return "Basic";
    } else if (this.interactionCases.includes(this.eventCase)) {
      return "Interaction";
    }
    return "";
  }
}
</script>

<style lang="scss" scoped>
@import "~animate.css/source/attention_seekers/pulse.css";
</style>
