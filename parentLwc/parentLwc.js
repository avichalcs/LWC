import { LightningElement, api } from "lwc";

export default class parentLwc extends LightningElement {
  @api recordId;
  @api objectApiName;
}