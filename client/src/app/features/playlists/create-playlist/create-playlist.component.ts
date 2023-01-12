import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";
import * as PlaylistActions from "../store/playlists.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent implements OnInit {
  imageFile: File;

  firstFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    image: ['', Validators.required]
  })
  constructor(private formBuilder: FormBuilder,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit(): void {
  }

  onImageSelected(event: any): void {
    this.imageFile = event.target.files[0] ?? null;
  }

  submitForm(): void {
    const fd = new FormData();
    fd.append("image", this.imageFile);
    fd.append("name", String(this.firstFormGroup.value["name"]));
    this.store.dispatch(PlaylistActions.createPlaylist({fd}));
  }

  onRedirect(): void {
    this.router.navigate([''])
  }
}
