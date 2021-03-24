<template>
  <b-row class="w-100 m-0 px-0 justify-content-center align-items-center flex-column text-center">
    <!-- if player has already discarded an accomplishment they own -->
    <b-col v-if="completed" class="w-100 mx-2 p-0">
      <p><strong>You have discarded the Accomplishment below:</strong></p>
    </b-col>
    <!-- else display event efforts wasted flavor text and effect -->
    <b-col v-else class="w-100 mx-2 p-0">
      <p><i>{{ marsEvent.flavorText }}</i></p>
      <p><strong>{{ marsEvent.effect }}</strong></p>
    </b-col>
    <!-- if there are no accomplishments to discard -->
    <b-col v-if="purchasedAccomplishmentsLength < 1" class="w-100 m-0 p-0">
      <p v-if="selectedPurchasedAccomplishment.id === -1">You have no accomplishments to discard.
        Please click 'Continue'.</p>
      <button class="button" @click="ready">Continue</button>
    </b-col>
    <!-- display purchased accomplishments that you can discard -->
    <b-col v-if="purchasedAccomplishmentsLength > 0" class="w-100 m-0 p-0">
        <AccomplishmentCard
          v-for="accomplishment in purchasedAccomplishments"
          v-if="!completed"
          :key="accomplishment.id"
          :accomplishment="accomplishment"
          :show-description="false"
          :type="cardType"
          @discardPurchased="stageDiscard"
        />
        <AccomplishmentCard
          v-for="accomplishment in selectedPurchasedAccomplishment"
          v-else
          :key="accomplishment.id"
          :accomplishment="accomplishment"
          :show-description="false"
        />
    </b-col>
  </b-row>
</template>

<script lang="ts">
import {Component, Inject, Vue} from 'vue-property-decorator';
import AccomplishmentCard from '@port-of-mars/client/components/game/accomplishments/AccomplishmentCard.vue';
import {AccomplishmentCardType} from '@port-of-mars/client/types/cards.ts'
import {AccomplishmentData, MarsEventData, RESEARCHER} from '@port-of-mars/shared/types';
import {GameRequestAPI} from "@port-of-mars/client/api/game/request";
import _ from 'lodash';

@Component({
  components: {
    AccomplishmentCard,
  },
})
export default class EffortsWasted extends Vue {
  @Inject() readonly api!: GameRequestAPI;


  purchasedAccomplishmentsLength: number = Object.keys(this.purchasedAccomplishments).length;

  private selectedPurchasedAccomplishment: AccomplishmentData = {
    id: -1,
    role: RESEARCHER,
    label: '',
    flavorText: '',
    science: 0,
    government: 0,
    legacy: 0,
    finance: 0,
    culture: 0,
    systemHealth: 0,
    victoryPoints: 0,
    effect: '',
  };

  get marsEvent(): MarsEventData {
    return this.$tstore.getters.currentEvent!;
  }

  get cardType() {
    return AccomplishmentCardType.discard;
  }

  get purchasedAccomplishments() {
    const purchased = this.$tstore.getters.player.accomplishments.purchased;

    // TODO: There's definitely a better place to do this...
    this.purchasedAccomplishmentsLength = Object.keys(purchased).length;
    return purchased;
  }

  get completed() {
    return this.selectedPurchasedAccomplishment.id !== -1;
  }

  ready() {
    this.api.setPlayerReadiness(true);
  }

  private stageDiscard(id: number) {
    const pendingAccomplishmentDiscard = _.filter(this.purchasedAccomplishments, accomplishment => accomplishment.id);

    // deep copy of pending accomplishment to discard
    this.selectedPurchasedAccomplishment = JSON.parse(JSON.stringify(pendingAccomplishmentDiscard));
    this.api.stageDiscardOfPurchasedAccomplishment(id);
  }
}
</script>

