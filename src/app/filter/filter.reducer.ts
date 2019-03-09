import * as fromFilter from './filter.actions'

const estadoInicial: fromFilter.filtrosValidos = 'todos';


export function filterReducer( state = estadoInicial, 
                                accion: fromFilter.acciones): fromFilter.filtrosValidos {
    switch(accion.type) {
        case fromFilter.SET_FILTRO:
            return accion.filtro;
        default:
            return state;
    }
}