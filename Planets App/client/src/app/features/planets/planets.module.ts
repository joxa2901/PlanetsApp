import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetListComponent } from './pages/planet-list/planet-list.component';
import { PlanetTableViewComponent } from './pages/planet-list/building-blocks/planet-table-view/planet-table-view.component';
import { PlanetDetailsComponent } from './pages/planet-details/planet-details.component';
import { PlanetGridViewComponent } from './pages/planet-list/building-blocks/planet-grid-view/planet-grid-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { PlanetsRoutingModule } from './planets-routing.module';
import { PlanetFormModalComponent } from './components/planet-form-modal/planet-form-modal.component';

@NgModule({
    declarations: [
        PlanetListComponent,
        PlanetTableViewComponent,
        PlanetGridViewComponent,
        PlanetDetailsComponent,
        PlanetFormModalComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        PlanetsRoutingModule,
    ],
})
export class PlanetsModule {}
