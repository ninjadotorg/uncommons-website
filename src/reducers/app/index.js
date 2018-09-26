import Log from '@/services/log';

export default (state = {}, action) => {
  Log.Info('Redux action', action);
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
