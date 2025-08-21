import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Planet } from '../models/planet';
import {
    catchError,
    Observable,
    shareReplay,
    startWith,
    Subject,
    switchMap,
    tap,
    throwError,
} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PlanetService {
    private baseUrl = 'http://localhost:3001/api';

    private refresh$ = new Subject<void>();
    private planets$?: Observable<Planet[]>;

    constructor(private http: HttpClient) {}

    getPlanets(): Observable<Planet[]> {
        if (!this.planets$) {
            this.planets$ = this.refresh$.pipe(
                startWith(undefined),
                switchMap(() =>
                    this.http
                        .get<Planet[]>(`${this.baseUrl}/planets`)
                        .pipe(
                            catchError(
                                this.handleError<Planet[]>(
                                    'Load planets',
                                    'Could not load the planets.'
                                )
                            )
                        )
                ),
                shareReplay({ bufferSize: 1, refCount: true })
            );
        }
        return this.planets$;
    }

    createPlanet(planetData: any, file?: File): Observable<Planet> {
        const formData = new FormData();

        this.mapPlanetToFormData(planetData, formData, file);

        return this.http.post<Planet>(`${this.baseUrl}/planets`, formData).pipe(
            tap(() => this.refresh$.next()),
            catchError(
                this.handleError<Planet>(
                    'Create planet',
                    'Could not create the planet.'
                )
            )
        );
    }

    reloadPlanets(): Observable<Planet[]> {
        return this.http
            .get<Planet[]>(`${this.baseUrl}/planets/reload`)
            .pipe(
                catchError(
                    this.handleError<Planet[]>(
                        'Reload planets',
                        'Could not reload the planets.'
                    )
                )
            );
    }

    getPlanet(id: string): Observable<Planet> {
        return this.refresh$.pipe(
            startWith(undefined),
            switchMap(() =>
                this.http.get<Planet>(`${this.baseUrl}/planets/${id}`)
            ),
            catchError(
                this.handleError<Planet>(
                    'Load planet',
                    'Could not load the planet.'
                )
            )
        );
    }

    updatePlanet(id: number, planetData: any, file?: File): Observable<Planet> {
        const formData = new FormData();

        this.mapPlanetToFormData(planetData, formData, file);

        return this.http
            .put<Planet>(`${this.baseUrl}/planets/${id}`, formData)
            .pipe(
                tap(() => this.refresh$.next()),
                catchError(
                    this.handleError<Planet>(
                        'Update planet',
                        'Could not update the planet.'
                    )
                )
            );
    }

    deletePlanet(id: number) {
        return this.http.delete<Planet>(`${this.baseUrl}/planets/${id}`).pipe(
            tap(() => this.refresh$.next()),
            catchError(
                this.handleError<Planet>(
                    'Delete planet',
                    'Could not delete the planet.'
                )
            )
        );
    }

    private mapPlanetToFormData(
        planetData: any,
        formData: FormData,
        file: File | undefined
    ) {
        formData.append('planetName', planetData.planetName);
        formData.append('description', planetData.description);
        formData.append('planetColor', planetData.planetColor);
        formData.append('planetRadiusKM', planetData.planetRadiusKM);
        formData.append('distInMillionsKM[fromSun]', planetData.distFromSun);
        formData.append(
            'distInMillionsKM[fromEarth]',
            planetData.distFromEarth
        );

        if (file) {
            formData.append('file', file, file.name);
        } else if (planetData.imageUrl) {
            formData.append('imageUrl', planetData.imageUrl);
        }
    }

    private handleError<T>(operation: string, userMessage?: string) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed:`, error);
            window.alert(userMessage ?? `${operation} failed`);
            return throwError(() => error);
        };
    }
}
