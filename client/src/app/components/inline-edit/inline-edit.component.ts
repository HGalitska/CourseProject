import {Component, Output, Provider, forwardRef, EventEmitter, ElementRef, ViewChild, Renderer, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InlineEditComponent),
  multi: true
};

@Component({
  selector: 'app-inline-edit',
  providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['./inline-edit.component.css'],
  templateUrl: './inline-edit.component.html'
})

export class InlineEditComponent implements ControlValueAccessor, OnInit{

  // inline edit form control
  @ViewChild('inlineEditControl') inlineEditControl;
  @Output() public onSave:EventEmitter<any> = new EventEmitter();

  private _value:string = '';
  private preValue:string = '';
  private editing:boolean = false;

  public onChange:any = Function.prototype;
  public onTouched:any = Function.prototype;

  get value(): any { return this._value; };

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  constructor(element: ElementRef, private _renderer:Renderer) {}

  writeValue(value: any) {
    this._value = value;
  }

  public registerOnChange(fn:(_:any) => {}):void {this.onChange = fn;}

  public registerOnTouched(fn:() => {}):void {this.onTouched = fn;};

  // Method to display the inline edit form and hide the <a> element
  edit(value){
    this.preValue = value;  // Store original value in case the form is cancelled
    this.editing = true;

    // Automatically focus input
    setTimeout( _ => this._renderer.invokeElementMethod(this.inlineEditControl.nativeElement, 'focus', []));
  }

  // Method to display the editable value as text and emit save event to host
  onSubmit(value){
    this.onSave.emit(value);
    this.editing = false;
  }

  // Method to reset the editable value
  cancel(value:any){
    this._value = this.preValue;
    this.editing = false;
  }

  ngOnInit(){}

}
