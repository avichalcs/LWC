import { LightningElement ,api} from 'lwc';

export default class TestChild extends LightningElement {
    @api myName = 'Salesfore Predator';
    @api testChildMethod(parentParam){
        alert('this is child method'+parentParam.firstname);
        this.myName = 'Salesfore Predator';
    }
}