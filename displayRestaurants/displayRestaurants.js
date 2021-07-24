import { LightningElement, wire, track } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubSub';
import { CurrentPageReference } from 'lightning/navigation';
import zomatoApiUrl from '@salesforce/label/c.Zomato_API_URL';
import zomatoUserKey from '@salesforce/label/c.Zomato_User_Key';

 
export default class SearchRestaurants extends LightningElement {
    @track restaurantsList =[];
    @wire(CurrentPageReference) pageRef;
    @track mapMarkers = [];
    @track markersTitle = 'Locations Of Restaurants';
    @track zoomLevel = 4;
    

    connectedCallback(){
       
        registerListener('displayRestaurantsPage',this.handleRestaurantList,this);

    }
    disconnectedCallback(){        
        // Unregisters all event listeners bound to an object.
        // @param {object} this - All the callbacks bound to this object will be removed.
        unregisterAllListeners(this);
    }
 
   
    searchRestaurant(locationDetails) {
        console.log("Location" +JSON.stringify(locationDetails));
        let url = zomatoApiUrl;
        url = url+'location_details?entity_id='+locationDetails.entity_id;
        url = url+'&entity_type='+locationDetails.entity_type;
        //The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, 
        //such as requests and responses.
        fetch(url,
        {
            method : "GET",
            headers : {
                "Content-Type": "application/json",
                "user-key": zomatoUserKey
            }
        })
        .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((responseJSON) => {
            this.restaurantsList = responseJSON.best_rated_restaurant;
            console.log("restaurants" +JSON.stringify( this.restaurantsList));

        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        }); 
    }
 
    handleRestaurantList(locationDetails){
        this.searchRestaurant(locationDetails);
    }
     
}