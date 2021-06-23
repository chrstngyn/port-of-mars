import { Sound } from '@port-of-mars/shared/types';

export class Sfx implements Sound {
  kind: "event" | "phase" | "button" | "background" | "notification" | undefined;
  audio: HTMLAudioElement
  action?: "invest" | "toggle";
  invest?: "plus" | "minus";

  constructor(kind: "event" | "phase" | "button" | "background" | "notification" | undefined,
              audio: HTMLAudioElement,
              action: "invest" | "toggle" | undefined,
              invest: "plus" | "minus" | undefined,
  ) {
    this.kind = kind;
    this.audio = audio;
    this.action = action;
    this.invest = invest;
  }

  get sfx(): Sfx {
    return new Sfx(this.kind, this.audio, this.action, this.invest);
  }

  set sfx(sfx: Sfx) {
    this.kind = sfx.kind;
    this.audio = sfx.audio;
    this.action = sfx.action;
    this.invest = sfx.invest;
  }
}

/**
 * Iterate through an input directory to populate an instance of Sfx.
 * If the item is a directory, recurse.
 * Else if the item  is a .mp3 file, create an Audio() instance.
 * @param sfx A Sfx class
 * @param dir An input directory
 * @return An array of Sfx instances
 */
export function mapMp3Files(sfx: Sfx, dir: string): Array<Sfx> {
  const path = require('path');
  const fs = require('fs');
  let index = 0;
  let sfxLibrary: Array<Sfx> = [];

  fs.readdirSync(dir).forEach((file: any) => {
    const absolutePath = path.join(dir, file);
    if (fs.statSync(absolutePath).isDirectory()) {
      let currentDir = absolutePath.split("/").pop();
      Object.keys(sfx)[index] = currentDir;       // set sfx property
      index++;                                    // increment index
      return mapMp3Files(sfx, absolutePath); // recurse thru function if mp3 hasn't been found
    }
    else {
      sfx.audio = new Audio(file);
      sfxLibrary.push(sfx)
      index = 0;
    }
  });
  return sfxLibrary;
}
