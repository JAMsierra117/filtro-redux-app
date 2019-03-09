import { Component, OnInit } from '@angular/core';

import * as fromFiltroActions from '../../filter/filter.actions';
import * as fromTodoActions from '../todo.actions';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  filtrosValidos: fromFiltroActions.filtrosValidos[] = ['todos', 'completados', 'pendientes'];

  filtroActual: fromFiltroActions.filtrosValidos;

  pendientes: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(state => {
      this.contarPendientes(state.todos);
      this.filtroActual = state.filter;
    })
  }

  cambiarFiltro(nuevoFiltro: fromFiltroActions.filtrosValidos) {
    const accion = new fromFiltroActions.SetFilterAction(nuevoFiltro);
    this.store.dispatch(accion);
  }

  contarPendientes(todos: Todo[]) {
    this.pendientes = todos.filter( todo => !todo.completado).length;
  }

  limpiarCompletadas() {
    const accion = new fromTodoActions.EliminarCompletadasTodoAction();
    this.store.dispatch(accion);
  }

}
