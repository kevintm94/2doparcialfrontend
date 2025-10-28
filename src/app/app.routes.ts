import { Routes } from '@angular/router';
import { Empleados } from './empleados/empleados';

export const routes: Routes = [
    {
        path: 'empleados',
        component: Empleados,
        children: []
    }
];
