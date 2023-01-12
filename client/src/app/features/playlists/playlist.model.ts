import {Audiotrack} from "../audiotracks/audiotrack.model";

export class Playlist {
  id: number;
  name: string;
  imagePath: string;
  userId: number;
  audios: Audiotrack[]
}
