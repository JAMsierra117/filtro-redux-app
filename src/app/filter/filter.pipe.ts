import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../todo/model/todo.model';

import * as fromFilterAction from '../filter/filter.actions'

@Pipe({
  name: 'filterTodo'
})
export class FilterPipe implements PipeTransform {

  transform(todos: Todo[], filter: fromFilterAction.filtrosValidos): Todo[] {
    switch(filter){
      case "completados":
        return todos.filter( todos => todos.completado);
      case "pendientes":
        return todos.filter( todos => !todos.completado);
      default:
        return todos;
    }    
  }

}
