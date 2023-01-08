import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";
import * as AudiotrackActions from "../store/audiotracks.actions";

@Component({
  selector: 'app-create-audiotrack',
  templateUrl: './create-audiotrack.component.html',
  styleUrls: ['./create-audiotrack.component.scss']
})
export class CreateAudiotrackComponent implements OnInit {
  imageFile: File;
  audioFile: File;

  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    author: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    image: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    audio: ['', Validators.required]
  })

  constructor(private _formBuilder: FormBuilder,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  onImageSelected(event: any): void {
    this.imageFile = event.target.files[0] ?? null;
  }

  onAudioSelected(event: any): void {
    this.audioFile = event.target.files[0] ?? null;
  }

  submitForm(): void {
    const fd = new FormData();
    fd.append("image", this.imageFile);
    fd.append("audio", this.audioFile);
    fd.append("name", String(this.firstFormGroup.value["name"]));
    fd.append("author", String(this.firstFormGroup.value["author"]));
    this.store.dispatch(AudiotrackActions.addAudiotrack({formData: fd}));
  }
}
