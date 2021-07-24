import { api, LightningElement, track} from 'lwc';
import  getContactList from '@salesforce/apex/contactListFromId.getContactList';
import { refreshApex } from '@salesforce/apex';
const columns = [
   
    { label: 'First Name', fieldName: 'FirstName', type: 'text' },
    { label: 'Last Name', fieldName: 'LastName', type: 'text' },
    { label: 'Phone', fieldName: 'Phone', type: 'Phone' },
    { label: 'Email', fieldName: 'Email', type: 'Email' },
   

];



export default class GetRecordIdOnClick extends LightningElement {

@api recordId;
@track data=[];
@track columns=columns;

connectedCallback(){
    getContactList({accId:this.recordId})
    .then(result => {
        this.data = result;
        this.error = undefined;
       
    })
    .catch(error => {
        this.error = error;
        this.data = undefined;
    });
}  
 









}