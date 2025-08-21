import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Planet } from '../../models/planet';

@Component({
    selector: 'pl-planet-form-modal',
    templateUrl: './planet-form-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetFormModalComponent {
    private _planet!: Planet;
    @Input()
    set planet(value: Planet) {
        this._planet = value;
        if (value) {
            this.patchForm(value);
        }
    }
    get planet(): Planet {
        return this._planet;
    }
    @Input() mode: 'create' | 'edit' = 'create';
    @Output() submitForm = new EventEmitter<{ planet: Planet; file?: File }>();
    @Output() cancel = new EventEmitter<void>();
    planetForm!: FormGroup;
    selectedFile!: File;
    isConfirmationModalVisible = false;

    constructor(private fb: FormBuilder) {
        this.buildForm();
    }
    onFileSelected(event: Event): void {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.selectedFile = fileInput.files[0];
            this.planetForm.patchValue({
                imageUrl: this.selectedFile.name,
                imageName: this.selectedFile.name,
            });
        }
    }
    onSubmit() {
        if (this.planetForm.valid) {
            this.submitForm.emit({
                planet: this.planetForm.value,
                file: this.selectedFile,
            });
        }
    }
    onCancel() {
        if (this.mode === 'create') this.planetForm.reset();
        this.cancel.emit();
    }

    onConfirmationCancel() {
        this.isConfirmationModalVisible = false;
        this.onCancel();
    }

    private buildForm() {
        this.planetForm = this.fb.group({
            planetName: [this.planet?.planetName || '', Validators.required],
            planetColor: [this.planet?.planetColor || ''],
            planetRadiusKM: [this.planet?.planetRadiusKM || ''],
            distFromSun: [this.planet?.distInMillionsKM?.fromSun || ''],
            distFromEarth: [this.planet?.distInMillionsKM?.fromEarth || ''],
            description: [this.planet?.description || ''],
            imageUrl: [this.planet?.imageUrl || ''],
        });
    }

    private patchForm(planet: Planet) {
        this.planetForm.patchValue({
            planetName: planet.planetName,
            planetColor: planet.planetColor,
            planetRadiusKM: planet.planetRadiusKM,
            distFromSun: planet.distInMillionsKM?.fromSun,
            distFromEarth: planet.distInMillionsKM?.fromEarth,
            description: planet.description,
            imageUrl: planet.imageUrl,
        });
    }
}
