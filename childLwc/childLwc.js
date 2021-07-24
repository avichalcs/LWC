import { LightningElement, api } from "lwc";

export default class childLwc extends LightningElement {
  @api getIdFromParent;
  @api objectApiName;
}