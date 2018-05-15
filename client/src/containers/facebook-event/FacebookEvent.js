import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import * as facebookAPI from '../../api/FacebookAPI';
import serializeForm from 'form-serialize';
import './FacebookEvent.css';
import Loading from '../../components/Loading';
import { ERRORS_TYPE, fetchEventAction } from '../../reducers/event.reducer';
import FacebookEventInfo from './FacebookEventInfo';
import { connect } from 'react-redux';
import _ from 'lodash';

class FacebookEvent extends Component {
  state = {
    acessToken: null
  };

  responseFacebook = response => {
    this.setState({
      isLoggingIn: false,
      acessToken: response.accessToken
    });

    facebookAPI.setAcessToken(response.accessToken);
  };

  componentDidMount() {
    facebookAPI.setVersion();
    this.setState({
      acessToken: facebookAPI.getAcessToken()
    });
  }

  getEvent = e => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });

    this.props.dispatch(fetchEventAction(values.eventID));
  };

  render() {
    console.log(this.props);
    return (
      <div className="FacebookEvent row">
        {this.state.acessToken ? (
          <div className="FacebookEvent__info">
            <form onSubmit={this.getEvent} className="form-inline FacebookEvent__info__ID">
              <div className="form-group col-8 mb-0 pl-0">
                <input
                  type="text"
                  name="eventID"
                  className="form-control"
                  required
                  placeholder="ID do Evento"
                />
              </div>
              <button type="submit" className="btn btn-primary col-4">
                Buscar
              </button>
            </form>
            {this.props.isLoading && <Loading />}

            {_.get(this.props.error, 'type') === ERRORS_TYPE.ALREADY_IN_DATABASE && (
              <h3 className="mt-3">{this.props.error.message}</h3>
            )}

            {this.props.isLoading === false &&
              _.get(this.props.error, 'type') !== ERRORS_TYPE.ALREADY_IN_DATABASE && (
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

const mapStateToProps = ({ eventReducer }) => ({ ...eventReducer });

export default connect(mapStateToProps)(FacebookEvent);
