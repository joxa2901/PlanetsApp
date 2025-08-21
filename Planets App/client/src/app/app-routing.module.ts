import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'planets',
        loadChildren: () =>
            import('./features/planets/planets.module').then(
                (m) => m.PlanetsModule
            ),
    },
    {
        path: '',
        redirectTo: 'planets',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
