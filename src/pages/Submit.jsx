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
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';

const ProposalSchema = Yup.object().shape({
  dappName: Yup.string()
    .required('Required'),
  description: Yup.string()
    .required('Required'),
  whyWeWillLove: Yup.string()
    .required('Required'),
  whyYouWantBuild: Yup.string()
    .required('Required'),
  shipDate: Yup.string()
    .required('Required'),
  amount: Yup.string()
    .required('Required'),
  builderIntroduce: Yup.string()
    .required('Required'),
  builderName: Yup.string()
    .required('Required'),
  builderPrev: Yup.string()
    .required('Required'),
  github: Yup.string()
    .required('Required'),
  policy: Yup.bool()
    .oneOf([true], 'Must accept with the Policy')
    .required('Must accept with the Policy'),
});

class Submit extends React.Component {
  static propTypes = {
    fullFlowMetamask: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
    document.title = 'Submit proposal - Uncommons blockchain';
    const { fullFlowMetamask } = this.props;
    fullFlowMetamask(true);
  }

  submit = (values) => {
    console.log(values);
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
                <Formik
                  initialValues={{
                    amount: '',
                    builderIntroduce: '',
                    builderName: '',
                    builderPrev: '',
                    dappName: '',
                    description: '',
                    policy: false,
                    whyWeWillLove: '',
                    whyYouWantBuild: '',
                    github: '',
                    twitter: '',
                  }}
                  validationSchema={ProposalSchema}
                  onSubmit={this.submit}
                >
                  {
                    () => (
                      <Form>
                        <fieldset className="uk-fieldset">
                          <legend className="uk-legend">1. ABOUT YOUR DAPP</legend>
                          <div className="uk-margin">
                            <label htmlFor="dapp-name">
                              <span>Name of Dapp *</span>
                              <Field
                                name="dappName"
                                placeholder="Prediction"
                                id="dapp-name"
                                className="uk-input"
                                type="text"
                              />
                              <div className="uk-error"><ErrorMessage name="dappName" /></div>
                            </label>
                          </div>
                          <div className="uk-margin">
                            <label htmlFor="description">
                              <span>WHAT YOUR DAPP DOES? *</span>
                              <Field
                                name="description"
                                placeholder="Tell us in 100 characters"
                                id="description"
                                component="textarea"
                                className="uk-textarea"
                                rows="5"
                              />
                              <div className="uk-error"><ErrorMessage name="description" /></div>
                            </label>
                          </div>
                          <div className="uk-margin">
                            <label htmlFor="why-we-will-love">
                              <span>WHY WE’LL LOVE YOUR DAPP? *</span>
                              <Field component="textarea" name="whyWeWillLove" className="uk-textarea" rows="5" placeholder="Try to impress us" id="why-we-will-love" />
                              <div className="uk-error"><ErrorMessage name="whyWeWillLove" /></div>
                            </label>
                          </div>
                          <div className="uk-margin">
                            <label htmlFor="why-you-want-build">
                              <span>WHY YOU WANT TO BUILD IT? *</span>
                              <Field component="textarea" name="whyYouWantBuild" className="uk-textarea" rows="5" placeholder="Tell us the story behind" id="why-you-want-build" />
                              <div className="uk-error"><ErrorMessage name="whyYouWantBuild" /></div>
                            </label>
                          </div>
                          <div className="uk-margin">
                            <label htmlFor="what-cool">
                              <span>WHAT’S COOL ABOUT WHAT YOU ARE DOING?</span>
                              <Field component="textarea" name="whatCool" className="uk-textarea" rows="3" placeholder="" id="what-cool" />
                              <div className="uk-error"><ErrorMessage name="whatCool" /></div>
                            </label>
                          </div>
                          <div className="uk-margin">
                            <label htmlFor="how-far">
                              <span>HOW FAR ALONG ARE YOU?</span>
                              <Field component="textarea" name="howFar" className="uk-textarea" rows="3" placeholder="" id="how-far" />
                              <div className="uk-error"><ErrorMessage name="howFar" /></div>
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
                                  <Field
                                    name="shipDate"
                                    render={() => (
                                      <DayPickerInput
                                        component={props => (
                                          <input
                                            className="uk-input"
                                            {...props}
                                          />
                                        )}
                                        formatDate={formatDate}
                                        parseDate={parseDate}
                                        placeholder={`${formatDate(new Date())}`}
                                        id="ship-date"
                                      />)}
                                  />
                                  <div className="uk-error"><ErrorMessage name="shipDate" /></div>
                                </label>
                              </Grid>
                              <Grid item xs={12} md={9}>
                                <label htmlFor="amount">
                                  <span>
                                    HOW MUCH WEEKLY GIFT YOU REQUIRE FOR DEVELOPMENT AND USERS? *
                                  </span>
                                  <div className="uk-inline" style={{ width: '100%' }}>
                                    <span className="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock" />
                                    <Field name="amount" className="uk-input" type="text" id="amount" />
                                    <div className="uk-error"><ErrorMessage name="amount" /></div>
                                  </div>
                                </label>
                              </Grid>
                            </Grid>
                          </div>
                          <div className="uk-margin">
                            <label htmlFor="builder-introduce">
                              <span>INTRODUCE YOUR TEAM WITH AN AMUSING ANECODE *</span>
                              <Field name="builderIntroduce" className="uk-input" type="text" placeholder="" id="builder-introduce" />
                              <div className="uk-error"><ErrorMessage name="builderIntroduce" /></div>
                            </label>
                          </div>
                        </fieldset>
                        <fieldset className="uk-fieldset">
                          <legend className="uk-legend">3. BUILDER INFO</legend>
                          <div className="uk-margin">
                            <label htmlFor="builder-name">
                              <span>Name of Builder *</span>
                              <Field name="builderName" className="uk-input" type="text" placeholder="What's your name?" id="builder-name" />
                              <div className="uk-error"><ErrorMessage name="builderName" /></div>
                            </label>
                          </div>
                          <div className="uk-margin">
                            <label htmlFor="builder-prev">
                              <span>YOUR FAVORITE THINGS YOU’VE BUILT</span>
                              <span className="sub">(Please include links if available)</span>
                              <Field name="builderPrev" className="uk-input" type="text" placeholder="" id="builder-prev" />
                              <div className="uk-error"><ErrorMessage name="builderPrev" /></div>
                            </label>
                          </div>
                          <div style={{ height: 20 }} />
                          <div className="uk-margin">
                            <label htmlFor="github">
                              <span>Your Github username *</span>
                              <Field name="github" className="uk-input" type="text" placeholder="" id="github" />
                              <div className="uk-error"><ErrorMessage name="github" /></div>
                            </label>
                          </div>
                          <div className="uk-margin">
                            <label htmlFor="twitter">
                              <span>Your Twitter username</span>
                              <Field name="twitter" className="uk-input" type="text" placeholder="" id="twitter" />
                              <div className="uk-error"><ErrorMessage name="twitter" /></div>
                            </label>
                          </div>
                        </fieldset>
                        <fieldset className="uk-fieldset policy-block">
                          <div className="uk-margin">
                            <label htmlFor="policy">
                              <Field name="policy" className="uk-checkbox" type="checkbox" id="policy" />
                              I agree to the Policy
                              <div>
                                <div className="uk-error"><ErrorMessage name="policy" /></div>
                              </div>
                            </label>
                          </div>
                        </fieldset>
                        <div className="submit-button-block">
                          <Button className="button-app-1" type="submit">
                            Submit your proposal
                          </Button>
                        </div>
                      </Form>
                    )
                  }
                </Formik>
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
