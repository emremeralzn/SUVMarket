import { Directive, Input, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMinMaxLength]',
  standalone: true
})
export class MinMaxLengthDirective {
  @Input() minLength!: number;
  @Input() maxLength!: number;

  constructor(@Optional() private ngControl: NgControl) { }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (this.minLength && value.length < this.minLength) {
      this.ngControl.control?.setErrors({ 
        minLength: { 
          requiredLength: this.minLength, 
          actualLength: value.length 
        } 
      });
    } else if (this.maxLength && value.length > this.maxLength) {
      input.value = value.substring(0, this.maxLength);
      this.ngControl.control?.setValue(input.value);
      this.ngControl.control?.setErrors(null);
    } else {
      this.ngControl.control?.setErrors(null);
    }
  }
}
