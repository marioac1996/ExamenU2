import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(private firestore: AngularFirestore) { }
  
  create_NewCita(record) {
    return this.firestore.collection('Citas').add(record);
  }
  
  read_Citas() {
    return this.firestore.collection('Citas').snapshotChanges();
  }
  
  update_Cita(recordID,record){
    this.firestore.doc('Citas/' + recordID).update(record);
  }
  
  delete_Cita(record_id) {
    this.firestore.doc('Citas/' + record_id).delete();
  }
}