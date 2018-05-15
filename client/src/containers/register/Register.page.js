import React, { Component } from 'react';
import FacebookEvent from '../facebook-event/FacebookEvent';
import './RegisterPage.css';
import { withRouter } from 'react-router-dom';
import EventExtras from './EventExtras';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = { isContinue: this.shouldContinue(props) };
  }

  shouldContinue = props => {
    return props.history.location.pathname.includes('continue');
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ isContinue: this.shouldContinue(nextProps) });
  }

  render() {
    return (
      <div className="RegisterPage container">
        {this.state.isContinue ? <EventExtras /> : <FacebookEvent />}
      </div>
    );
  }
}

export default withRouter(RegisterPage);
