import Log from '@/services/log';

const DEBUG = true;

export default (state = {}, action) => {
  if (DEBUG) {
    Log.Info(action);
  }
  switch (action) {
    case '': {
      document.title = 'Uncommons blockchain';
      return state;
    }
    default: {
      return state;
    }
  }
};
