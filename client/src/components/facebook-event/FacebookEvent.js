import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import * as facebookAPI from '../../api/FacebookAPI';
import serializeForm from 'form-serialize';
import './FacebookEvent.css';
import ReactLoading from 'react-loading';
import FacebookEventInfo from "./FacebookEventInfo";
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';

class FacebookEvent extends Component {

    static info;

    state = {
        isGettingEvent: false,
        acessToken: null,
        info: FacebookEvent.info
    };

    responseFacebook = (response) => {
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


    getEvent = (e) => {
        this.setState({
            isGettingEvent: true,
            info: null
        });

        e.preventDefault();
        const values = serializeForm(e.target, {hash: true});

        facebookAPI.getEvent(values.eventID)
            .then(info => {
                console.log(info);

                FacebookEvent.info = info;

                this.setState({isGettingEvent: false, info});
            })
    };


    render() {
        return (
            <div className="FacebookEvent row">
                {this.state.acessToken ? (
                    <div className="FacebookEvent__info">
                        <form onSubmit={this.getEvent} className="form-inline FacebookEvent__info__ID">
                            <div className="form-group col-8 mb-0 pl-0">
                                <input type="text" name="eventID" className="form-control " required
                                       placeholder="ID do Evento"/>
                            </div>
                            <button type="submit" className="btn btn-primary col-4">Buscar</button>
                        </form>
                        {this.state.isGettingEvent && (
                            <div className="FacebookEvent__loading my-3">
                                <ReactLoading className="mb-3" type="spinningBubbles" delay={0} color="#000" height={60}
                                              width={60}/>
                                Carregando...
                            </div>
                        )}

                        {!isEmpty(this.state.info) && (
                            <div className="mt-3  px-0">
                                <FacebookEventInfo
                                    info={this.state.info}/>
                            </div>
                        )}

                    </div>
                ) : (
                    <FacebookLogin className="FacebookEvent__facebook--btn"
                                   appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                                   autoLoad={true}
                                   reauthenticate={true}
                                   fields="name,email,picture"
                                   callback={this.responseFacebook}/>
                )}


            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({event: state.event});

export default connect(mapStateToProps, null)(FacebookEvent);