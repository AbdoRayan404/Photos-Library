import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PhotosManagerService {

  public photosCollection: AngularFirestoreCollection
  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { 
    this.photosCollection = this.afs.collection('photos')
  }

  async deletePhotoDocument(id: string) {
    await this.photosCollection.doc(id).delete()
  }

  async createPhotoDocument(photo: any) {
    await this.photosCollection.add(photo)
  }

  async uploadImage(title: string, path: string, file: any) {
    let fileReference = this.storage.ref(path)
    let uploadTask = this.storage.upload(path, file)

    uploadTask.percentageChanges().subscribe(percentage => {
      if(percentage === 100) {
        fileReference.getDownloadURL().subscribe(url => {
          this.createPhotoDocument({title, url, date: moment.utc().unix()})
        })
      }
    })
  }
}
