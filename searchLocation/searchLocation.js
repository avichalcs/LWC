import { LightningElement, track, wire} from 'lwc';
import getLocation from '@salesforce/apex/ZomatoClass.getLocation';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubSub';
export default class Zomato extends LightningElement {
    location = '';
    entityId = '';
    entityType = '';
    @wire(CurrentPageReference) pageRef;
 
    handleLocationChange(event) {
        this.location = event.target.value;
    }
    /* This Method will make Zomato REST API call through APEX to get the location details  
     * such as entity Id, entity type etc based on location name  
    */
    selectLocation() {
        getLocation({ 'locationName' : this.location })
        .then(result => {
            const output = JSON.parse(result);
            const location_suggestions = output.location_suggestions;
            this.error = undefined;
            if(location_suggestions !== undefined) {
                this.entityId = location_suggestions[0].entity_id;
                this.entityType = location_suggestions[0].entity_type;
                if(this.entityId != null && this.entityType != null){
                    fireEvent(this.pageRef,'displayRestaurantsPage',location_suggestions[0]);
                }  
            }
            else {
                console.log("No info returned in call back in selectLocation method");
            }
        })
        .catch(error => {
            this.error = error;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error!!!',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
            console.log("error", JSON.stringify(this.error));
        });
    }
}