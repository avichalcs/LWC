import { LightningElement,track } from 'lwc';

export default class TestParent extends LightningElement { handleCall(event){
      var childCompVar  = this.template.querySelector('c-test-child');
      var sendParam = {'firstname': 'Salesforce'};
      childCompVar.testChildMethod(sendParam);
          

    }
}