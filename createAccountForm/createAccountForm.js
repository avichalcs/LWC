import { LightningElement, track, wire  } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';


/*const columns = [
    { label: 'Id', fieldName: 'id', type: 'id' },
    { label: 'Name', fieldName: 'Name', type: 'Name' },
    { label: 'Account Number', fieldName: 'AccountNumber', type: 'text' },
    { label: 'Phone', fieldName: 'Phone', type: 'Phone' },
];
 */
export default class createAccountForm extends LightningElement {
   @track data = [];
    // columns = columns;
    strName;
    strAccountNumber;
    strPhone;
 
    // Change Handlers.
    nameChangedHandler(event){
        this.strName = event.target.value;
    }
    numberChangedHandler(event){
        this.strAccountNumber = event.target.value;
    }
    phoneChangedHandler(event){
        this.strPhone = event.target.value;
    }
 
   
    createAccount(){
 
        
        var fields = {'Name' : this.strName, 'AccountNumber' : this.strAccountNumber, 'Phone' : this.strPhone};
 
        
        var objRecordInput = {'apiName' : 'Account', fields};
 
        
        createRecord(objRecordInput).then(response => {
            alert('Account created with Id: ' +response.id);
            console.log(JSON.stringify(response));
            var obj = {
                id: response.id,
                Name: response.fields.Name.value,
                Phone: response.fields.Phone.value,
                AccountNumber: response.fields.AccountNumber.value
              };
            this.data.push(obj);
            this.strName = [];
            this.strAccountNumber=[];
            this.strPhone = [];

        }).catch(error => {
            alert('Error: ' +JSON.stringify(error));
        });
        

    }
    
}