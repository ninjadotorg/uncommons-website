import { push } from 'connected-react-router';

export const ACTIONS = {
  LOGIN: 'AUTH_LOGIN',
  LOGOUT: 'AUTH_LOGOUT',
  SAVE_ADDRESS: 'AUTH_SAVE_ADDRESS',
};

export const login = () => ({ type: ACTIONS.LOGIN });
export const logout = () => (dispatch) => {
  dispatch({ type: ACTIONS.LOGOUT });
  dispatch(push('/login'));
};
export const saveAddress = address => ({ type: ACTIONS.SAVE_ADDRESS, payload: address });
