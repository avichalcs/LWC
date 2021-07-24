import { api, LightningElement, track, wire } from 'lwc';
import getAccountList from '@salesforce/apex/showAccountData.showAcc';
import { NavigationMixin } from 'lightning/navigation';

const actions = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
];

const columns = [
    {label: 'Name', fieldName: 'Name'},
    {label: 'Rating', fieldName: 'Rating'},
    {label: 'Industry', fieldName: 'Industry'},
		 {
        type: 'action',
        typeAttributes: { rowActions: actions }
    }
];
export default class ShowAccountList extends NavigationMixin(LightningElement) {

		
		@track accounts=[];
        @track columns = columns;
        @track error; 
		
	connectedCallback(){
        getAccountList()
        .then(result => {
            this.accounts = result;
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            this.accounts = undefined;
        });
   } 



   /*handleRowAction( event ) {

    const actionName = event.detail.action.name;
    const row = event.detail.row;
    switch ( actionName ) {
        case 'view':
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: row.Id,
                    actionName: 'view'
                }
            });
            break;
        case 'edit':
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: row.Id,
                    objectApiName: 'Account',
                    actionName: 'edit'
                }
            });
            break;
        default:
    }

} 
@track openmodel = false;
@track recId;

openmodal() {
    this.openmodel = true;
}
closeModal() {
    this.openmodel = false;
} */

handleRowAction( event ) {
    const actionName = event.detail.action.name;
    console.log(actionName);
        const row = event.detail.row.Id;
        console.log(row);
        switch ( actionName ) {
            case 'view':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row,
                        actionName: 'view'
                    }
                });
                break;
            case 'edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row,
                        objectApiName: 'Account',
                        actionName: 'edit'
                    }
                });
                break;
            default:
        }

    }




    }