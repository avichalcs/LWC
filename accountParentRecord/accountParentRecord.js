import { LightningElement, track, wire} from 'lwc';
import displayContRecord from '@salesforce/apex/AccountRecordController.displayContRecord'

export default class AccountParentRecord extends LightningElement {
    @track accountId;
    @track records;
    @track error;
    @track boolVisible = false;
    @wire(displayContRecord, {accId:'$accountId'})
    wirecontdata({error,data}){
        if(data) {
            this.records=data;
            this.error=undefined;
            this.boolVisible = true;
        } else {
            this.records=undefined;
            this.error=error;
            this.boolVisible = false;
        }
    }
    handleChange(event){
        this.accountId=event.detail;
    }
}