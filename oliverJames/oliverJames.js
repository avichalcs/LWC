import { LightningElement, wire } from 'lwc';
import contactList from '@salesforce/apex/contactOliver.contactList';

const columns = [
    { label: 'First Name', fieldName: 'FirstName', type: 'text' },
    { label: 'Poistion__c', fieldName: 'Poistion__c', type: 'picklist' },
];

export default class OliverJames extends LightningElement {
    data = [];
    data1 = [];
    columns = columns;
    noData;
    showTable=true;
    showTable1=true;
    searchVar;


    selectedItemValue = "Search";
    contacts = [];
    amCount;
    gmCount;
    tmCount;
    totalCount = 0;
    amList = [];
    gmList = [];
    tmList = [];
    customClass = "item"
    isModalOpen = false;
    isModalOpen1 = false;
    isModalOpen2 = false;
    isChecked1 = true;
    isChecked2 = true;
    isChecked3 = true;

    handleOnselect(event) {
        this.amList = [];
        this.gmList = [];
        this.tmList = [];
        this.selectedItemValue = event.detail.value;
        for (let rec of this.contacts) {
            this.totalCount += 1;
            if (rec.Poistion__c == "Assistant Manager") {
                this.amList.push(rec);
                console.log('Assistant Manager' + rec.FirstName);
            }
            else if (rec.Poistion__c == "General Manager") {
                this.gmList.push(rec);
                console.log('General Manager' + rec.FirstName);
            }
            else if (rec.Poistion__c == "Training Manager") {
                this.tmList.push(rec);
                console.log('Training Manager' + rec.FirstName);
            }
        }
        this.showData();

    }
    @wire(contactList)
    wiredAccount({ error, data }) {
        if (data) {
            this.contacts = data;
            console.log('Wired');
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }
    showData() {
        this.amCount = this.amList.length;
        this.gmCount = this.gmList.length;
        this.tmCount = this.tmList.length;
    }
    handleclick(event) {
        console.log('Hello from div');
        if(this.selectedItemValue=="Contact Search"){
        this.isModalOpen = true;
        this.handleView();
        }
     }

    closeModal() {
        this.isModalOpen = false;
    }
    closeModal1() {
        this.isModalOpen1 = false;
    }
    closeModal2() {
        this.isModalOpen2 = false;
    }
    handleView(event) {
        this.showTable=true;
        this.data=[];
        this.isModalOpen1 = true;
            if (this.isChecked1 == true && this.isChecked2 == true && this.isChecked3 == true) {
                for (let rec of this.contacts) {
                    if (rec.Poistion__c == "Assistant Manager" || rec.Poistion__c == "General Manager" || rec.Poistion__c == "Training Manager") {
                        this.data.push(rec);
                        this.noData="";
                    }
                }
            }
            else if (this.isChecked1 == true && this.isChecked2 == true && this.isChecked3 == false) {
                for (let rec of this.contacts) {
                    if (rec.Poistion__c == "Assistant Manager" || rec.Poistion__c == "General Manager") {
                        this.data.push(rec);
                        this.noData="";
                    }
                }
            }
            else if (this.isChecked1 == true && this.isChecked2 == false && this.isChecked3 == true) {
                for (let rec of this.contacts) {
                    if (rec.Poistion__c == "Assistant Manager" || rec.Poistion__c == "Training Manager") {
                        this.data.push(rec);
                        this.noData="";
                    }
                }
            }
            else if (this.isChecked1 == true && this.isChecked2 == false && this.isChecked3 == false) {
                for (let rec of this.contacts) {
                    if (rec.Poistion__c == "Assistant Manager") {
                        this.data.push(rec);
                        this.noData="";
                    }
                }
            }
            else if (this.isChecked1 == false && this.isChecked2 == true && this.isChecked3 == true) {
                for (let rec of this.contacts) {
                    if (rec.Poistion__c == "General Manager" || rec.Poistion__c == "Training Manager") {
                        this.data.push(rec);
                        this.noData="";
                    }
                }
            }
            else if (this.isChecked1 == false && this.isChecked2 == true && this.isChecked3 == false) {
                for (let rec of this.contacts) {
                    if (rec.Poistion__c == "General Manager") {
                        this.data.push(rec);
                        this.noData="";
                    }
                }
            }
            else if (this.isChecked1 == false && this.isChecked2 == false && this.isChecked3 == true) {
                for (let rec of this.contacts) {
                    if (rec.Poistion__c == "Training Manager") {
                        this.data.push(rec);
                        this.noData="";
                    }
                }
            }
            else if (this.isChecked1 == false && this.isChecked2 == false && this.isChecked3 == false) {
                this.noData="No Data To dispaly";
                this.showTable=false;
            }
    }
    changeCheckbox(event) {
        if (event.target.name == "AssistantManager") {
            if (event.target.checked) {
                this.isChecked1 = true;
                this.amCount = this.amList.length;
            }
            else {
                this.isChecked1 = false;
                this.amCount = [];
            }
        }
        else if (event.target.name == "GeneralManager") {
            if (event.target.checked) {
                this.isChecked2 = true;
                this.gmCount = this.gmList.length;
            }
            else {
                this.isChecked2 = false;
                this.gmCount = '';
            }
        }
        else if (event.target.name == "TrainingManager") {
            if (event.target.checked) {
                this.isChecked3 = true;
                this.tmCount = this.tmList.length;
            }
            else {
                this.isChecked3 = false;
                this.tmCount = '';
            }
        }
        this.handleView();

    }
   
    searchName(event){
          this.searchVar=event.target.value;
          let recs=[];
          for ( let rec of this.contacts ){
               if(rec.LastName.includes(this.searchVar)){
                 this.data1.push(rec);
            }
            

        }
    
          this.isModalOpen2=true;
    }
}