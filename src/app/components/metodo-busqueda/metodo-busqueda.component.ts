import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-metodo-busqueda',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './metodo-busqueda.component.html',
  styleUrl: './metodo-busqueda.component.css',
})
export class MetodoBusquedaComponent {
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  metodo: string = '';

  
  emitirDatos() {
    this.onEnter.emit(this.metodo);
  }
}
