<template>
  <component :is="eventCase"></component>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import DiscardAccomplishment from "@port-of-mars/client/components/game/phases/events/case/DiscardAccomplishment.vue";
import VoteYesNo from "@port-of-mars/client/components/game/phases/events/case/VoteYesNo.vue";
import VotePlayer from "@port-of-mars/client/components/game/phases/events/case/VotePlayer.vue";
import VoteHeroPariah from "@port-of-mars/client/components/game/phases/events/case/VoteHeroPariah.vue";
import SaveResource from "@port-of-mars/client/components/game/phases/events/case/SaveResource.vue";
import DrawResource from "@port-of-mars/client/components/game/phases/events/case/DrawResource.vue";

@Component({
  components: {
    DiscardAccomplishment,
    SaveResource,
    DrawResource,
    VoteYesNo,
    VotePlayer,
    VoteHeroPariah
  }
})
export default class Interactive extends Vue {
  @Prop({ default: "" }) case!: string;

  get eventCase(): string {
    switch (this.case) {
      case "DISCARD_ACCOMPLISHMENT":
        return "AccomplishmentsSelectPurchased";
      case "VOTE_YES_NO":
        return "VoteYesNo";
      case "VOTE_PLAYER":
        return "VoteForPlayerSingle";
      case "VOTE_HERO_PARIAH":
        return "VoteForPlayerHeroPariah";
      case "DRAW_RESOURCE":
        return "DrawResource";
      case "SAVE_RESOURCE":
        return "SaveResource";
      default:
        return "";
    }
  }
}
</script>

<style></style>
