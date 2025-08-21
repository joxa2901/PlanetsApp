import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HighlightPipe } from './pipes/highlight.pipe';
import { SortComponent } from './components/sort/sort.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
    declarations: [
        HeaderComponent,
        HighlightPipe,
        SortComponent,
        ConfirmationModalComponent,
    ],
    imports: [CommonModule],

    exports: [
        HeaderComponent,
        HighlightPipe,
        SortComponent,
        ConfirmationModalComponent,
    ],
})
export class SharedModule {}
