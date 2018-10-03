export const ACTIONS = {
  SHOW_ALERT: 'SHOW_ALERT',
  CLOSE_ALERT: 'CLOSE_ALERT',
  SHOW_DIALOG: 'SHOW_DIALOG',
  CLOSE_DIALOG: 'CLOSE_DIALOG',
};

export const DIALOG = {
  STATUS: {
    SUCCESS: 'SUCCESS',
    WARNING: 'WARNING',
    ERROR: 'ERROR',
  },
};

export const setNotFound = () => ({ type: 'APP_NOTFOUND_SET' });
export const clearNotFound = () => ({ type: 'APP_NOTFOUND_CLEAR' });
