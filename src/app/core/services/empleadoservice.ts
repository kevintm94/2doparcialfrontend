import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Empleado {
  id: number,
  nombre: string,
  apellido: string,
  correo: string,
  salario: number
}

@Injectable({
  providedIn: 'root'
})
export class Empleadoservice {
  
  private base = 'http://127.0.0.1:8000/api/empleados';

  constructor(private http:HttpClient) {}

  listaEmpleados():Observable<Empleado[]>{
    return this.http.get<any[]>(this.base);
  }
  agregarEmpleado(datos: any):Observable<any> {
    const body = {nombre : datos.nombre, apellido: datos.apellido, correo: datos.correo, salario: datos.salario};
    console.log(body);
    return this.http.post<any>(this.base, body);
  }
  actualizarEmpleado(empleado: any, id: number):Observable<void>{
    const body = {nombre : empleado.nombre, apellido: empleado.apellido, correo: empleado.correo, salario: empleado.salario};
    return this.http.put<void>(`${this.base}/${id}`, body);
  }
  borrarEmpleado(id:number):Observable<void>{
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
