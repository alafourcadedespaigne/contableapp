import {Component, OnDestroy, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {IngresoEgreso} from '../ingreso-egreso.model';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {IngresoEgresoService} from '../ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>,
              public ingresoEgresoService: IngresoEgresoService) {
  }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
      .subscribe(ingresoEgreso => {
        this.items = ingresoEgreso.items;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  borrarItem(item: IngresoEgreso) {
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
      .then(() => {
        Swal('Eliminado', item.descripcion, 'success');
      });
  }

}
