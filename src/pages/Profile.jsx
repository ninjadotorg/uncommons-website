import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { logout } from '@/reducers/auth/action';
import Divider from '@material-ui/core/Divider';

class Profile extends React.Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { logout: propsLogout, auth } = this.props;
    return (
      <div className="uk-container">
        <div className="profile-page">
          <Grid container spacing={24}>
            <Grid item xs={12} />
            <Grid item xs={12} md={3}>
              <div className="profile-sidebar">
                <Grid container spacing={24}>
                  <Grid item xs={3} md={12}>
                    <div className="avatar-container">
                      <img src="https://via.placeholder.com/200x200" alt="" />
                    </div>
                    <Divider inset style={{ margin: '20px 0 10px' }} />
                  </Grid>
                  <Grid item xs={9} md={12}>
                    <div>
                      Mined:
                      {' '}
                      {'{0}'}
                      {' '}
                      <b>vote coins</b>

                    </div>
                    <div>
                      Voted:
                      {' '}
                      {'{0}'}
                      {' '}
                      proposals
                    </div>
                    <div>
                      Loved:
                      {' '}
                      {'{0}'}
                      {' '}
                      proposals
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} md={9}>
              <div className="profile-content">
                <Grid container spacing={24}>
                  <Grid item xs={12} md={9}>
                    <div>Address: </div>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    {
                      auth.isLogged
                        ? (
                          <Button
                            onClick={propsLogout}
                            variant="contained"
                            color="secondary"
                            style={{ float: 'right' }}
                          >
                            Logout
                          </Button>
                        )
                        : ''
                    }
                  </Grid>
                </Grid>
                <Divider inset style={{ margin: '20px 0 10px' }} />
                <Grid container spacing={24}>
                  <Grid item xs={12} md={9}>
                    <div>Proposals created: </div>
                  </Grid>
                </Grid>
                <Divider inset style={{ margin: '20px 0 10px' }} />
                <Grid container spacing={24}>
                  <Grid item xs={12} md={9}>
                    <div>Proposals loved: </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ auth: state.auth }), ({ logout }),
)(Profile);
