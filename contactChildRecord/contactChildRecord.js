import { LightningElement, wire,track } from 'lwc';
import displayAccRecord from '@salesforce/apex/AccountRecordController.displayAccRecord';

export default class ContactChildRecord extends LightningElement {
    @wire(displayAccRecord) accounts;

    @track accountId;
    @track accId;

    handleChange(event){
        this.accId=event.target.value;
    }

    handleSubmit(){
       // var inp=this.template.querySelector("lightning-input");
       // this.accountId=inp.value;
       this.accountId= this.accId;
        const sampledemoevent=new CustomEvent('samplevent',
        {
            detail:this.accountId
        });
        this.dispatchEvent(sampledemoevent);
    }
}