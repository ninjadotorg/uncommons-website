import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                      <label htmlFor="name">
                        <span>Name of Dapp</span>
                        <input className="uk-input" type="text" placeholder="Input" id="name" />
                      </label>
                    </div>
                    <div className="uk-margin">
                      <label htmlFor="description">
                        <span>WHAT YOUR DAPP DOES</span>
                        <textarea className="uk-textarea" rows="5" placeholder="Textarea" id="description" />
                      </label>
                    </div>
                    <div className="uk-margin">
                      <label htmlFor="why-we-will-love">
                        <span>WHY WE’LL LOVE YOUR DAPP</span>
                        <textarea className="uk-textarea" rows="5" placeholder="Textarea" id="why-we-will-love" />
                      </label>
                    </div>
                    <div className="uk-margin">
                      <label htmlFor="why-you-want-build">
                        <span>WHY YOU WANT TO BUILD IT</span>
                        <textarea className="uk-textarea" rows="5" placeholder="Textarea" id="why-you-want-build" />
                      </label>
                    </div>
                    <div className="uk-margin">
                      <label htmlFor="what-cool">
                        <span>WHAT’S COOL ABOUT WHAT YOU ARE DOING?</span>
                        <textarea className="uk-textarea" rows="5" placeholder="Textarea" id="what-cool" />
                      </label>
                    </div>
                    <div className="uk-margin">
                      <label htmlFor="how-far">
                        <span>HOW FAR ALONG ARE YOU</span>
                        <textarea className="uk-textarea" rows="5" placeholder="Textarea" id="how-far" />
                      </label>
                    </div>
                  </fieldset>
                  <fieldset className="uk-fieldset">
                    <legend className="uk-legend">2. SHIPPING DATE</legend>
                  </fieldset>
                  <fieldset className="uk-fieldset">
                    <legend className="uk-legend">3. BUILDER INFO</legend>
                  </fieldset>
                  <fieldset className="uk-fieldset">
                    <div className="uk-margin">
                      <label htmlFor="policy">
                        <input className="uk-checkbox" type="checkbox" id="policy" />
                        I agree to the Policy
                      </label>
                    </div>
                  </fieldset>
                  <div>
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

export default Submit;
