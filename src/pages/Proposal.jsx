import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import Breadcrumb from '@/components/Breadcrumb';
import Grid from '@material-ui/core/Grid';

class Proposal extends React.Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="uk-container">
        <div className="main-style-page proposal-page">
          <Breadcrumb
            urls={
              [
                { name: 'Discover', url: '/discover' },
                { name: `Proposal: ${true}` },
              ]
            }
          />
          <Grid container spacing={24}>
            <Grid item xs={12}>
              name:
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Proposal;
