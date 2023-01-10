import {Component, Input, OnInit} from '@angular/core';
import {Audiotrack} from "../audiotrack.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";
import * as PlayerActions from "../../../shared/player/store/player.actions";

@Component({
  selector: 'app-audiotrack',
  templateUrl: './audiotrack.component.html',
  styleUrls: ['./audiotrack.component.scss']
})
export class AudiotrackComponent implements OnInit {
  @Input() audiotrack: Audiotrack;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  setActive() {
    this.store.dispatch(PlayerActions.setAudio({audiotrack: this.audiotrack}));
    this.store.dispatch(PlayerActions.play());
  }
}
