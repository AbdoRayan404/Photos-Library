import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  content: string
  froalaCollection: AngularFirestoreCollection
  saveStatus: string
  constructor(private afs: AngularFirestore) { }
  
  ngOnInit(): void {
    this.froalaCollection = this.afs.collection('froala')

    this.froalaCollection.snapshotChanges().subscribe(data => {
      this.content = data[0].payload.doc.data()['content']
    })
  }

  async save() {
    try{
      await this.froalaCollection.doc('WxPbLTcxsYhsivywqEnI').update({content: this.content})
      this.saveStatus = 'Document Saved Successfully.'

      setTimeout(()=>{
        this.saveStatus = ''
      }, 2000)
    }catch(err) {
      console.log(err)
    }
  }
}
