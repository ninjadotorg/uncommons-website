import React from 'react';
import Grid from '@material-ui/core/Grid';

class Download extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="uk-container">
        <div className="content-page">
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <div>
                Download page
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Download;
