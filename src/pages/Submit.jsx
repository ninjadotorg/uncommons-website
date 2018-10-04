import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import axios from 'axios';
// import ethUtil from 'ethereumjs-util';
// import sigUtil from 'eth-sig-util';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import { fullFlow } from '@/reducers/metamask/action';

class Submit extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
    document.title = 'Submit proposal - Uncommons blockchain';
    const { fullFlowMetamask } = this.props;
    fullFlowMetamask(true);
  }


  submit = () => {

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
                        <span>Name of Dapp *</span>
                        <input className="uk-input" type="text" placeholder="Prediction" id="dapp-name" />
                      </label>
                    </div>
                    <div className="uk-margin">
                      <label htmlFor="description">
                        <span>WHAT YOUR DAPP DOES? *</span>
                        <textarea className="uk-textarea" rows="5" placeholder="Tell us in 100 characters" id="description" />
                      </label>
                    </div>
                    <div className="uk-margin">
                      <label htmlFor="why-we-will-love">
                        <span>WHY WE’LL LOVE YOUR DAPP? *</span>
                        <textarea className="uk-textarea" rows="5" placeholder="Try to impress us" id="why-we-will-love" />
                      </label>
                    </div>
                    <div className="uk-margin">
                      <label htmlFor="why-you-want-build">
                        <span>WHY YOU WANT TO BUILD IT? *</span>
                        <textarea className="uk-textarea" rows="5" placeholder="Tell us the story behind" id="why-you-want-build" />
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
                        <Grid item xs={12} md={3}>
                          <label>
                            <span>SHIP DATE *</span>
                            <DayPickerInput
                              component={props => <input className="uk-input" {...props} />}
                              formatDate={formatDate}
                              parseDate={parseDate}
                              placeholder={`${formatDate(new Date())}`}
                              id="ship-date"
                            />
                          </label>
                        </Grid>
                        <Grid item xs={12} md={9}>
                          <label htmlFor="amount">
                            <span>
                              HOW MUCH WEEKLY GIFT YOU REQUIRE FOR DEVELOPMENT AND USERS? *
                            </span>
                            <div className="uk-inline" style={{ width: '100%' }}>
                              <span className="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock" />
                              <input className="uk-input" type="text" id="amount" />
                            </div>
                          </label>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="uk-margin">
                      <label htmlFor="builder-introduce">
                        <span>INTRODUCE YOUR TEAM WITH AN AMUSING ANECODE *</span>
                        <input className="uk-input" type="text" placeholder="" id="builder-introduce" />
                      </label>
                    </div>
                  </fieldset>
                  <fieldset className="uk-fieldset">
                    <legend className="uk-legend">3. BUILDER INFO</legend>
                    <div className="uk-margin">
                      <label htmlFor="builder-name">
                        <span>Name of Builder *</span>
                        <input className="uk-input" type="text" placeholder="What's your name?" id="builder-name" />
                      </label>
                    </div>
                    <div className="uk-margin">
                      <label htmlFor="builder-prev">
                        <span>YOUR FAVORITE THINGS YOU’VE BUILT</span>
                        <span className="sub">(Please include links if available)</span>
                        <input className="uk-input" type="text" placeholder="" id="builder-prev" />
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
}), ({
  fullFlowMetamask: fullFlow,
}))(withStyles(styles)(Submit));
