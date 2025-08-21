import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Planet } from '../../models/planet';
import {
    BehaviorSubject,
    combineLatest,
    debounceTime,
    distinctUntilChanged,
    map,
    Observable,
    shareReplay,
    startWith,
    tap,
} from 'rxjs';
import { PlanetService } from '../../services/planet.service';
import { FormControl } from '@angular/forms';
import { filterAndSort } from '../../../../shared/helpers/sort-utils';
@Component({
    selector: 'pl-planet-list',
    templateUrl: './planet-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetListComponent implements OnInit {
    @ViewChild('search') searchInput!: ElementRef<HTMLInputElement>;
    @ViewChild('lastElement') lastElement!: ElementRef<HTMLInputElement>;
    toggleView: 'grid' | 'list' = 'list';
    sortState$ = new BehaviorSubject<'ascending' | 'descending' | 'default'>(
        'default'
    );
    sortParameter: any;
    planets$!: Observable<Planet[]>;
    searchControl = new FormControl('');
    isCreateModalVisible: boolean = false;
    isVisibleOnDesktopScreen = true;
    isMobile = false;

    constructor(private planetService: PlanetService) {}

    ngOnInit() {
        this.planets$ = combineLatest([
            this.planetService.getPlanets(),
            this.searchControl.valueChanges.pipe(
                startWith(''),
                debounceTime(300),
                distinctUntilChanged()
            ),
            this.sortState$,
        ]).pipe(
            map(([planets, searchQuery, sortState]) => {
                const filtered = filterAndSort(
                    planets,
                    searchQuery,
                    this.sortParameter,
                    sortState,
                    ['planetName', 'planetColor']
                );
                return filtered;
            }),
            shareReplay()
        );

        this.checkScreenSize();
    }

    @HostListener('window:resize')
    onResize() {
        this.checkScreenSize();
    }

    sortItems(event: {
        key: string;
        state: 'ascending' | 'descending' | 'default';
    }) {
        this.sortParameter = event.key;
        this.sortState$.next(event.state);
    }

    openModal() {
        this.isCreateModalVisible = true;
    }

    closeModal() {
        this.isCreateModalVisible = false;
    }

    createPlanet(event: { planet: any; file?: File }): void {
        this.planetService
            .createPlanet(event.planet, event.file)
            .pipe(
                tap((planet) =>
                    this.scrollToTheLastPlanet(planet.id.toString())
                )
            )
            .subscribe({
                next: () => {
                    window.alert('Planet created');
                    this.isCreateModalVisible = false;
                },
                error: (err) => console.error(err),
            });
    }

    onSearchIconFocus() {
        this.searchInput.nativeElement.focus();
    }

    trackByPlanetId(index: number, planet: Planet): number {
        return planet.id ?? index;
    }

    private checkScreenSize(): void {
        const width = window.innerWidth;

        this.isVisibleOnDesktopScreen = width > 999;
        this.isMobile = width < 601;

        if (!this.isVisibleOnDesktopScreen) {
            this.toggleView = 'grid';
        }
    }

    private scrollToTheLastPlanet(planetId: string) {
        const attemptScroll = () => {
            const lastElement = document.getElementById(planetId);
            if (lastElement) {
                lastElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                });
            } else {
                requestAnimationFrame(attemptScroll);
            }
        };

        requestAnimationFrame(attemptScroll);
    }
}
