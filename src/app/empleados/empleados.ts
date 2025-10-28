import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Empleadoservice } from '../core/services/empleadoservice';

@Component({
  selector: 'app-empleados',
  imports: [CommonModule],
  templateUrl: './empleados.html',
  styleUrl: './empleados.scss',
})
export class Empleados {
  empleados:any[]=[];

  constructor(private empleadoService:Empleadoservice) {
    this.listarEmpleados();
  }

  listarEmpleados():void {
    this.empleadoService.listaEmpleados().subscribe({
      next:(data) => {
        this.empleados = data
        console.log(this.empleados);
      },
      error:(err)=>console.error('error al cargar los empleados', err)
    })
  }
}
