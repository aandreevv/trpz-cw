import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-track-progress',
  templateUrl: './track-progress.component.html',
  styleUrls: ['./track-progress.component.scss']
})
export class TrackProgressComponent implements OnInit, OnDestroy {
  @Input() left: number;
  @Input() right: number;
  @Input() showDetails: boolean;
  @Output() changeRange: EventEmitter<number>;

  constructor() {
    this.changeRange = new EventEmitter<number>();
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
}
