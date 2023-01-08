import {Component, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import {AppState} from "../../store/app.reducer";
import {Audiotrack} from "./audiotrack.model";
import {map, Subscription, switchMap, take} from "rxjs";

@Component({
  selector: 'app-audiotracks',
  templateUrl: './audiotracks.component.html',
  styleUrls: ['./audiotracks.component.scss']
})
export class AudiotracksComponent implements OnInit, OnDestroy {
  audiotracks: Audiotrack[] = [];
  private audiotracksSubscription : Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.audiotracksSubscription.unsubscribe();
    }

  ngOnInit(): void {
    this.audiotracksSubscription = this.store.select('audiotracks').pipe(
      map(audiotracksState => audiotracksState.audiotracks)
    ).subscribe(audiotracks => {
      this.audiotracks = audiotracks;
    })
  }

}
