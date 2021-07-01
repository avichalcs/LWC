import { LightningElement,api,wire,track } from 'lwc';
import getContacts from '@salesforce/apex/getContactList.getContacts';
import getOpp from '@salesforce/apex/getContactList.getOpp';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';


const columns = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'First Name', fieldName: 'FirstName', type: 'text',editable: true },
    { label: 'Last Name', fieldName: 'LastName', type: 'text',editable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone',editable: true },
    { label: 'Email', fieldName: 'Email', type: 'email',editable: true },
];
const columns1 = [
    { label: 'Name', fieldName: 'Name', type: 'text',editable: true },
    { label: 'Stage Name', fieldName: 'StageName', type: 'picklist',editable: true },
    { label: 'Amount', fieldName: 'Amount', type: 'currency',editable: true },
    { label: 'Close Date', fieldName: 'CloseDate', type: 'date',editable: true },
];
// export default class overrideActions extends LightningElement
export default class Example extends NavigationMixin(LightningElement){  
    @track isModalOpen = false;
    @track draftValues = [];
    @track draftValues1 = [];


    openModal() {

        this.isModalOpen = true;
    }
    closeModal() {
        
        this.isModalOpen = false;
        this.navigateToObjectHome();
    }
    @track data;
    @track columns = columns;
    @track data1;
    @track columns1 = columns1;
    areDetailsVisible = false;
    areDetailsVisible1 = false;



     @api recId;

     connectedCallback(){
        
        this.openModal();
        
        getContacts({accId:this.recId})
        .then(result => {
            
            
            this.data = result;
            this.error = undefined;
            if(this.data.length != 0){
                this.areDetailsVisible=true;

            }


        })
        .catch(error => {
            this.error = error;
            this.data = undefined;
        });


        getOpp({accId:this.recId})
        .then(result => {
            this.data1 = result;
            this.error = undefined;
            if(this.data1.length != 0){
                this.areDetailsVisible1=true;

            }
        })
        .catch(error => {
            this.error = error;
            this.data1 = undefined;
        });
        
   } 

   handleSave(event) {
    const recordInputs =  event.detail.draftValues.slice().map(draft => {
        const fields = Object.assign({}, draft);
        return { fields };
    });
    console.log("Avichal" +JSON.stringify(recordInputs));
    const promises = recordInputs.map(recordInput => updateRecord(recordInput));
    Promise.all(promises).then(data => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'All Contacts updated',
                variant: 'success'
            })
        );
         // Clear all draft values
         this.draftValues = [];

         // Display fresh data in the datatable
         this.connectedCallback();
    }).catch(error => {
        console.log(error);
    });
}   

handleSave1(event) {
    const recordInputs =  event.detail.draftValues.slice().map(draft => {
        const fields = Object.assign({}, draft);
        return { fields };
    });
    console.log("Avichal" +JSON.stringify(recordInputs));
    const promises = recordInputs.map(recordInput => updateRecord(recordInput));
    Promise.all(promises).then(data1 => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'All Opportunities updated',
                variant: 'success'
            })
        );
         // Clear all draft values
         this.draftValues = [];

         // Display fresh data in the datatable
         this.connectedCallback();
    }).catch(error => {
        console.log(error);
    });
}   
navigateToObjectHome() {
    // Navigate to the Account home page
    this[NavigationMixin.Navigate]({
        type: 'standard__objectPage',
        attributes: {
            objectApiName: 'Account',
            actionName: 'home',
        },
    });
}


     
}