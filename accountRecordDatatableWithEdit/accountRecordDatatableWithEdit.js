import { LightningElement , api } from 'lwc';
import fetchAccountLWC from '@salesforce/apex/fetchAccountLWC.getAccountList';

const columns = [
    { label: 'Name', fieldName: 'Name',type: 'name', editable: true },
    { label: 'Website', fieldName: 'Website', type: 'url', editable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
    { label: 'Rating', fieldName: 'Rating', type: 'picklist', editable: true },
    
];

export default class DatatableWithInlineEdit extends LightningElement {
    data = [];
    columns = columns;
    rowOffset = 0;


    
    connectedCallback(){
        fetchAccountLWC()
        .then(result => {
            this.data = result;
            console.log(JSON.stringify(this.data));
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            this.data = undefined;
        });
   }    
}