import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-input-search-lat',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,ReactiveFormsModule,CommonModule,MatSelectModule],
  templateUrl: './input-search-lat.component.html',
  styleUrl: './input-search-lat.component.css',
})
export class InputSearchLatComponent {
  @Output() onEnter: EventEmitter<{ latitud: string; longitud: string }> =
    new EventEmitter();

  latitud: string = '';
  longitud: string = '';

  formulario = new FormGroup({
    latitud: new FormControl('', Validators.required),
    longitud: new FormControl('', Validators.required),
  });

  emitirDatos() {
    if (this.formulario.valid) {
      this.onEnter.emit({ latitud: this.latitud, longitud: this.longitud });
    } else {
      console.log('El formulario no es válido');
    }
  }
}
