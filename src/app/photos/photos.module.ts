import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos.component';
import { PhotoComponent } from './photo/photo.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PhotosComponent,
    PhotoComponent
  ],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PhotosModule { }
