import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanetListComponent } from './pages/planet-list/planet-list.component';
import { PlanetDetailsComponent } from './pages/planet-details/planet-details.component';

const routes: Routes = [
    {
        path: '',
        component: PlanetListComponent,
    },
    {
        path: ':id',
        component: PlanetDetailsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlanetsRoutingModule {}
