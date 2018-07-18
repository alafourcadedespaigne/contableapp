import * as fromUi from './ui.accions';


export interface State {
  isloading: boolean;
}

const initState: State = {
  isloading: false
};

export function uiReducer(state = initState, action: fromUi.acciones) {

  switch (action.type) {
    case fromUi.ACTIVAR_LOADING:
      return {
        isloading: true
      };
    case fromUi.DESACTIVAR_LOADING:
      return {
        isloading: false
      };
    default:
      return state;

  }

}
