import { LightningElement, wire,track } from 'lwc';
import studentInfo from '@salesforce/apex/getStudentInfo.studentInfo';
import CLASS_PICKLIST from '@salesforce/schema/Student__c.Class__c';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';

export default class DragNdropSitting extends LightningElement {
    studentList=[];
    classPickList;
    customClass1 = 'item1';
    customClass2 = 'item1';
    customClass3 = 'item1';
    customClass4 = 'item1';

    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: CLASS_PICKLIST
    })
    wiredPickListValue1({ data, error }) {
        if (data) {
            console.log(' Picklist values are ', data.values);
            this.classPickList = data.values;
            this.error = undefined;
        }
        if (error) {
            console.log(' Error while fetching Picklist values  ${error}');
            this.error = error;
            this.classPickList = undefined;
        }
    }


    connectedCallback() {
        console.log("Connected Callback")
        studentInfo({ className: this.value })
            .then(result => {
                this.studentList = result;
                this.error = undefined;
                // console.log("AviConnectedCallback"+JSON.stringify(this.studentList));
            })
            .catch(error => {
                this.error = error;
                this.studentList = undefined;
            });
        }
       
        handleclassPickList(event) {
            this.value = event.detail.value;
           this.connectedCallback();
         }

        drag(event){
            event.dataTransfer.setData("divId", event.target.id);
            event.effectAllowed = 'copy';
            console.log("drag"+event.target.id);
        }
    
        allowDrop1(event){
            console.log("drop");
            event.preventDefault();
        }
    
        drop1(event){
            event.preventDefault();
            this.customClass1 = 'class1';
            var divId = event.dataTransfer.getData("divId");
            var draggedElement = this.template.querySelector('#' +divId);
            draggedElement.classList.add('completed'); 
            event.target.appendChild(draggedElement);
        }
        allowDrop2(event){
            console.log("drop");
            event.preventDefault();
        }
    
        drop2(event){
            event.preventDefault();
            this.customClass1 = 'class2';
            var divId = event.dataTransfer.getData("divId");
            var draggedElement = this.template.querySelector('#' +divId);
            draggedElement.classList.add('completed'); 
            event.target.appendChild(draggedElement);
        }
}