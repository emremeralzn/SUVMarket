import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]',
  standalone: true
})
export class OnlyNumberDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    let value = inputElement.value;
    
    // Sadece rakamları bırak
    value = value.replace(/[^0-9]/g, '');
    
    // Input'un değerini güncelle
    inputElement.value = value;
    
    // FormControl varsa güncelle
    const event2 = new Event('input', { bubbles: true });
    inputElement.dispatchEvent(event2);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    // İzin verilen tuşlar: rakamlar (0-9), Backspace, Delete, Tab, Arrow keys, Home, End
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End'
    ];
    
    const isNumber = event.key >= '0' && event.key <= '9';
    const isAllowedKey = allowedKeys.includes(event.key);
    
    // Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X gibi kombinasyonlara izin ver
    const isCtrlKey = event.ctrlKey || event.metaKey;
    
    if (!isNumber && !isAllowedKey && !isCtrlKey) {
      event.preventDefault();
    }
  }
}
