import {Iterator} from "./iterator.interface";
import {Audiotrack} from "../../../features/audiotracks/audiotrack.model";

export class AudiotracksIterator implements Iterator<Audiotrack> {
  private readonly collection: Audiotrack[] = [];
  private index: number = 0;
  constructor(audiotracks: Audiotrack[]) {
    this.collection = audiotracks;
  }

  hasNext(): boolean {
    return this.index < this.collection.length;
  }

  next(): Audiotrack {
    return this.collection[this.index++];
  }
}
