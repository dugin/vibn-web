import React, {Component} from 'react';
import moment from 'moment';
import {setEvent} from "../../actions/event";
import {connect} from 'react-redux';

class FacebookEventInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {info: props.info};
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
                        <label htmlFor="name">Título</label>
                        <input type="name" className="form-control" required id="name"
                               defaultValue={this.state.info.name}/>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-10">
                            <label htmlFor="name">Subtítulo</label>
                            <input type="name" className="form-control" id="name" required
                            />
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
                        <div className="row">
                            <div className="col-md-6">
                                <input type="name" className="form-control" id="name" required
                                       defaultValue={this.setDate(this.state.info.start_time)}/>
                            </div>
                            <div className="col-md-6">
                                <input type="name" className="form-control" id="name" required
                                       defaultValue={this.setTime(this.state.info.start_time)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group mt-2">
                        <label htmlFor="name">Dia e hora de Término</label>
                        <div className="row">
                            <div className="col-md-6">
                                <input type="name" className="form-control" id="name" required
                                       defaultValue={this.setDate(this.state.info.end_time)}/>
                            </div>
                            <div className="col-md-6">
                                <input type="name" className="form-control" id="name" required
                                       defaultValue={this.setTime(this.state.info.end_time)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 ">
                    <div className="row">
                        <div className="form-group col-md-6 ">
                            <label htmlFor="place">Local</label>
                            <input type="text" className="form-control " id="place" required
                                   defaultValue={this.state.info.place.name}/>
                        </div>
                        <div className="form-group col-md-6 ">
                            <label htmlFor="coord">Coordenadas</label>
                            <div className="row">
                                <div className="col-md-6">
                                    <input type="text" className="form-control " id="coord" required
                                           defaultValue={this.state.info.place.location.latitude}/>
                                </div>
                                <div className="col-md-6">
                                    <input type="text" className="form-control " id="coord" required
                                           defaultValue={this.state.info.place.location.longitude}/>
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
                                <input type="text" className="form-control" id="address" required
                                       placeholder="Endereço" defaultValue={this.state.info.place.location.street}/>
                            </div>
                            <div className="col-md-3">
                                <input type="text" className="form-control " id="name" required
                                       placeholder="Bairro"/>
                            </div>
                            <div className="col-md-3">
                                <input type="text" className="form-control " id="name" required
                                       defaultValue={this.state.info.place.location.city}/>
                            </div>
                            <div className="col-md-1">
                                <input type="text" className="form-control " id="name" required
                                       defaultValue={this.state.info.place.location.state}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="form-group mt-2">
                        <label htmlFor="desc">Descrição</label>
                        <textarea name="text" className="form-control" id="desc"
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

const mapStateToProps = (state, props) => ({book: props.book});


export default connect(mapStateToProps, mapDispatchToProps)(FacebookEventInfo);