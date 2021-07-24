import { LightningElement,wire } from 'lwc';
import ContactList from '@salesforce/apex/phoneCheckclass.phoneCheck';

export default class PhoneCheck extends LightningElement {
    phoneNo;
    contacts;
    searchCon;
    phoneinfo(event){
        this.phoneNo=event.detail.value;
       // console.log("Avichal "+this.phoneNo);
    }
    submit(){
        this.searchCon=this.phoneNo;
        console.log("Avichal1 "+this.searchCon);
        
        ContactList({phoneValue:this.searchCon})
        .then(result=>{
            this.contacts=result;
            console.log("Avichal2 "+JSON.stringify(result));
        })
    }
   
   
   
   
   
   
   
   
   
   
   
   
   
    /*connectedCallback(){
        console.log("Connected Callback")
        ContactList({phoneValue:this.searchCon})
        .then(result=>{
            console.log(result);
            this.contacts=result;
            this.error=undefined;

        })}
        @wire(ContactList, { phoneValue: '$searchCon'})
        wiredAccount({ error, data }) {
            if (data) {
                this.contacts = data;
                console.log(data);
                this.error = undefined;
            } else if (error) {
                this.error = error;
                this.contacts = undefined;
            }
        }
 */
    
}

