import { api, LightningElement, track } from 'lwc';
import generatePDF from '@salesforce/apex/DisplayRichTextHelper.generatePDF';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DisplayRichTextComponent extends LightningElement {
    @api recordId;
    @track isModalOpen = false;
    @track fileName;
    @track newfileName;



    allowedFormats = ['font', 'size', 'bold', 'italic', 'underline', 'strike',
        'list', 'indent', 'align', 'link', 'image', 'clean', 'table', 'header', 'color',
        'background', 'code', 'code-block'];

    //this method will display initial text
    get myVal() {
        return '**Generate PDF using LWC Component**';
    }

    attachment; //this will hold attachment reference

    
    saveAsPdf() {
        this.openModal();
    }

   /* handleClick() {
        const editor = this.template.querySelector('lightning-input-rich-text');
        const textToInsert = 'Thanks Me Later'
        editor.setRangeText(textToInsert, undefined, undefined, 'select')
        editor.setFormat({ bold: true, size: 24, color: 'green', align: 'center', });
    } */

    getfilename(event) {
        this.fileName = event.detail.value;
    }

    submitDetails() {
        this.newfileName = this.fileName
        this.isModalOpen = false;
        const editor = this.template.querySelector('lightning-input-rich-text');

        generatePDF({ txtValue: editor.value, targetId: this.recordId, fname:this.newfileName })
            .then((result) => {
                this.attachment = result;
                console.log('attachment id=' + this.attachment.Id);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'PDF generated successfully with Id:' + this.attachment.Id,
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating Attachment record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            })
        
    }

    openModal() {
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }

}