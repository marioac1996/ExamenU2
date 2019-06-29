import { Component, OnInit } from '@angular/core';
import { CitaService } from './../servicios/cita.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
 
  citas: any;
  citaNamec: string;
  citaLastnamec: string;
  citaSurnamec: string;
  citaPhonec: number;
  citaAddressc: string;
  citaFechac: string;
 
  constructor(private citaService: CitaService) { }
 
  ngOnInit() {
    this.citaService.read_Citas().subscribe(data => {
 
      this.citas = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Namec: e.payload.doc.data()['Namec'],
          Lastnamec: e.payload.doc.data()['Lastnamec'],
          Surnamec: e.payload.doc.data()['Surnamec'],
          Phonec: e.payload.doc.data()['Phonec'],
          Addressc: e.payload.doc.data()['Addressc'],
          Fechac: e.payload.doc.data()['Fechac'],
        };
      })
      console.log(this.citas);
 
    });
  }
 
  CreateRecord() {
    let record = {};
    record['Namec'] = this.citaNamec;
    record['Lastnamec'] = this.citaLastnamec;
    record['Surnamec'] = this.citaSurnamec;
    record['Phonec'] = this.citaPhonec;
    record['Addressc'] = this.citaAddressc;
    record['Fechac'] = this.citaFechac;
      this.citaService.create_NewCita(record).then(resp => {
      this.citaNamec = "";
      this.citaLastnamec = "";
      this.citaSurnamec = "";
      this.citaPhonec = undefined;
      this.citaAddressc = "";
      this.citaFechac = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
 
  RemoveRecord(rowID) {
    this.citaService.delete_Cita(rowID);
  }
 
  EditRecord(record) {
    record.isEdit = true;
    record.EditNamec = record.Namec;
    record.EditLastnamec = record.Lastnamec;
    record.EditSurnamec = record.Surnamec;
    record.EditPhonec = record.Phonec;
    record.EditAddressc = record.Addressc;
    record.EditFechac = record.Fechac;
  }
  EditRecord2(record) {
    record.isGet = true;
    record.GetNamec = record.Namec;
    record.GetLastnamec = record.Lastnamec;
    record.GetSurnamec = record.Surnamec;
    record.GetPhonec = record.Phonec;
    record.GetAddressc = record.Addressc;
    record.GetFechac = record.Fechac;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['Namec'] = recordRow.EditNamec;
    record['Lastnamec'] = recordRow.EditLastnamec;
    record['Surnamec'] = recordRow.EditSurnamec;
    record['Phonec'] = recordRow.EditPhonec;
    record['Addressc'] = recordRow.EditAddressc;
    record['Fechac'] = recordRow.EditFechac;
    this.citaService.update_Cita(recordRow.id, record);
    recordRow.isEdit = false;
  }
 
 
}