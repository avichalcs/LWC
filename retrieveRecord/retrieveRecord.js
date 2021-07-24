import { LightningElement, wire, api, track } from 'lwc';
import retreieveRecords from '@salesforce/apex/DescribeObjectHelper.retreieveRecords';

export default class RetrieveRecord extends LightningElement {
    @api objectName = ''; 
    @api fieldAPINames = ''; 
    
    items=[]; 
    @track data=[];
    @track columns;
    isRecordsVisible; 


    @wire(retreieveRecords,{objectName:'$objectName'
                            ,fieldAPINames:'$fieldAPINames'})
    wiredObjects({ error, data }) {
        if (data) {
            console.log('data in string='+ JSON.stringify(data));            
            this.data = data;            
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    //due to event propagation this method is called
    retriveRecordHandler(event){
        let args = JSON.parse(JSON.stringify(event.detail));
        console.log("Avichal"+args);
        //{"valueParam":"Account","selectedFieldsValueParam":"id,name,type"}
        
        this.objectName = args.valueParam;
        this.fieldAPINames = args.selectedFieldsValueParam;
        console.log("Avichal objectName"+ this.objectName);
        console.log("Avichal fieldAPINames"+ this.fieldAPINames);
        
        //create columns from fieldAPINames ("id,name,type")
        let columnFields = args.selectedFieldsValueParam.split(',');
        this.items='';

        //create columns for dynamic data display. Here all fields must be converted to initial letter as upper case
        //e.g id,name,type to transformed to Id, Name, Type
        columnFields.map(element=>{
            let itemValue = element.charAt(0).toUpperCase()+ element.slice(1);
            this.items = [...this.items ,{label: itemValue, 
                                        fieldName: itemValue}];    
        });
        
        this.columns = this.items;
        this.isRecordsVisible = true;
    }

    //due to event propagation this method is called for reseting datatable
    resetHandler(event){
        this.isRecordsVisible = false;
        this.columns = [];
        this.data = [];
    }
}