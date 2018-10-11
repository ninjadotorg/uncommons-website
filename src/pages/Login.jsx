import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { login, logging, logged } from '@/reducers/auth/action';
import { fullFlow } from '@/reducers/metamask/action';
import { withStyles } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import ethUtil from 'ethereumjs-util';
import sigUtil from 'eth-sig-util';
import CircularProgress from '@material-ui/core/CircularProgress';
import { showDialog, internalAPI } from '@/reducers/app/action';
import cryptoRandomString from 'crypto-random-string';

const styles = theme => ({
  buttonMetamask: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[400],
    '&:hover': {
      backgroundColor: deepOrange[500],
    },
  },
});

class Login extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    metamask: PropTypes.object.isRequired,
    fullFlowMetamask: PropTypes.func.isRequired,
    authLogin: PropTypes.func.isRequired,
    authLogging: PropTypes.func.isRequired,
    authLogged: PropTypes.func.isRequired,
    appShowDialog: PropTypes.func.isRequired,
    appInternalAPI: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    document.title = 'Auth - Uncommons blockchain';
    const { fullFlowMetamask, auth } = this.props;
    fullFlowMetamask(auth.isLogged);
  }

  login = () => {
    const {
      fullFlowMetamask,
      metamask,
      authLogin,
      authLogging,
      authLogged,
      appShowDialog,
      appInternalAPI,
    } = this.props;
    authLogging();
    fullFlowMetamask(true);
    if (metamask.unlocked) {
      const msg = ethUtil.bufferToHex(Buffer.from(
        `${'Click sign below to authenticate with Uncommons.'}
        ${'Random string for sercurity:'} ${cryptoRandomString(7)}`,
        'utf8',
      ));

      const from = metamask.address;

      metamask.web3.currentProvider.sendAsync({
        method: 'personal_sign',
        params: [msg, from],
        from,
      }, (err, result) => {
        authLogged();
        if (err) {
          appShowDialog(err.toString());
          return;
        }
        if (result.error) {
          appShowDialog(result.error.message.toString());
          return;
        }

        const msgParams = { data: msg };
        msgParams.sig = result.result;
        const recovered = sigUtil.recoverPersonalSignature(msgParams);

        if (metamask.web3.utils.toChecksumAddress(recovered) === from) {
          appInternalAPI({
            path: '/user/sign-up',
            method: 'POST',
            data: {
              uncommons_address: from,
              uncommons_signed_hash: result.result,
              uncommons_text: msg.substr(2),
            },
            successFn: (res) => {
              authLogin(from, res ?.data ?.passpharse || '');
            },
            errorFn: () => {
              appShowDialog('Have something wrong!');
            },
          });
          authLogin(from, '');
        } else {
          appShowDialog('Have something wrong!');
        }
      });
      return true;
    } else { // eslint-disable-line
      authLogged();
    }
    return true;
  }

  render() {
    const { classes, auth } = this.props;
    return (
      <div className="uk-container">
        <div className="login-page">
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <div className="login-button-box">
                <div onClick={this.login}>
                  <Button
                    color="primary"
                    size="large"
                    fullWidth
                    className={classes.buttonMetamask}
                    disabled={auth.isLogging}
                  >
                    {
                      auth.isLogging
                        ? <CircularProgress size={17} style={{ color: '#ffffff' }} />
                        : 'Login with Metamask'
                    }
                  </Button>
                  {
                    auth.isLogging
                      ? (
                        <div style={{
                          margin: '10px 0',
                        }}
                        >
                          Taking a while? Check MetaMask and click Sign
                        </div>
                      )
                      : ''
                  }
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              {auth.address}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
  metamask: state.metamask,
}), ({
  fullFlowMetamask: fullFlow,
  authLogin: login,
  authLogging: logging,
  authLogged: logged,
  appShowDialog: showDialog,
  appInternalAPI: internalAPI,
}))(withStyles(styles)(Login));
