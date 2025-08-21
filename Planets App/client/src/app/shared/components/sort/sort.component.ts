import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortState } from '../../helpers/sort-utils';

@Component({
    selector: 'pl-sort',
    templateUrl: './sort.component.html',
})
export class SortComponent {
    @Input() sortKey!: string;
    @Output() sortChange = new EventEmitter<{
        key: string;
        state: SortState;
    }>();

    state: SortState = 'default';

    toggleSort() {
        switch (this.state) {
            case 'default':
                this.state = 'descending';
                break;
            case 'descending':
                this.state = 'ascending';
                break;
            case 'ascending':
                this.state = 'default';
                break;
        }
        this.sortChange.emit({ key: this.sortKey, state: this.state });
    }
}
