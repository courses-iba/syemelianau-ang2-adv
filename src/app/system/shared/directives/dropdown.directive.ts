import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    dropdown: HTMLElement;
    isOpen: boolean;

    constructor(private element: ElementRef) {
        this.dropdown = this.element.nativeElement;
        this.isOpen = false;
    }

    @HostListener('click')
    toggle(): void {
        this.isOpen = !this.isOpen;
        this.isOpen
            ? this.dropdown.classList.add('open')
            : this.dropdown.classList.remove('open');
    }

    @HostListener('window:click', ['$event.target'])
    close(targetElement: HTMLElement): void {
        if (this.isOpen && !this.isBelong(targetElement)) {
            this.isOpen = false;
            this.dropdown.classList.remove('open');
        }
    }

    isBelong(element: HTMLElement): boolean {
        return element.parentNode === this.dropdown || element.parentNode.parentNode === this.dropdown;
    }
}
