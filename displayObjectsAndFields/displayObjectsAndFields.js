import { LightningElement, track, wire } from 'lwc';
import retreieveObjects from '@salesforce/apex/DescribeObjectHelper.retreieveObjects';
import getListOfFields from '@salesforce/apex/DescribeObjectHelper.getListOfFields';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

/** The delay used when debouncing event handlers before invoking Apex. */
const DELAY = 300;

// eslint-disable-next-line no-unused-vars


const columns = [
    { label: 'Field Label', fieldName: 'FieldLabel' }, 
    { label: 'Field API Name', fieldName: 'FieldAPIName' },       
];

let i=0;
export default class DisplayObjectsAndFields extends LightningElement {

    //this is for showing toast message
    _title = 'Retrieve Records Error';
    message = 'Select atleast one field';
    variant = 'error';
    variantOptions = [
        { label: 'error', value: 'error' },
        { label: 'warning', value: 'warning' },
        { label: 'success', value: 'success' },
        { label: 'info', value: 'info' },
    ];
    
    @track value = '';  
    @track items = []; 
    @track fieldItems = []; 
    
    @track columns = columns;   
    @track selectedFieldsValue=''; 
    @track tableData;   
    
    @wire(retreieveObjects)
    wiredObjects({ error, data }) {
        if (data) {
            data.map(element=>{
                this.items = [...this.items ,{value: element.QualifiedApiName, 
                    label: element.MasterLabel}];  
            });
           
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    get statusOptions() {
        return this.items;
    }

    @wire(getListOfFields,{objectAPIName: '$value'})
    wiredFields({ error, data }) {
        if (data) {            
            //first parse the data as entire map is stored as JSON string
            
            console.log(JSON.stringify(data));
            console.log(JSON.parse(data));
            let objStr = JSON.parse(data);            
            //now loop through based on keys
            for(i of Object.keys(objStr)){
               // console.log('FieldAPIName=' +i + 'FieldLabel=' + objStr[i]);
                //spread function is used to stored data and it is reversed order
                this.fieldItems = [
                    {FieldLabel: objStr[i], FieldAPIName: i},...this.fieldItems];  
            }
            this.tableData = this.fieldItems;
            this.error = undefined;            
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    handleChange(event) {
        const selectedOption = event.detail.value;
        this.value = selectedOption;
        this.fieldItems = [];  
        this.tableData = [];  

        //deplay the processing
        window.clearTimeout(this.delayTimeout);
        
        this.delayTimeout = setTimeout(() => {
            this.value = selectedOption;
        }, DELAY);
        
    }

    
    handleRowAction(event){
        const selectedRows = event.detail.selectedRows;        
        this.selectedFieldsValue = '';  
 // Display that fieldName of the selected rows in a comma delimited way
        selectedRows.map(element=>{
            if(this.selectedFieldsValue !=='' ){
                this.selectedFieldsValue = this.selectedFieldsValue + ',' + element.FieldAPIName;
            }
            else{
                this.selectedFieldsValue = element.FieldAPIName;
            }
        });
    }

    //this method is fired when retrieve records button is clicked
    handleClick(event){        
        const valueParam = this.value;
        const selectedFieldsValueParam = this.selectedFieldsValue;
        //show error if no rows have been selected
        if(selectedFieldsValueParam ===null || selectedFieldsValueParam===''){
            const evt = new ShowToastEvent({
                title: this._title,
                message: this.message,
                variant: this.variant,
            });
            this.dispatchEvent(evt);
        }
        else {
            //propage event to next component
            const evtCustomEvent = new CustomEvent('retreive', {   
                detail: {valueParam, selectedFieldsValueParam}
                });
            this.dispatchEvent(evtCustomEvent);
        }        
    } 
    
    //this method is fired when reset button is clicked.
    handleResetClick(event){
        this.value = '';
        this.tableData = [];
        const evtCustomEvent = new CustomEvent('reset');
        this.dispatchEvent(evtCustomEvent);
    }
}