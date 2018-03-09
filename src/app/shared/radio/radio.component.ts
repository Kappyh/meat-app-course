import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { RadioOption } from './radio-option.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  @Input() options: RadioOption[];
  value: any;
  onChange: any;

  constructor() { }

  ngOnInit() {
  }

  public setValue(value: any): void {
    this.value = value;
    this.onChange(this.value);
  }

  /* Métodos implementados da interface ControlValueAccessor */

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // não obrigatorio na aula, nao foi setado, verifica se usuario interagiu com component
  registerOnTouched(fn: any): void { }
  // não obrigatorio na aula,nao foi setado,seta o estado disable no componente
  setDisabledState?(isDisabled: boolean): void { }

  /* Métodos implementados da interface ControlValueAccessor */

}
