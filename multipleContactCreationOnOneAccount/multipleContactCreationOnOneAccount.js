import { LightningElement, track  } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import createContacts  from '@salesforce/apex/createMultiContacts.createContact';


export default class multipleContactCreationOnOneAccount extends LightningElement {
    @track keyindex = 0;
    @track data = [];
    @track conList=[];
    @track contactList = [
    {                      
        FirstName: '',
        LastName: ''
    }
];

 
    // columns = columns;
    strName;
    strAccountNumber;
    strPhone;
    strfName;
    strlName;
    id;
    accountId;
 
    nameChangedHandler(event){
        this.strName = event.target.value;
    }
    numberChangedHandler(event){
        this.strAccountNumber = event.target.value;
    }
    phoneChangedHandler(event){
        this.strPhone = event.target.value;
    }
    ChangedHandler(event){
        if(event.target.name==='fName'){
            this.contactList[event.target.accessKey].FirstName = event.target.value;
        }
        else if(event.target.name==='lName'){
            this.contactList[event.target.accessKey].LastName = event.target.value;
        }

    }

    addRow() {
        this.keyIndex+1;   
        this.contactList.push ({            
            FirstName:'',
            LastName: '',
        
        });
        
        console.log('Enter ',contactList);
        console.log('Enter ',JSON.stringyfy(contactList));
       
    }

   

    Create(){
       var fields = {'Name' : this.strName, 'AccountNumber' : this.strAccountNumber, 'Phone' : this.strPhone};
        var objRecordInput = {'apiName' :'Account', fields };
        createRecord(objRecordInput).then(response => {
            alert('Account created with Id: ' +response.id);
           // console.log(JSON.stringify(response));
            this.id=response.id;
            console.log("Contact List"+JSON.stringify(this.contactList));
            this.createContact();
        }).catch(error => {
            alert('Error: ' +JSON.stringify(error));
        });
        

    }
   
   createContact(){
           /* console.log("Contact List"+JSON.stringify(this.contactList));
            var fields = {'FirstName' : this.strfName, 'LastName' : this.strlName,'AccountId': this.id};
            var objInput = {'apiName' : 'Contact', fields};
     
            
            createRecord(objInput).then(response => {
                alert('Contact created with Id: ' +response.id);
                // console.log(JSON.stringify(response));
                console.log(this.contactList);
    
            }).catch(error => {
                alert('Error: ' +JSON.stringify(error));
            }); */
        createContacts({contactList:this.contactList, accId:this.id})
        .then(result => {
                this.error = undefined;
        })
        .catch(error => {
            console.log('Error Occured:- '+error.body.message);
        });
            
    
        } 
    




        removeRow(event){       
            console.log('Access key2:'+event.target.accessKey);
            console.log(event.target.id.split('-')[0]);
            if(this.contactList.length>1){             
                 this.contactList.splice(event.target.accessKey,1);
                 this.keyIndex-1;
            }
        }
    
}