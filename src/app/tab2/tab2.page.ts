import { Component, OnInit } from '@angular/core';
import { ClientService } from './../servicios/client.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
 
  clients: any;
  clientName: string;
  clientLastname: string;
  clientSurname: string;
  clientEmail: string;
  clientSex: string;
  clientPhone: number;
  clientAddress: string;
  clientFechan: string;
  clientFechains: string;
 
  constructor(private clientService: ClientService) { }
 
  ngOnInit() {
    this.clientService.read_Clients().subscribe(data => {
 
      this.clients = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Lastname: e.payload.doc.data()['Lastname'],
          Surname: e.payload.doc.data()['Surname'],
          Email: e.payload.doc.data()['Email'],
          Sex: e.payload.doc.data()['Sex'],
          Phone: e.payload.doc.data()['Phone'],
          Address: e.payload.doc.data()['Address'],
          Fechan: e.payload.doc.data()['Fechan'],
          Fechains: e.payload.doc.data()['Fechains'],
        };
      })
      console.log(this.clients);
 
    });
  }
 
  CreateRecord() {
    let record = {};
    record['Name'] = this.clientName;
    record['Lastname'] = this.clientLastname;
    record['Surname'] = this.clientSurname;
    record['Email'] = this.clientEmail;
    record['Sex'] = this.clientSex;
    record['Phone'] = this.clientPhone;
    record['Address'] = this.clientAddress;
    record['Fechan'] = this.clientFechan;
    record['Fechains'] = this.clientFechains;
      this.clientService.create_NewClient(record).then(resp => {
      this.clientName = "";
      this.clientLastname = "";
      this.clientSurname = "";
      this.clientEmail = "";
      this.clientSex = "";
      this.clientPhone = undefined;
      this.clientAddress = "";
      this.clientFechan = "";
      this.clientFechains = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
 
  RemoveRecord(rowID) {
    this.clientService.delete_Client(rowID);
  }
 
  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditLastname = record.Lastname;
    record.EditSurname = record.Surname;
    record.EditEmail = record.Email;
    record.EditSex = record.Sex;
    record.EditPhone = record.Phone;
    record.EditAddress = record.Address;
    record.EditFechan = record.Fechan;
    record.EditFechains = record.Fechains;
  }

  EditRecord2(record) {
    record.isGet = true;
    record.GetName = record.Name;
    record.GetLastname = record.Lastname;
    record.GetSurname = record.Surname;
    record.GetEmail = record.Email;
    record.GetSex = record.Sex;
    record.GetPhone = record.Phone;
    record.GetAddress = record.Address;
    record.GetFechan = record.Fechan;
    record.GetFechains = record.Fechains;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Lastname'] = recordRow.EditLastname;
    record['Surname'] = recordRow.EditSurname;
    record['Email'] = recordRow.EditEmail;
    record['Sex'] = recordRow.EditSex;
    record['Phone'] = recordRow.EditPhone;
    record['Address'] = recordRow.EditAddress;
    record['Fechan'] = recordRow.EditFechan;
    record['Fechains'] = recordRow.EditFechains;
    this.clientService.update_Client(recordRow.id, record);
    recordRow.isEdit = false;
  }
 
 
}