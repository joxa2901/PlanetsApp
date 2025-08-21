import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
    transform(value: string | null, args: string | null): unknown {
        if (!args) return value;

        value = (value || '').toString();
        const re = new RegExp(args, 'igm');
        value = value.replace(re, `<span class="highlighted-text">$&</span>`);

        return value;
    }
}
