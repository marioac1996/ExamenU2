import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private firestore: AngularFirestore) { }
  
  create_NewClient(record) {
    return this.firestore.collection('Clients').add(record);
  }
  
  read_Clients() {
    return this.firestore.collection('Clients').snapshotChanges();
  }
  
  update_Client(recordID,record){
    this.firestore.doc('Clients/' + recordID).update(record);
  }
  
  delete_Client(record_id) {
    this.firestore.doc('Clients/' + record_id).delete();
  }
}

