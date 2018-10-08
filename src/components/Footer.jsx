import React from 'react';
import Grid from '@material-ui/core/Grid';

class Footer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <footer className="footer">
        <div className="uk-container">
          <Grid container spacing={24} style={{ marginBottom: 0 }}>
            <Grid item xs={12} sm={3}>
              Uncommons
            </Grid>
            <Grid item xs={12} sm={3}>
              <ul>
                <li className="head-list">Community</li>
                <li><a rel="noopener noreferrer" target="_blank" href="/"><span>Blog</span></a></li>
                <li><a rel="noopener noreferrer" target="_blank" href="https://github.com/ninjadotorg/uncommons"><span>Github</span></a></li>
                <li><a rel="noopener noreferrer" target="_blank" href="/"><span>Youtube</span></a></li>
                <li><a rel="noopener noreferrer" target="_blank" href="/"><span>Reddit</span></a></li>
                <li><a rel="noopener noreferrer" target="_blank" href="/"><span>Slack</span></a></li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={3}>
              <ul>
                <li className="head-list">Documents</li>
                <li><a rel="noopener noreferrer" target="_blank" href="/"><span>White-paper</span></a></li>
                <li><a rel="noopener noreferrer" target="_blank" href="/"><span>Download client - gunc</span></a></li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={3}>
              <ul>
                <li className="head-list">Developer Resources</li>
                <li><a rel="noopener noreferrer" target="_blank" href="/"><span>What is Uncommons?</span></a></li>
                <li><a rel="noopener noreferrer" target="_blank" href="/"><span>Learn Solidity</span></a></li>
                <li><a rel="noopener noreferrer" target="_blank" href="/"><span>How to deploy your app</span></a></li>
                <li>
                  <a rel="noopener noreferrer" target="_blank" href="/">
                    <span>
                      Get
                      {' '}
                      {'"gift"'}
                      {' '}
                      from our chain
                    </span>

                  </a>

                </li>
              </ul>
            </Grid>
            <Grid item xs={12} className="copyright">
              Copyright © 2018 Ninja organization. All Rights Reserved.
              <div>
                <a rel="noopener noreferrer" target="_blank" href="/">Privacy Policy</a>
                <a rel="noopener noreferrer" target="_blank" href="/">Cookie Policy</a>
                <a rel="noopener noreferrer" target="_blank" href="/">Terms of Use</a>
              </div>
            </Grid>
          </Grid>
        </div>
      </footer>
    );
  }
}

export default Footer;
