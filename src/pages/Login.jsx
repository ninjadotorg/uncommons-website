import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { saveAddress, login } from '@/reducers/auth/action';
import { withStyles } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import ethUtil from 'ethereumjs-util';
import sigUtil from 'eth-sig-util';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoginDialog from '@/components/LoginDialog';

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
    login: PropTypes.func.isRequired,
    saveAddress: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isSigning: false,
      isInstalledMetamask: false,
      openDialog: false,
      dialogTitle: '',
      dialogContent: '',
      dialogSuccess: false,
      needReload: false,
    };
    document.title = 'Auth - Uncommons blockchain';
    if (web3 && web3.currentProvider.isMetaMask) {
      this.state.isInstalledMetamask = true;
      this.checkAccount();
    }
  }

  checkAccount = () => {
    if (web3.eth.accounts.length) {
      const { saveAddress: propsSaveAddress } = this.props;
      propsSaveAddress(web3.eth.accounts[0]);
    }
  }

  loginMetamask = () => {
    this.checkAccount();
    this.setState({ isSigning: true });

    const { auth } = this.props;
    const { isInstalledMetamask } = this.state;
    const from = auth.address;

    if (!isInstalledMetamask) {
      // not installed Metamask
      return this.setState({
        isSigning: false, openDialog: true, dialogTitle: 'Error', dialogContent: 'Install Metamask first', needReload: true,
      });
    }

    if (!from) {
      // not unlocked account
      return this.setState({
        isSigning: false, openDialog: true, dialogTitle: 'Error', dialogContent: 'Unlock your account at Metamask and click login again.', needReload: true,
      });
    }

    const msg = ethUtil.bufferToHex(Buffer.from('Click sign below to authenticate with Uncommons.', 'utf8'));

    web3.currentProvider.sendAsync({
      method: 'personal_sign',
      params: [msg, from],
      from,
    }, (err, result) => {
      // handle error
      if (err) {
        return this.setState({
          isSigning: false, openDialog: true, dialogTitle: 'Error', dialogContent: err.toString(), needReload: false,
        });
      }
      if (result.error) {
        return this.setState({
          isSigning: false, openDialog: true, dialogTitle: 'Error', dialogContent: result.error.message.toString(), needReload: false,
        });
      }

      const msgParams = { data: msg };
      msgParams.sig = result.result;
      const recovered = sigUtil.recoverPersonalSignature(msgParams);

      if (recovered === from) {
        return this.setState({
          isSigning: false, openDialog: true, dialogTitle: 'Auth', dialogContent: 'Success!', dialogSuccess: true, needReload: false,
        });
      }
      return this.setState({
        isSigning: false, openDialog: true, dialogTitle: 'Error', dialogContent: `SigUtil Failed to verify signer when comparing ${recovered.result} to ${from}`, needReload: false,
      });
    });
    return true;
  }

  closeDialog = () => {
    const { login: propsLogin } = this.props;
    const { dialogSuccess, needReload } = this.state;
    this.setState({ openDialog: false });
    if (dialogSuccess) {
      propsLogin();
    } else if (needReload) {
      window.location.reload();
    }
  }

  render() {
    const { classes, auth } = this.props;
    const {
      isSigning, openDialog, dialogTitle, dialogContent,
    } = this.state;

    return (
      <div className="uk-container">
        <LoginDialog
          open={openDialog}
          title={dialogTitle}
          content={dialogContent}
          onClose={this.closeDialog}
        />
        <div className="login-page">
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <div className="login-button-box">
                <div onClick={this.loginMetamask}>
                  <Button color="primary" size="large" fullWidth className={classes.buttonMetamask} disabled={isSigning}>
                    {isSigning ? <CircularProgress size={17} style={{ color: '#ffffff' }} /> : 'Login with Metamask'}
                  </Button>
                  {isSigning ? <div>Taking a while? Check MetaMask and click Sign</div> : ''}
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
}), ({ saveAddress, login }))(withStyles(styles)(Login));
