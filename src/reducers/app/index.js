import Log from '@/services/log';
import { ACTIONS } from './action';

export default (state = {
  showDialog: false,
  showAlert: false,
  dialogContent: '',
  closeDialogFn: () => { },
  buttonDialogFn: () => { },
}, action) => {
  Log.Info('Redux action', action);
  switch (action.type) {
    case ACTIONS.SHOW_DIALOG: {
      if (action.payload) {
        return {
          ...state,
          showDialog: true,
          dialogContent: action.payload,
          buttonDialogFn: action.buttonDialogFn || function buttonDialogFn() { },
          closeDialogFn: action.closeDialogFn || function closeDialogFn() { },
          dialogTitle: action.title || '',
        };
      }
      return state;
    }
    case ACTIONS.CLOSE_DIALOG: {
      return {
        ...state,
        showDialog: false,
        buttonDialogFn: () => { },
        closeDialogFn: () => { },
      };
    }
    default: {
      return state;
    }
  }
};
