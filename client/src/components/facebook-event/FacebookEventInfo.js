import React, {Component} from 'react';
import moment from 'moment';
import {setEvent} from "../../actions/event";
import {connect} from 'react-redux';
import serializeForm from 'form-serialize';
import {Redirect} from 'react-router-dom';
import {dateMask, timeMask} from "../../utils/masks";
import MaskedInput from "react-text-mask";
import {GeoPoint} from 'firebase/firestore/api/geo_point';

class FacebookEventInfo extends Component {


    constructor(props) {
        super(props);

        this.state = {info: props.info, onContinue: false};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({info: nextProps.info})
    }


    setDate = (date) => {
        return moment(date, moment.ISO_8601).format('DD/MM/YYYY');
    };

    setTime = (date) => {
        return moment(date, moment.ISO_8601).format('HH:mm');
    };

    onContinue = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, {hash: true});

        const sDate = values.startDate;
        const eDate = values.endDate;

        values.img = this.state.info.cover && this.state.info.cover.source;
        values.id = this.state.info.id;

        values.coordinates = new GeoPoint(Number.parseFloat(values.latitude), Number.parseFloat(values.longitude));

        values.startDate = moment(`${sDate} ${values.startTime}`, 'DD/MM/YYYY HH:mm').toDate();
        values.endDate = moment(`${eDate} ${values.endTime}`, 'DD/MM/YYYY HH:mm').toDate();

        delete values.latitude;
        delete values.longitude;
        delete values.endTime;
        delete values.startTime;

        this.props.setEvent(values);
        FacebookEventInfo.event = values;
        this.setState({onContinue: true})
    };

    render() {
        if (this.state.onContinue)
            return <Redirect push to="/admin/events/register/continue"/>;

        return (
            <form className="row" onSubmit={this.onContinue}>

                <div className="col-12 col-md-4 img-wrapper">
                    <img className="rounded img" src={this.state.info.cover ? this.state.info.cover.source : ''}
                         height={120} width="auto"
                         alt=""/>
                </div>

                <div className="col-md-8 col-12">
                    <div className="form-group">
                        <label htmlFor="name">Título</label>
                        <input type="name" className="form-control" required id="name" name="title"
                               defaultValue={this.state.info.name}/>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-10">
                            <label htmlFor="name">Subtítulo</label>
                            <input type="name" className="form-control" id="name" name="subtitle"
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label className="attendingCount" htmlFor="name">Confirmados</label>
                            <input name="attendingCount" type="name" className="form-control" id="name"
                                   defaultValue={this.state.info.attending_count}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">

                    <div className="form-group mt-2">
                        <label htmlFor="name">Dia e hora de Início</label>
                        <div className="row">
                            <div className="col-md-6">
                                <MaskedInput mask={dateMask}
                                             type="name"
                                             className="form-control" id="name" required
                                             name="startDate" value={this.setDate(this.state.info.start_time)}/>
                            </div>
                            <div className="col-md-6">
                                <MaskedInput mask={timeMask}
                                             type="name" className="form-control" id="name" required
                                             name="startTime" value={this.setTime(this.state.info.start_time)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group mt-2">
                        <label htmlFor="name">Dia e hora de Término</label>
                        <div className="row">
                            <div className="col-md-6">
                                <MaskedInput mask={dateMask}
                                             type="name" className="form-control" id="name" required
                                             name="endDate" value={this.setDate(this.state.info.end_time)}/>
                            </div>
                            <div className="col-md-6">
                                <MaskedInput mask={timeMask}
                                             type="name" className="form-control" id="name" required
                                             name="endTime" value={this.setTime(this.state.info.end_time)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 ">
                    <div className="row">
                        <div className="form-group col-md-6 ">
                            <label htmlFor="place">Local</label>
                            <input type="text" className="form-control " id="place"
                                   name="place" defaultValue={this.state.info.place.name}/>
                        </div>
                        <div className="form-group col-md-6 ">
                            <label htmlFor="coord">Coordenadas</label>
                            <div className="row">
                                <div className="col-md-6">
                                    <input type="text" className="form-control " id="coord"
                                           name="latitude"
                                           defaultValue={this.state.info.place.location && this.state.info.place.location.latitude}/>
                                </div>
                                <div className="col-md-6">
                                    <input type="text" className="form-control " id="coord"
                                           name="longitude"
                                           defaultValue={this.state.info.place.location && this.state.info.place.location.longitude}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="address">Endereço</label>
                        <div className="row">
                            <div className="col-md-5">
                                <input type="text" className="form-control" id="address"
                                       name="address" placeholder="Endereço"
                                       defaultValue={this.state.info.place.location && this.state.info.place.location.street}/>
                            </div>
                            <div className="col-md-3">
                                <input type="text" className="form-control " id="name" required
                                       name="neighborhood" placeholder="Bairro"/>
                            </div>
                            <div className="col-md-3">
                                <input type="text" className="form-control " id="name" required
                                       name="city"
                                       defaultValue={this.state.info.place.location && this.state.info.place.location.city}/>
                            </div>
                            <div className="col-md-1">
                                <input type="text" className="form-control " id="name" required
                                       name="state"
                                       defaultValue={this.state.info.place.location && this.state.info.place.location.state}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="form-group mt-2">
                        <label htmlFor="desc">Descrição</label>
                        <textarea name="description" className="form-control" id="desc"
                                  defaultValue={this.state.info.description} rows="15" cols="50"/>
                    </div>

                </div>
                <div className="col-12">
                    <button className="btn btn-primary btn-block" type="submit"> CONTINUAR</button>
                </div>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setEvent: (event) => dispatch(setEvent(event)),
    }
};

const mapStateToProps = (state, props) => ({event: props.event});


export default connect(mapStateToProps, mapDispatchToProps)(FacebookEventInfo);