import { Schema, type } from "@colyseus/schema";
import { EventCase, MarsEventData, Phase } from "@port-of-mars/shared/types";
import { GameState } from "@port-of-mars/server/rooms/game/state";
import { MarsEventState } from "./common";
import { constructState } from "./state";

export class MarsEvent extends Schema implements MarsEventData {
  constructor(data: MarsEventData) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.effect = data.effect;
    this.flavorText = data.flavorText;
    this.eventCaseClientHandler = data.eventCaseClientHandler;
    this.duration = data.duration;
    this.state = constructState(data.id);
    this.timeDuration =
      data.timeDuration ?? GameState.DEFAULT_PHASE_DURATION[Phase.events];
  }

  @type("string")
  id: string;

  @type("string")
  name: string;

  @type("string")
  effect: string;

  @type("string")
  flavorText: string;

  @type("string")
  eventCaseClientHandler: EventCase;

  @type("number")
  elapsed = 0;

  @type("number")
  duration: number;

  @type("number")
  timeDuration: number;

  state: MarsEventState;

  toJSON(): MarsEventData & { elapsed: number; state: any } {
    const {
      id,
      name,
      effect,
      flavorText,
      eventCaseClientHandler,
      elapsed,
      duration,
      timeDuration,
    } = this;
    return {
      id,
      name,
      effect,
      flavorText,
      eventCaseClientHandler,
      elapsed,
      duration,
      state: this.state.toJSON(),
      timeDuration,
    };
  }

  updateElapsed(): void {
    this.elapsed += 1;
  }

  resetElapsed(): void {
    this.elapsed = 0;
  }

  get complete(): boolean {
    return this.elapsed >= this.duration;
  }
}
