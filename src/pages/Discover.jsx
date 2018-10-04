import React from 'react';
import Grid from '@material-ui/core/Grid';
import randomColor from 'randomcolor';

class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 1,
          name: 'a',
          author: '0x123',
        },
        {
          id: 1,
          name: 'a',
          author: '0x123',
        },
        {
          id: 1,
          name: 'a',
          author: '0x123',
        },
        {
          id: 1,
          name: 'a',
          author: '0x123',
        },
        {
          id: 1,
          name: 'a',
          author: '0x123',
        },
      ],
    };
  }

  render() {
    const { items } = this.state;

    return (
      <div className="uk-container">
        <div className="discover-page">
          <div />
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <div>
                <div className="discover-page-header">Discover page</div>
                <Grid container spacing={24}>
                  {items.map(
                    item => (
                      <Grid item xs={12} sm={6} md={3}>
                        <div className="discover-item">
                          <div className="discover-item-cover" />
                          <div
                            className="discover-item-id"
                            style={{
                              fontFamily: 'Pacifico, cursive',
                            }}
                          >
                            <span
                              className="discover-item-id-id"
                              style={{
                                color: randomColor({
                                  luminosity: 'bright',
                                }),
                                fontWeight: 'bold',
                                fontSize: '130%',
                              }}
                            >
                              #
                              {item.id}
                            </span>
                            :
                            {' '}
                            {item.name}
                          </div>
                          <div>
                            Author: 0x123
                          </div>
                        </div>
                      </Grid>
                    ),
                  )}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Discover;
