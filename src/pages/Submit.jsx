import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import ethUtil from 'ethereumjs-util';
import sigUtil from 'eth-sig-util';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

class Submit extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    document.title = 'Submit proposal - Uncommons blockchain';
  }


  submit = () => {
    const { auth } = this.props;
    const from = auth.address;

    const data = {
      name: 'test',
      description: 'test',
    };

    const msg = ethUtil.bufferToHex(Buffer.from(`Sign your proposal\n\r${JSON.stringify(data)}`, 'utf8'));

    web3.currentProvider.sendAsync({
      method: 'personal_sign',
      params: [msg, from],
      from,
    }, (err, result) => {
      // handle error
      if (err) {
        return this.setState({
          isLoading: false, openDialog: true, dialogTitle: 'Error', dialogContent: err.toString(), needReload: false,
        });
      }
      if (result.error) {
        return this.setState({
          isLoading: false, openDialog: true, dialogTitle: 'Error', dialogContent: result.error.message.toString(), needReload: false,
        });
      }

      const msgParams = { data: msg };
      msgParams.sig = result.result;
      const recovered = sigUtil.recoverPersonalSignature(msgParams);

      if (recovered === from) {
        axios({
          uri: 'http://localhost:3000/api/Proposals',
          data: {
            ...data,
            sign: msgParams.sig,
          },
          method: 'post',
        });

        return this.setState({
          isLoading: false, openDialog: true, dialogTitle: 'Auth', dialogContent: 'Success!', dialogSuccess: true, needReload: false,
        });
      }
      return this.setState({
        isLoading: false, openDialog: true, dialogTitle: 'Error', dialogContent: `SigUtil Failed to verify signer when comparing ${recovered.result} to ${from}`, needReload: false,
      });
    });
    return true;
  }

  render() {
    return (
      <div className="submit-page">
        <div
          className="uk-container"
          style={{
            zIndex: 1,
            position: 'relative',
          }}
        >
          <div className="submit-page-header">
            Submit a proposal
          </div>
          <div className="submit-page-content">
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <form>
                  <fieldset className="uk-fieldset">
                    <legend className="uk-legend">1. ABOUT YOUR DAPP</legend>
                    <div className="uk-margin">
                      <label htmlFor="dapp-name">
                        <span>Name of Dapp</span>
                        <input className="uk-input" type="text" placeholder="Prediction *" id="dapp-name" />
                      </label>
                    </div>
                    <div className="uk-margin">
                      <label htmlFor="description">
                        <span>WHAT YOUR DAPP DOES?</span>
                        <textarea className="uk-textarea" rows="5" placeholder="Tell us in 100 characters *" id="description" />
                      </label>
                    </div>
                    <div className="uk-margin">
                      <label htmlFor="why-we-will-love">
                        <span>WHY WE’LL LOVE YOUR DAPP?</span>
                        <textarea className="uk-textarea" rows="5" placeholder="Try to impress us *" id="why-we-will-love" />
                      </label>
                    </div>
                    <div className="uk-margin">
                      <label htmlFor="why-you-want-build">
                        <span>WHY YOU WANT TO BUILD IT?</span>
                        <textarea className="uk-textarea" rows="5" placeholder="Tell us the story behind *" id="why-you-want-build" />
                      </label>
                    </div>
                    <div className="uk-margin">
                      <label htmlFor="what-cool">
                        <span>WHAT’S COOL ABOUT WHAT YOU ARE DOING?</span>
                        <textarea className="uk-textarea" rows="3" placeholder="" id="what-cool" />
                      </label>
                    </div>
                    <div className="uk-margin">
                      <label htmlFor="how-far">
                        <span>HOW FAR ALONG ARE YOU?</span>
                        <textarea className="uk-textarea" rows="3" placeholder="" id="how-far" />
                      </label>
                    </div>
                  </fieldset>
                  <fieldset className="uk-fieldset">
                    <legend className="uk-legend">2. SHIPPING DATE</legend>
                    <div className="uk-margin">
                      <Grid container spacing={24}>
                        <Grid item xs={3}>
                          <label htmlFor="ship-date">
                            <span>SHIP DATE</span>
                            <input className="uk-input" type="text" placeholder="09/12/2018" id="ship-date" />
                          </label>
                        </Grid>
                        <Grid item xs={9}>
                          <label htmlFor="amount">
                            <span>HOW MUCH WEEKLY GIFT YOU REQUIRE FOR DEVELOPMENT AND USERS?</span>
                            <input className="uk-input" type="text" placeholder="" id="amount" />
                          </label>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="uk-margin">
                      <label htmlFor="builder-introduce">
                        <span>INTRODUCE YOUR TEAM WITH AN AMUSING ANECODE</span>
                        <input className="uk-input" type="text" placeholder="" id="builder-introduce" />
                      </label>
                    </div>
                  </fieldset>
                  <fieldset className="uk-fieldset">
                    <legend className="uk-legend">3. BUILDER INFO</legend>
                    <div className="uk-margin">
                      <label htmlFor="builder-name">
                        <span>Name of Builder</span>
                        <input className="uk-input" type="text" placeholder="Input" id="builder-name" />
                      </label>
                    </div>
                    <div className="uk-margin">
                      <label htmlFor="builder-prev">
                        <span>YOUR FAVORITE THINGS YOU’VE BUILT</span>
                        <span className="sub">(Please include links if available)</span>
                        <input className="uk-input" type="text" placeholder="Input" id="builder-prev" />
                      </label>
                    </div>
                  </fieldset>
                  <fieldset className="uk-fieldset policy-block">
                    <div className="uk-margin">
                      <label htmlFor="policy">
                        <input className="uk-checkbox" type="checkbox" id="policy" />
                        I agree to the Policy
                      </label>
                    </div>
                  </fieldset>
                  <div className="submit-button-block">
                    <Button className="button-app-1" onClick={this.submit}>Submit your proposal</Button>
                  </div>
                </form>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

const styles = () => { };

export default connect(state => ({
  auth: state.auth,
}), null)(withStyles(styles)(Submit));
