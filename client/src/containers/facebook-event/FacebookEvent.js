import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import * as facebookAPI from '../../api/FacebookAPI';
import * as firebaseAPI from '../../api/FirebaseAPI';

import serializeForm from 'form-serialize';
import './FacebookEvent.css';
import Loading from '../../components/Loading';
import FacebookEventInfo from './FacebookEventInfo';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

class FacebookEvent extends Component {
  static info;

  state = {
    isGettingEvent: false,
    acessToken: null,
    info: FacebookEvent.info,
    error: null
  };

  responseFacebook = response => {
    this.setState({
      isLoggingIn: false,
      acessToken: response.accessToken
    });

    facebookAPI.setAcessToken(response.accessToken);
  };

  componentDidMount() {
    this.setState({
      acessToken: facebookAPI.getAcessToken()
    });
  }

  getEvent = e => {
    this.setState({
      isGettingEvent: true,
      info: null,
      error: null
    });

    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });

    firebaseAPI
      .isEventExist(values.eventID)
      .then(exist => {
        if (exist) {
          throw new Error('Evento já existe no nosso Banco de Dados');
        } else {
          return facebookAPI.getEvent(values.eventID);
        }
      })
      .then(info => {
        FacebookEvent.info = info;

        this.setState({ isGettingEvent: false, info });
      })
      .catch(err => {
        this.setState({
          isGettingEvent: false,
          error: err.exception ? err.exception.response.body.error.message : err.message
        });
      });
  };

  render() {
    return (
      <div className="FacebookEvent row">
        {this.state.acessToken ? (
          <div className="FacebookEvent__info">
            <form onSubmit={this.getEvent} className="form-inline FacebookEvent__info__ID">
              <div className="form-group col-8 mb-0 pl-0">
                <input
                  type="text"
                  name="eventID"
                  className="form-control "
                  required
                  placeholder="ID do Evento"
                />
              </div>
              <button type="submit" className="btn btn-primary col-4">
                Buscar
              </button>
            </form>
            {this.state.isGettingEvent && <Loading />}

            {this.state.error && <h4 className="mt-4">{this.state.error} </h4>}

            {!isEmpty(this.state.info) && (
              <div className="mt-3  px-0">
                <FacebookEventInfo info={this.state.info} />
              </div>
            )}
          </div>
        ) : (
          <FacebookLogin
            className="FacebookEvent__facebook--btn"
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            autoLoad={true}
            reauthenticate={true}
            fields="name,email,picture"
            callback={this.responseFacebook}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({ event: state.event });

export default connect(mapStateToProps)(FacebookEvent);
