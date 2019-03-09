import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { ToggleTodoAction, EditarTodoAction, EliminarTodoAction } from '../todo.actions';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('txtInputFisico') txtInputFisico: ElementRef; 

  chkField: FormControl;
  txtInput: FormControl;

  editando: boolean;

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.chkField = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);
    this.chkField.valueChanges
      .subscribe( () => {
        const accion = new ToggleTodoAction(this.todo.id);
        this.store.dispatch(accion);
      });
    
  }

  editar() {
    this.editando = true;
    setTimeout( () => {
      this.txtInputFisico.nativeElement.select();
    },1);
    
  }

  terminarEdit() {
    
    this.editando = false;

    if( this.txtInput.invalid) return;

    if(this.txtInput.value === this.todo.texto) return;
    
    const accion = new EditarTodoAction(this.todo.id, this.txtInput.value);
    this.store.dispatch(accion);

  }

  eliminar() {
    this.editando = false;

    const accion = new EliminarTodoAction(this.todo.id);
    this.store.dispatch(accion);
  }

}