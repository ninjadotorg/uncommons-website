import React from 'react';
import Grid from '@material-ui/core/Grid';

class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="uk-container">
        <div className="discover-page">
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              Discover page
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Discover;
