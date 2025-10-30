import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Empleado, Empleadoservice } from '../core/services/empleadoservice';


@Component({
  selector: 'app-empleados',
  imports: [CommonModule],
  templateUrl: './empleados.html',
  styleUrl: './empleados.scss',
})
export class Empleados {
  empleados:any[]=[];
  empleadoSelected:number = 0;

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
  
  editarEmpleado(empleado:Empleado):void{
    this.empleadoSelected = empleado.id;
    console.log(this.empleadoSelected);
  }
  
  actualizarEmpleado(datos: any):void {
    this.empleadoService.actualizarEmpleado(datos, this.empleadoSelected).subscribe(
      respuesta => {
        this.empleados = this.empleados.map(item => {
          if (item.id == this.empleadoSelected) {
            return datos;
          }
          return item;
        });
      },
      error => {
        console.error('Error al registrar:', error);
      }
    );
  }

  registrarEmpleado(datos: any):void {
    this.empleadoService.agregarEmpleado(datos).subscribe(
      respuesta => {
        this.empleados.push(respuesta);
        console.log('Registro exitoso:', respuesta);
      },
      error => {
        console.error('Error al registrar:', error);
      }
    );
  }

  eliminarEmpleado(id: number): void {
    const indice = 0;
    if (confirm('¿Esta seguro de eliminar el empleado?')) {
      this.empleadoService.borrarEmpleado(id).subscribe(
        () => {
          this.empleados = this.empleados.filter(item => item.id != id);
        }
      );
    }
    console.log(id);
  }
}
