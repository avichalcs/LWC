import { LightningElement, track ,wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import createContacts  from '@salesforce/apex/createMultiContacts.createContact';
import createOpp  from '@salesforce/apex/createMultiContacts.createOpp';
import StageName from '@salesforce/schema/Opportunity.StageName';


export default class multipleContactCreationOnOneAccount extends LightningElement {
    @track keyindex = 0;
    @track data = [];
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
            console.log("Opportunity List"+JSON.stringify(this.oppList));
            this.createContact();
            this.createOpportunity();
        }).catch(error => {
            alert('Error: ' +JSON.stringify(error));
        });
        

    }
   
   createContact(){
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



        

        @track StageName;
        @wire(getPicklistValues, {
            recordTypeId : '012000000000000AAA',
            fieldApiName : StageName
        })
            wiredPickListValue1({ data, error }){
                if(data){
                    console.log(' Picklist values are ', data.values);
                    this.StageName = data.values;
                    this.error = undefined;
                }
                if(error){
                    console.log(' Error while fetching Picklist values  ${error}');
                    this.error = error;
                    this.StageName = undefined;
                }
            }
            @track keyindex1 = 0;
            @track oppList = [
                {                      
                    Name: '',
                    StageName: '',
                    CloseDate:'',
                }
            ];
            addRow1() {
                this.keyIndex1+1;   
                this.oppList.push ({            
                    Name: '',
                    StageName: '',
                    CloseDate:'',
                
                });
                
                console.log('Enter ',oppList);
                console.log('Enter ',JSON.stringyfy(oppList));
               
            }
            removeRow1(event){       
                console.log('Access key2:'+event.target.accessKey);
                console.log(event.target.id.split('-')[0]);
                if(this.oppList.length>1){             
                     this.oppList.splice(event.target.accessKey,1);
                     this.keyIndex-1;
                }
            }
            oppChangedHandler(event){
                if(event.target.name==='oppName'){
                    this.oppList[event.target.accessKey].Name = event.target.value;
                }
                else if(event.target.name==='StageName'){
                    this.oppList[event.target.accessKey].StageName = event.target.value;
                }
                else if(event.target.name==='cDate'){
                    this.oppList[event.target.accessKey].CloseDate = event.target.value;
                }
               
        
            }
            createOpportunity(){
                createOpp({oppList:this.oppList, accId:this.id})
                .then(result => {
                        this.error = undefined;
                })
                .catch(error => {
                    console.log('Error Occured:- '+error.body.message);
                });
                    
            
                } 







    
}