import {
  Directive,
  HostListener,
  ElementRef,
  forwardRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Directive({
  selector: '[appNumberFormat]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberFormatDirective),
      multi: true
    }
  ]
})
export class NumberFormatDirective implements ControlValueAccessor {
  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    const numericValue = this.parseValue(value);
    this.onChange(numericValue);
    this.format(numericValue);
  }

  @HostListener('blur')
  onBlur() {
    this.onTouched();
  }

  writeValue(value: any): void {
    this.format(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private format(value: number | null): void {
    const el = this.el.nativeElement;
    if (value == null || isNaN(value)) {
      el.value = '';
      return;
    }
    el.value = new Intl.NumberFormat('tr-TR').format(value);
  }

  private parseValue(value: string): number {
    const plain = value.replace(/[.\s]/g, '').replace(',', '.');
    const parsed = parseFloat(plain);
    return isNaN(parsed) ? 0 : parsed;
  }
}