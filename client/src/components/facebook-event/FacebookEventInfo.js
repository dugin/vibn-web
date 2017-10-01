import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import * as facebookAPI from '../../api/FacebookAPI';
import serializeForm from 'form-serialize';
import ReactLoading from 'react-loading';
import moment from 'moment';

class FacebookEventInfo extends Component {


    constructor(props) {
        super(props);

        this.state = {info: props.info};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({info: nextProps.info})
    }


    setDate = (date) => {
        console.log(date);
        return moment(date, moment.ISO_8601).format('DD/MM/YYYY');
    };

    setTime = (date) => {
        console.log(date);
        return moment(date, moment.ISO_8601).format('HH:mm');
    };

    render() {

        return (
            <form className="row">
                <div className="col-12 col-md-4 img-wrapper">
                    <img className="rounded img" src={this.state.info.cover ? this.state.info.cover.source : ''}
                         height={120} width="auto"
                         alt=""/>
                </div>

                <div className="col-md-8 col-12">
                    <div className="form-group">
                        <label htmlFor="name">Nome</label>
                        <input type="name" className="form-control" id="name" defaultValue={this.state.info.name}/>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-10">
                            <label htmlFor="name">Local</label>
                            <input type="name" className="form-control" id="name"
                                   defaultValue={this.state.info.place.name}/>
                        </div>
                        <div className="form-group col-md-2">
                            <label className="attendingCount" htmlFor="name">Confirmados</label>
                            <input type="name" className="form-control" id="name"
                                   defaultValue={this.state.info.attending_count}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group mt-2">
                        <label htmlFor="name">Dia e hora de Início</label>
                        <input type="name" className="form-control" id="name"
                               defaultValue={this.setDate(this.state.info.start_time)}/>
                        <input type="name" className="form-control mt-3" id="name"
                               defaultValue={this.setTime(this.state.info.start_time)}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group mt-2">
                        <label htmlFor="name">Dia e hora de Término</label>
                        <input type="text" className="form-control" id="name"
                               defaultValue={this.setDate(this.state.info.end_time)}/>
                        <input type="text" className="form-control mt-3" id="name"
                               defaultValue={this.setTime(this.state.info.end_time)}/>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group mt-2">
                        <label htmlFor="address">Endereço</label>
                        <div className="row">
                            <div className="col-md-5">
                                <input type="text" className="form-control" id="address"
                                       defaultValue={this.state.info.place.location.street}/>
                            </div>
                            <div className="col-md-3">
                                <input type="text" className="form-control " id="name"
                                       placeholder="Bairro"/>
                            </div>
                            <div className="col-md-3">
                                <input type="text" className="form-control " id="name"
                                       defaultValue={this.state.info.place.location.city}/>
                            </div>
                            <div className="col-md-1">
                                <input type="text" className="form-control " id="name"
                                       defaultValue={this.state.info.place.location.state}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group mt-2">
                        <label htmlFor="coord">Coordenadas</label>
                        <div className="row">
                            <div className="col-md-6">
                                <input type="text" className="form-control " id="coord"
                                       defaultValue={this.state.info.place.location.latitude}/>
                            </div>
                            <div className="col-md-6">
                                <input type="text" className="form-control " id="coord"
                                       defaultValue={this.state.info.place.location.longitude}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group mt-2">
                        <label htmlFor="desc">Descrição</label>
                        <textarea name="text" className="form-control" id="desc" defaultValue={this.state.info.description} rows="15" cols="50"/>
                    </div>

                </div>


            </form>
        )
    }
}

export default FacebookEventInfo;