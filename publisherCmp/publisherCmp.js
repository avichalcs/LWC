import { LightningElement, track } from 'lwc';
import pubsub from 'c/pubSubFile' ; 
export default class publisherCmp extends LightningElement {

    @track message;
    handleChange(event){
        this.message=event.target.value;

    }
    handleClick(){
        window.console.log('Event Firing..... ');
       /* let message = {
            "message" : 'Hello PubSub',
            "Name": 'Avichal Mishra',
            "Company":'Cyntexa'
        } */
        pubsub.fire('simplevt', this.message );
        window.console.log('Event Fired ');
    }
}