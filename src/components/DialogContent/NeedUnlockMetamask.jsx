import React from 'react';
import { DIALOG } from '@/reducers/app/action';

class NeedUnlockMetamask extends React.PureComponent {
  static type = DIALOG.STATUS.WARNING;

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div />;
  }
}

export default NeedUnlockMetamask;
