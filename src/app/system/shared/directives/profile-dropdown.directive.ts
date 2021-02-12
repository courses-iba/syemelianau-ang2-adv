import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appProfileDropdown]'
})
export class ProfileDropdownDirective {
    dropdown: boolean;

    constructor(private element: ElementRef) {
        this.dropdown = false;
    }

    @HostListener('click')
    toggle(): void {
        this.dropdown = !this.dropdown;
        this.dropdown
            ? this.element.nativeElement.classList.add('open')
            : this.element.nativeElement.classList.remove('open');
    }
}
