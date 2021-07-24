import { api, LightningElement, track, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import LeadSource from '@salesforce/schema/Contact.LeadSource';
import findContacts from '@salesforce/apex/getContactBasedOnLeadSource.findContacts';
import attachContacts from '@salesforce/apex/getContactBasedOnLeadSource.attachContacts';
const columns = [
    { label: 'First Name', fieldName: 'FirstName', type: 'text' },
    { label: 'Last Name', fieldName: 'LastName', type: 'text' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Lead Source', fieldName: 'LeadSource', type: 'picklist' },
];

export default class dualListbox extends LightningElement {
    @track  _selected = [];
    @track options = [];
    @api recordId;
    data = [];
    columns = columns;
    areDetailsVisible = false;
    // @track values = [];
    // @track defaultValues= [];

    get selected() {
        return this._selected.length ? this._selected : 'none';
    }

    handleChange(e) {
        this._selected = e.detail.value;
        console.log(this._selected);

    }

    @track lSource;
    @track value;
    @track contactList = [];
    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: LeadSource
    })
    wiredPickListValue1({ data, error }) {
        if (data) {
            console.log(' Picklist values are ', data.values);
            this.lSource = data.values;
            this.error = undefined;
        }
        if (error) {
            console.log(' Error while fetching Picklist values  ${error}');
            this.error = error;
            this.lSource = undefined;
        }
    }
    ChangedHandler(event) {
        this.value = event.detail.value;
        findContacts({ leadS: this.value })
            .then(result => {
                // this.contactList = result;
                //console.log(JSON.stringify(result));
                const items = [];
                var obj = result;
                for (var i = 0; i < obj.length; i++) {
                    items.push({
                        label: obj[i].Name,
                        value: obj[i].Id,
                    });
                    //console.log("PAIR " + i + ": " + obj[i].Id);
                    //console.log("PAIR " + i + ": " + obj[i].Name);



                }
                this.options = [];
                this.options.push(...items);
                console.log(JSON.stringify(this.options));


            })
            .catch(error => {
                console.log('Errorured:- ' + error.body.message);
            });

    }
    handleClick(event){
       
        console.log(this.recordId);
        console.log(JSON.stringify(this._selected));
        attachContacts({ conId:JSON.stringify(this._selected),accId:this.recordId })
        .then(result => {
           console.log(JSON.stringify(result));
           this.data=result;
           this._selected = [];
           this.options = [];
           this.areDetailsVisible = true;

        })
        .catch(error => {
            console.log('Errorured:- ' + error.body.message);
        });

    }

}