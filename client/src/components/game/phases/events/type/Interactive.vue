<template>
  <component :is="eventCase"></component>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AccomplishmentsSelectPurchased from "@port-of-mars/client/components/game/phases/events/case/DiscardAccomplishment.vue";
import VoteYesNo from "@port-of-mars/client/components/game/phases/events/case/VoteYesNo.vue";
import VoteForPlayerSingle from "@port-of-mars/client/components/game/phases/events/case/VotePlayer.vue";
import VoteForPlayerHeroPariah from "@port-of-mars/client/components/game/phases/events/case/VoteHeroPariah.vue";
import InfluencesSelect from "@port-of-mars/client/components/game/phases/events/case/SaveResource.vue";
import InfluencesDraw from "@port-of-mars/client/components/game/phases/events/case/DrawResource.vue";

@Component({
  components: {
    AccomplishmentsSelectPurchased,
    InfluencesSelect,
    InfluencesDraw,
    VoteYesNo,
    VoteForPlayerSingle,
    VoteForPlayerHeroPariah
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
      default:
        return "";
    }
  }
}
</script>

<style></style>
