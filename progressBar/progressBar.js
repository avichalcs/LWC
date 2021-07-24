import { LightningElement } from 'lwc';

export default class ProgressBar extends LightningElement {
    value;
    steps= [
            { label: 'Contacted', value: 'contacted' },
            { label: 'Open', value: 'open' },
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Nurturing', value: 'nurturing' },
            { label: 'Closed', value: 'closed' },
        ];
    

    handleChange(event) {
        this.value = event.detail.value;
    }
}