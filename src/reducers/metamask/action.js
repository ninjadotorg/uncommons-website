import { ACTIONS as APP_ACTIONS } from '@/reducers/app/action';
import NeedInstallMetamask from '@/components/DialogContent/NeedInstallMetamask';
import NeedUnlockMetamask from '@/components/DialogContent/NeedUnlockMetamask';
import Log from '@/services/log';
import Web3 from 'web3';

export const ACTIONS = {
  METAMASK_DETECTING: 'METAMASK_DETECTING',
  METAMASK_DETECTED: 'METAMASK_DETECTED',
  METAMASK_UNLOCKED: 'METAMASK_UNLOCKED',
};

export const needInstall = () => (dispatch) => {
  dispatch({
    type: APP_ACTIONS.SHOW_DIALOG,
    payload: NeedInstallMetamask,
    dialogType: NeedInstallMetamask.type,
  });
};

export const needUnlock = () => (dispatch) => {
  dispatch({
    type: APP_ACTIONS.SHOW_DIALOG,
    payload: NeedUnlockMetamask,
    dialogType: NeedUnlockMetamask.type,
  });
};

export const detect = () => async (dispatch) => {
  dispatch({ type: ACTIONS.METAMASK_DETECTING });
  let installed = false;
  if (web3 && web3.currentProvider.isMetaMask) {
    installed = true;
  }
  let web3App = null;
  if (window.ethereum) {
    web3App = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else {
    web3App = new Web3();
    web3App.setProvider(web3.currentProvider);
  }

  dispatch({ type: ACTIONS.METAMASK_DETECTED, payload: installed, web3: web3App });

  return {
    installed,
    web3: web3App,
  };
};

const callUnclock = (callNeedUnlock, dispatch) => {
  if (callNeedUnlock) {
    dispatch(needUnlock());
  } else {
    Log.Info('.');
  }
};

const checkAccounts = (web3, callNeedUnlock, dispatch, loop = false) => {
  web3.eth.getAccounts()
    .then((r) => {
      if (!r.length > 0) {
        if (!loop) {
          callUnclock(callNeedUnlock, dispatch);
        }
        setTimeout(() => checkAccounts(web3, callNeedUnlock, dispatch, true), 1000);
      } else {
        dispatch({ type: ACTIONS.METAMASK_UNLOCKED, address: r[0] });
      }
    }).catch(() => {
      const { accounts } = web3.eth;
      if (!accounts.length > 0) {
        if (!loop) {
          callUnclock(callNeedUnlock, dispatch);
        }
        setTimeout(() => checkAccounts(web3, callNeedUnlock, dispatch, true), 1000);
      } else {
        dispatch({ type: ACTIONS.METAMASK_UNLOCKED, address: accounts[0] });
      }
    });
};

export const fullFlow = (callNeedUnlock = true) => async (dispatch) => {
  const { installed, web3 } = await detect(true)(dispatch);
  if (!installed) {
    dispatch(needInstall());
  } else {
    checkAccounts(web3, callNeedUnlock, dispatch);
  }
};
