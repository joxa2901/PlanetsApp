import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Planet } from '../../../../models/planet';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'pl-planet-table-view',
    templateUrl: './planet-table-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetTableViewComponent {
    @Input() planet!: Planet;
    @Input() searchControl!: FormControl;
}
