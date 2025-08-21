import { Component, OnInit } from '@angular/core';
import { Planet } from '../../models/planet';
import { Observable, switchMap } from 'rxjs';
import { PlanetService } from '../../services/planet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'pl-planet-details',
    templateUrl: './planet-details.component.html',
})
export class PlanetDetailsComponent implements OnInit {
    planet$!: Observable<Planet>;
    isEditModalVisible: boolean = false;
    selectedPlanet!: Planet;
    isConfirmationModalVisible = false;

    constructor(
        private planetService: PlanetService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.planet$ = this.route.paramMap.pipe(
            switchMap((params) =>
                this.planetService.getPlanet(params.get('id') as string)
            )
        );
    }

    deletePlanet(id: number) {
        this.planetService.deletePlanet(id).subscribe({
            next: () => {
                window.alert('Planet deleted');
                this.router.navigate(['planets']);
            },
            error: (err) => console.error('Delete failed', err),
        });
    }

    openEditModal(planet: Planet) {
        this.selectedPlanet = planet;
        this.isEditModalVisible = true;
    }

    closeEditModal() {
        this.isEditModalVisible = false;
    }

    openConfirmationModal() {
        this.isEditModalVisible = false;
        this.isConfirmationModalVisible = true;
    }

    updatePlanet(event: { planet: Planet; file?: File }) {
        if (!this.selectedPlanet) return;

        const updatedPlanet = { ...this.selectedPlanet, ...event.planet };

        this.planetService
            .updatePlanet(this.selectedPlanet.id, updatedPlanet, event.file)
            .subscribe({
                next: () => {
                    window.alert('Planet edited');
                    this.closeEditModal();
                },
                error: (err) => console.error('Update failed', err),
            });
    }
}
