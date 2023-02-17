import { Component, Input } from '@angular/core';
import { PhotosManagerService } from '../services/photos-manager.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {

  @Input() title: string
  @Input() imgUrl: string
  @Input() date: string
  @Input() id: string

  constructor(private pms: PhotosManagerService) { }

  async delete() {
    try{
      await this.pms.deletePhotoDocument(this.id)
    }catch(err) {
      console.log(err)
    }
  }
}
