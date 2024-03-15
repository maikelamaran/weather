import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { CommonModule } from '@angular/common';
import { Ciudad } from '../../interfaces/ciudad.interface';
import { WeatherService } from '../../services/weather.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { distinct } from 'rxjs';


@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,ReactiveFormsModule,CommonModule,MatSelectModule,MatAutocompleteModule ],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.css',
})
export class InputSearchComponent  {
  @Output() onEnter: EventEmitter<{ ciudad: string; unidad: string }> =
    new EventEmitter();
  // debouncer: Subject<string> = new Subject();
 
  ciudad: string = '';
  unidad: string = '';
  termino:string='';

  //sugerencias
  
  inputControl = new FormControl();
 sugerencias: string[] = [];
//sugerencias: Ciudad[] = [];
   
    formulario = new FormGroup({
      ciudad: new FormControl('', Validators.required),
      unidad: new FormControl('', Validators.required),
   
    });
  
  emitirDatos() {
    if (this.formulario.valid) {
      this.onEnter.emit({ ciudad: this.ciudad, unidad: this.unidad });
    } else {
      console.log('El formulario no es válido');
    }
  }

  //sugerencias
  constructor(private ciudadService: WeatherService) {
    this.inputControl.valueChanges.subscribe(query => {
      this.buscarCiudades(query);
    });
  }

  buscarCiudades(query: string) {
    if (query.trim() === '') {
      this.sugerencias = [];
      return;
    }

    this.ciudadService.getciudades(query).subscribe(sugerencias => { 
      this.sugerencias = sugerencias.filter((ciudad, index, self) =>
      index === self.findIndex(c => c.name === ciudad.name)
    ).map<string>((resp)=>{
       return resp.name;
      }).slice(0, 4);
    });
  }
}
  

