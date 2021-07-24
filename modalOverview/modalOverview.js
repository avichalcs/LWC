import { LightningElement } from 'lwc';

export default class ModalOverview extends LightningElement {
    Modal=false;
    openModal(){
        this.Modal=true; 
    }
    onSave(){
       this.Modal=false;
    }
    
    onCancel(){
        this.Modal=false;
    }
}