import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'pl-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
})
export class ConfirmationModalComponent {
    @Input() action!: string;
    @Input() actionName!: string;
    @Input() name!: string;
    @Output() confirmationEmitter = new EventEmitter<void>();
    @Output() cancelEmitter = new EventEmitter<void>();

    confirmAction() {
        this.confirmationEmitter.emit();
    }

    cancel() {
        this.cancelEmitter.emit();
    }
}
