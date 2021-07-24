import { LightningElement, wire, track, api } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import CLASS_PICKLIST from '@salesforce/schema/Student__c.Class__c';
import studentInfo from '@salesforce/apex/getStudentInfo.studentInfo';
import positionUpdate from '@salesforce/apex/getStudentInfo.positionUpdate';
import getposition from '@salesforce/apex/getStudentInfo.getposition';


const columns = [
    { label: 'Roll Number', fieldName: 'Roll_Number__c', type: 'text' },
    { label: 'Name', fieldName: 'Name__c', type: 'text' },
    { label: 'Class Percentage', fieldName: 'Class_Percentage__c', type: 'text' },
    { label: 'Position', fieldName: 'Position__c', type: 'text' },
    {
        type: 'button-icon',
        fixedWidth: 40,
        typeAttributes: {
            iconName: 'utility:adduser',
            name: 'addstudent',
            title: 'Add',
            variant: "brand",
            alternativeText: 'Add',
            disabled: false
        }
    },
    {
        type: 'button-icon',
        fixedWidth: 40,
        typeAttributes: {
            iconName: 'utility:delete',
            name: 'delete',
            title: 'Delete',
            variant: "brand",
            alternativeText: 'delete',
            disabled: false
        }
    }


]

export default class NewSittingArr extends LightningElement {
    data = [];
    columns = columns;
    value;
    @track toggleOff = true;
    @track graphicalOff = true;
    @track classPickList;
    @track studentList = [];
    @track showTable = false;
    @track showGraphics = false;
    @track selectedStudent;
    @track student = '';
    @track studentPosition;
    @track studentId;
    @track studentPercentage;
    @track posList;
    @track newList;
    @track customClass1 = 'item1';
    @track customClass2 = 'item2';
    @track customClass3 = 'item3';
    @track customClass4 = 'item4';
    @track customClass5 = 'item5';
    @track customClass6 = 'item6';
    @track customClass7 = 'item7';
    @track customClass8 = 'item8';
    @track divId;
    @track selectedStudent1;
    @track studentId1;
    @track studentPercentage1;
    @track actionName;
    @track studentPosition1;



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



    handleclassPickList(event) {
        this.value = event.detail.value;
       this.connectedCallback();
      


    }
    handletabular(event) {
        if (event.target.name === true) {
            this.toggleOff = false;
            this.showTable = true;
        }
        else if (event.target.name === false) {
            this.toggleOff = true;
            this.showTable = false;
        }

    }
    handlegraphical(event) {
        if (event.target.name === true) {
            this.graphicalOff = false;
            this.showGraphics = true;
            this.custom1();


        }
        else if (event.target.name === false) {
            this.graphicalOff = true;
            this.showGraphics = false;
        }

    }
    callRowAction(event) {
        this.actionName = event.detail.action.name;
        switch (this.actionName) {
            case "addstudent":
                this.studentId = event.detail.row.Id;
                console.log(this.studentId);
                console.log(event.detail.row.Name__c);
                this.selectedStudent = event.detail.row.Name__c;
                this.studentPercentage = event.detail.row.Class_Percentage__c;
               this.connectedCallback();
               
                break;

            case "delete":
                this.studentId1 = event.detail.row.Id;
                console.log(this.studentId1);
                console.log(event.detail.row.Name__c);
                this.selectedStudent1 = event.detail.row.Name__c;
                this.studentPercentage1 = event.detail.row.Class_Percentage__c;
                this.removeSeat();
               this.connectedCallback();
                break;
        }







    }
     connectedCallback() {
        console.log("Connected Callback")
        studentInfo({ className: this.value })
            .then(result => {
                this.studentList = result;
                this.newList = this.studentList;
                this.error = undefined;
                // console.log("AviConnectedCallback"+JSON.stringify(this.studentList));
            })
            .catch(error => {
                this.error = error;
                this.studentList = undefined;
            });



        getposition({ studentId: this.studentId })
            .then(result => {
                this.posList = result;
                console.log(JSON.stringify(this.posList));
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.posList = undefined;
            });





    } 
    custom1(){
        console.log('Inside show Color');
        for (let rec of this.studentList) {
            if (rec.Class_Percentage__c > 75 && rec.Position__c == '1,1') {
                console.log('greater than 75' + JSON.stringify(rec));
                this.customClass1 = 'class1';
                this.student = 'Avichal';
            }
            else if (rec.Class_Percentage__c <= 75 && rec.Position__c == '1,1') {
                console.log('greater than 75' + JSON.stringify(rec));
                this.customClass1 = 'class2';
                this.student = 'Avichal'
            }
            else if (rec.Class_Percentage__c > 75 && rec.Position__c == '1,2') {
                console.log('greater than 75' + JSON.stringify(rec));
                this.customClass2 = 'class1';
            }
            else if (rec.Class_Percentage__c <= 75 && rec.Position__c == '1,2') {
                console.log('greater than 75' + JSON.stringify(rec));
                this.customClass2 = 'class2';
            }
            else if (rec.Class_Percentage__c > 75 && rec.Position__c == '1,3') {
                console.log('greater than 75' + JSON.stringify(rec));
                this.customClass3 = 'class1';
            }
            else if (rec.Class_Percentage__c <= 75 && rec.Position__c == '1,3') {
                console.log('greater than 75' + JSON.stringify(rec));
                this.customClass3 = 'class2';
            }
            else if (rec.Class_Percentage__c > 75 && rec.Position__c == '1,4') {
                console.log('greater than 75' + JSON.stringify(rec));
                this.customClass4 = 'class1';
            }
            else if (rec.Class_Percentage__c <= 75 && rec.Position__c == '1,4') {
                console.log('greater than 75' + JSON.stringify(rec));
                this.customClass4 = 'class2';
            }
            else if (rec.Class_Percentage__c > 75 && rec.Position__c == '2,1') {
                console.log('greater than 75' + JSON.stringify(rec));
                this.customClass5 = 'class1';
            }
            else if (rec.Class_Percentage__c <= 75 && rec.Position__c == '2,1') {
                console.log('greater than 75' + JSON.stringify(rec));
                this.customClass5 = 'class2';
            }
            else if (rec.Class_Percentage__c > 75 && rec.Position__c == '2,2') {
                console.log('greater than 75' + JSON.stringify(rec));
                this.customClass6 = 'class1';
            }
            else if (rec.Class_Percentage__c <= 75 && rec.Position__c == '2,2') {
                console.log('greater than 75' + JSON.stringify(rec));
                this.customClass6 = 'class2';
            }
            else if (rec.Class_Percentage__c > 75 && rec.Position__c == '2,3') {
                console.log('greater than 75' + JSON.stringify(rec));
                this.customClass7 = 'class1';
            }
            else if (rec.Class_Percentage__c <= 75 && rec.Position__c == '2,3') {
                console.log('greater than 75' + JSON.stringify(rec));
                this.customClass7 = 'class2';
            }
            else if (rec.Class_Percentage__c > 75 && rec.Position__c == '2,4') {
                console.log('greater than 75' + JSON.stringify(rec));
                this.customClass8 = 'class1';
            }
            else if (rec.Class_Percentage__c <= 75 && rec.Position__c == '2,4') {
                console.log('greater than 75' + JSON.stringify(rec));
                this.customClass8 = 'class2';
            }
            
           
            
        }
       
}


    renderedCallback() {
      this.custom1();
    }




drag(event){
    this.selectedStudent=event.target.id;
    this.studentId=event.target.id;
    event.dataTransfer.setData("divId", event.target.id);
    event.effectAllowed = 'copy';
    console.log("drag"+event.target.id);
    this.connectedCallback();
}

allowDrop1(event){
    console.log("drop");
    event.preventDefault();
}

drop1(event){
    event.preventDefault();
    console.log('Hello from div 1');
   
    this.student1 = this.selectedStudent;
    console.log("drop1 "+this.selectedStudent);
        this.studentPosition = "1,1";
        this.studentPosition1 = "1,1";
        var divblock = this.template.querySelector('[data-id="divblock"]');
        for (let rec of this.posList) {
            if ((rec.Position__c && divblock) || rec.Position__c) {
                alert('Student is already present');
                break;
            }

           
             else {

                positionUpdate({ studentPosition: this.studentPosition, studentId: this.studentId })
                    .then(result => {
                        this.studentPosition = '';
                        this.custom1();
                        this.connectedCallback();
                        console.log(result['status']);
                        console.log(result['message']);

                    })
                    .catch(error => {
                    });

            }


        }

}
allowDrop2(event){
    console.log("drop");
    event.preventDefault();
}

drop2(event){
    event.preventDefault();
    console.log('Hello from div 1');
   
    this.student1 = this.selectedStudent;
    console.log("drop1 "+this.selectedStudent);
        this.studentPosition = "1,2";
        this.studentPosition1 = "1,2";
        var divblock = this.template.querySelector('[data-id="divblock1"]');
        for (let rec of this.posList) {
            if ((rec.Position__c && divblock) || rec.Position__c) {
                alert('Student is already present');
                break;
            }

           
             else {

                positionUpdate({ studentPosition: this.studentPosition, studentId: this.studentId })
                    .then(result => {
                        this.studentPosition = '';
                        this.custom1();
                        this.connectedCallback();
                        console.log(result['status']);
                        console.log(result['message']);

                    })
                    .catch(error => {
                    });

            }


        }
}
allowDrop3(event){
    console.log("drop");
    event.preventDefault();
}

drop3(event){
    event.preventDefault();
    console.log('Hello from div 3');
   
    this.student1 = this.selectedStudent;
    console.log("drop1 "+this.selectedStudent);
        this.studentPosition = "1,3";
        this.studentPosition1 = "1,3";
        var divblock = this.template.querySelector('[data-id="divblock2"]');
        for (let rec of this.posList) {
            if ((rec.Position__c && divblock) || rec.Position__c) {
                alert('Student is already present');
                break;
            }

           
             else {

                positionUpdate({ studentPosition: this.studentPosition, studentId: this.studentId })
                    .then(result => {
                        this.studentPosition = '';
                        this.custom1();
                        this.connectedCallback();
                        console.log(result['status']);
                        console.log(result['message']);

                    })
                    .catch(error => {
                    });

            }


        }
}
allowDrop4(event){
    console.log("drop");
    event.preventDefault();
}

drop4(event){
    event.preventDefault();
    console.log('Hello from div 4');
   
    this.student1 = this.selectedStudent;
    console.log("drop1 "+this.selectedStudent);
        this.studentPosition = "1,4";
        this.studentPosition1 = "1,4";
        var divblock = this.template.querySelector('[data-id="divblock3"]');
        for (let rec of this.posList) {
            if ((rec.Position__c && divblock) || rec.Position__c) {
                alert('Student is already present');
                break;
            }

           
             else {

                positionUpdate({ studentPosition: this.studentPosition, studentId: this.studentId })
                    .then(result => {
                        this.studentPosition = '';
                        this.custom1();
                        this.connectedCallback();
                        console.log(result['status']);
                        console.log(result['message']);

                    })
                    .catch(error => {
                    });

            }


        }
}
allowDrop5(event){
    console.log("drop");
    event.preventDefault();
}

drop5(event){
    event.preventDefault();
    console.log('Hello from div 5');
   
    this.student1 = this.selectedStudent;
    console.log("drop1 "+this.selectedStudent);
        this.studentPosition = "2,1";
        this.studentPosition1 = "2,1";
        var divblock = this.template.querySelector('[data-id="divblock4"]');
        for (let rec of this.posList) {
            if ((rec.Position__c && divblock) || rec.Position__c) {
                alert('Student is already present');
                break;
            }

           
             else {

                positionUpdate({ studentPosition: this.studentPosition, studentId: this.studentId })
                    .then(result => {
                        this.studentPosition = '';
                        this.custom1();
                        this.connectedCallback();
                        console.log(result['status']);
                        console.log(result['message']);

                    })
                    .catch(error => {
                    });

            }


        }
}
allowDrop6(event){
    console.log("drop");
    event.preventDefault();
}

drop6(event){
    event.preventDefault();
    console.log('Hello from div 1');
   
    this.student1 = this.selectedStudent;
    console.log("drop1 "+this.selectedStudent);
        this.studentPosition = "2,2";
        this.studentPosition1 = "2,2";
        var divblock = this.template.querySelector('[data-id="divblock5"]');
        for (let rec of this.posList) {
            if ((rec.Position__c && divblock) || rec.Position__c) {
                alert('Student is already present');
                break;
            }

           
             else {

                positionUpdate({ studentPosition: this.studentPosition, studentId: this.studentId })
                    .then(result => {
                        this.studentPosition = '';
                        this.custom1();
                        this.connectedCallback();
                        console.log(result['status']);
                        console.log(result['message']);

                    })
                    .catch(error => {
                    });

            }


        }
}
allowDrop7(event){
    console.log("drop");
    event.preventDefault();
}

drop7(event){
    event.preventDefault();
    console.log('Hello from div 1');
   
    this.student1 = this.selectedStudent;
    console.log("drop1 "+this.selectedStudent);
        this.studentPosition = "2,3";
        this.studentPosition1 = "2,3";
        var divblock = this.template.querySelector('[data-id="divblock6"]');
        for (let rec of this.posList) {
            if ((rec.Position__c && divblock) || rec.Position__c) {
                alert('Student is already present');
                break;
            }

           
             else {

                positionUpdate({ studentPosition: this.studentPosition, studentId: this.studentId })
                    .then(result => {
                        this.studentPosition = '';
                        this.custom1();
                        this.connectedCallback();
                        console.log(result['status']);
                        console.log(result['message']);

                    })
                    .catch(error => {
                    });

            }


        }
}
allowDrop8(event){
    console.log("drop");
    event.preventDefault();
}

drop8(event){
    event.preventDefault();
    console.log('Hello from div 1');
   
    this.student1 = this.selectedStudent;
    console.log("drop1 "+this.selectedStudent);
        this.studentPosition = "2,4";
        this.studentPosition1 = "2,4";
        var divblock = this.template.querySelector('[data-id="divblock7"]');
        for (let rec of this.posList) {
            if ((rec.Position__c && divblock) || rec.Position__c) {
                alert('Student is already present');
                break;
            }

           
             else {

                positionUpdate({ studentPosition: this.studentPosition, studentId: this.studentId })
                    .then(result => {
                        this.studentPosition = '';
                        this.custom1();
                        this.connectedCallback();
                        console.log(result['status']);
                        console.log(result['message']);

                    })
                    .catch(error => {
                    });

            }


        }
}
remove1(event){
            console.log("hello from remove 1"+event.target.id);
            this.studentId1=event.target.id;
              this.customClass1 = 'class3';
            this.studentPosition1 = '';
            positionUpdate({ studentPosition: this.studentPosition1, studentId: this.studentId1 })
                .then(result => {
                    this.connectedCallback();
                   //  this.customClass1 = 'class3';
                    console.log(result['status']);
                    console.log(result['message']);
                   

                })
                .catch(error => {
                });
}


}