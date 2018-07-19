import {Component, OnInit} from '@angular/core';
import {IngresoEgresoService} from '../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(public ingresoEgresoService: IngresoEgresoService) {
  }

  ngOnInit() {
    // Se llama acá porque es aquí donde el usuario esta autenticado
    this.ingresoEgresoService.initIngresoEgresoListener();

  }

}
