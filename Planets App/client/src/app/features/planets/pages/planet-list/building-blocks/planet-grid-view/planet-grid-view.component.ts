import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Planet } from '../../../../models/planet';

@Component({
    selector: 'pl-planet-grid-view',
    templateUrl: './planet-grid-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetGridViewComponent {
    @Input() planet!: Planet;
}
