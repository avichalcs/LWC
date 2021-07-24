import { LightningElement,track } from 'lwc';

export default class FolderManagement extends LightningElement {
    @track isModalOpen=false;
    @track newList;
       
    @track keyindex = 0;
    @track nameList = [
        {                      
            FolderName: ''
        }
    ];
    
    handleClick(event){
        this.isModalOpen=true;
       
        console.log("Folder Action");
    }
    closeModal(){
        this.isModalOpen=false;
    }
    ChangedHandler(event){
        this.nameList.FolderName= event.target.value;
        console.log(event.target.value);
        this.newList=this.nameList;
       
    }
    submitDetails(event)
        {
            this.keyIndex+1;   
            this.nameList.push ({            
                FolderName: '',
            
            });
            this.isModalOpen=false;
           
        }
    
    folderAction(event){
        console.log("Folder Action");
    }
}