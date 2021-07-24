import { LightningElement, wire, track } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Industry from '@salesforce/schema/Account.Industry';
import Rating from '@salesforce/schema/Account.Rating';
import Type from '@salesforce/schema/Account.Type';

/*
    getPicklistValues -
        RecordtypeId - Required... 
        fieldApiName - Required
*/
/*
    getPicklistValuesByRecordType
        recordTypeId - Required Type Id (Real One)
        objectApiName - API Name of your Object
*/
export default class Picklist extends LightningElement {
    @track industryPickList;
    @track RatingPickList;
    @track TypePickList;
    

    @wire(getPicklistValues, {
        recordTypeId : '012000000000000AAA',
        fieldApiName : Industry
    })
        wiredPickListValue1({ data, error }){
            if(data){
                console.log(' Picklist values are ', data.values);
                this.industryPickList = data.values;
                this.error = undefined;
            }
            if(error){
                console.log(' Error while fetching Picklist values  ${error}');
                this.error = error;
                this.pickListvalues = undefined;
            }
        }



        @wire(getPicklistValues, {
            recordTypeId : '012000000000000AAA',
            fieldApiName : Rating
        })
            wiredPickListValue2({ data, error }){
                if(data){
                    console.log(' Picklist values are ', data.values);
                    this.RatingPickList = data.values;
                    this.error = undefined;
                }
                if(error){
                    console.log(' Error while fetching Picklist values  ${error}');
                    this.error = error;
                    this.RatingPickList = undefined;
                }
            }

            @wire(getPicklistValues, {
                recordTypeId : '012000000000000AAA',
                fieldApiName : Type
            })
                wiredPickListValue3({ data, error }){
                    if(data){
                        console.log(' Picklist values are ', data.values);
                        this.TypePickList = data.values;
                        this.error = undefined;
                    }
                    if(error){
                        console.log(' Error while fetching Picklist values  ${error}');
                        this.error = error;
                        this.TypePickList = undefined;
                    }
                }


    
                handleindustryPickList(){
        
    }
    
    handleRatingPickList(){
        
    }

    handleTypePickList(){
        
    }

}