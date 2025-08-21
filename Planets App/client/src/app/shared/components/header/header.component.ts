import { Component, Input } from '@angular/core';

@Component({
    selector: 'pl-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    @Input() title!: string;
}
