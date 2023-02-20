import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotosManagerService } from './services/photos-manager.service';
import moment from 'moment'

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit{
  
  photos: any
  uploadImageForm: FormGroup
  file: any
  uploadState: string
  constructor(private pms: PhotosManagerService, private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.uploadImageForm = this.fb.group({
      title: ['', Validators.required],
      file: ['', Validators.required]
    })

    this.uploadImageForm.valueChanges.subscribe(console.log)

    this.pms.photosCollection.snapshotChanges().subscribe(data => {
      this.photos = data.map(e => {
        return {
          title: e.payload.doc.data()['title'],
          url: e.payload.doc.data()['url'],
          date: moment.unix(e.payload.doc.data()['date']).format('YYYY/MM/DD HH:MM:SS'),
          id: e.payload.doc.id
        }
      })
    })
  }

  upload(event: any) {
    this.file = event.target.files[0]
  }

  async submit() {
    let path = `photos/${moment.utc().unix()}_${this.file.name}`

    this.pms.uploadImage(this.uploadImageForm.value.title, path, this.file)

    this.uploadImageForm.reset()
  }
}
