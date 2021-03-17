<template>
  <b-container class="h-100 justify-content-center align-items-center" fluid
               style="background-color: var(--dark-shade)"
  >
    <!-- victory | defeat message -->
    <b-row class="w-100 mx-0 mt-5 px-0 pt-5 flex-column justify-content-center align-items-center text-center"
    >
      <b-col v-if="gamePhase === phase.defeat" class="w-100 h-100">
        <h1>Game Over</h1>
        <h2>Your team has perished. See below for details.</h2>
      </b-col>
      <b-col v-else-if="gamePhase === phase.victory" class="w-100">
        <h2>Despite all doubts, you have successfully established an extraterrestrial society. Thanks to you, future
          generations can flourish on planet Mars.</h2>
        <h3 class="my-3">Winner(s): </h3>
        <span v-for="winner in winners" class="w-100" style="font-size: 1.5rem">
          {{ winner }}
        </span>
      </b-col>

    </b-row>
    <!-- mars log -->
    <b-row class="my-4 h-50 w-50 justify-content-center align-items-center mx-auto">
      <b-col class="h-100 w-100 p-2" style="background-color: var(--light-shade-05); overflow-y: hidden">
        <div class="h-100 w-100 flex-column align-items-center" style="overflow-y: auto">
          <div
            v-for="(log, index) in logs"
            :key="log.id"
            :style="{ backgroundColor: categoryColorMap.get(log.category) ? `${categoryColorMap.get(log.category)}` : 'var(--marslog-orange)' }"
            class="w-100 mb-1"
            style="color: var(--light-shade)"
          >
            <p class="m-0 pt-2 px-2 font-weight-bold" style="color: var(--light-accent)">
              {{ log.category }}
            </p>
            <p v-if="index === 0" class="text-uppercase px-2">Final Log</p>
            <p v-if="index !== 0" class="text-uppercase px-2">
              <span>
                Log: {{ logs.length - index }} / {{ logs.length }}
              </span>
            </p>
            <p class="mt-1 mb-0 px-2" style="word-wrap: break-word">{{ log.content }}</p>
            <p class="m-0 px-2 py-2" style="font-weight: bold">
              [ {{ logTime(log.timestamp) }} ]
            </p>
            <div v-if="delineateRound(index, logs)"
                 class="w-100 py-3 px-0 mx-0 mt-3 font-weight-bold text-uppercase text-center justify-content-center align-items-center"
                 style="background-color: black;"
            >
              Round {{ log.round - 1 }}
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <!-- dashboard navigation -->
    <b-row class="w-100 flex-column justify-content-center align-items-center">
      <h2 class="my-3">Thank you for playing.</h2>
      <b-button :to="'dashboard'" class="ml-2" variant="outline-warning">Exit</b-button>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import {Vue, Component, Inject} from "vue-property-decorator";
import {GameRequestAPI} from "@port-of-mars/client/api/game/request";
import {MarsLogMessageData} from "@port-of-mars/shared/src/types";
import _ from "lodash";
import {Phase} from "@port-of-mars/shared/types";

@Component({})

export default class GameOver extends Vue {
  @Inject() readonly api!: GameRequestAPI;

  get phase() {
    return Phase;
  }

  /**
   * Gets the current phase of the game.
   * @returns The current phase.
   */
  get gamePhase() {
    return this.$tstore.state.phase;
  }

  get winners() {
    return this.$tstore.state.winners;
  }

  get logs() {
    return _.sortBy(this.$store.getters.logs, (ml) => -ml.id);
  }

  get categoryColorMap() {
    return this.$tstore.getters.categoryColorMap;
  }

  delineateRound(index: number, logs: MarsLogMessageData[]): boolean {
    let currentIndex: number = index;
    let nextIndex: number = index + 1;

    if (!logs[nextIndex]) {
      return false
    } else return logs[currentIndex].round !== logs[nextIndex].round;
  }

  logTime(timestamp: number) {
    return new Date(timestamp).toLocaleTimeString();
  }
}
</script>
