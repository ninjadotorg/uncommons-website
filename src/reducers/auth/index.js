import { ACTIONS } from './action';
import local from '@/services/local';

export default (state = {
  isLogged: local.get('auth_logged') || false,
  address: local.get('auth_address') || '',
  token: local.get('auth_token') || '',
}, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN: {
      local.save('auth_logged', true);
      return {
        ...state,
        isLogged: true,
      };
    }

    case ACTIONS.LOGOUT: {
      local.save('auth_logged', false);
      local.save('auth_address', '');
      local.save('auth_token', '');
      return {
        ...state,
        isLogged: false,
      };
    }

    case ACTIONS.SAVE_ADDRESS: {
      local.save('auth_address', action.payload);
      return {
        ...state,
        address: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
