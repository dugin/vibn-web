import React, {Component} from 'react';
import './EventExtras.css';
import {connect} from 'react-redux';

class EventExtras extends Component {

    onSend = (e) => {
        e.preventDefault();


        console.log(this.props.event)

    };

    render() {

        return (
            <form className="row EventExtras" onSubmit={this.onSend}>

                <div className=" col-md-4">
                    <div className="form-group">
                        <label htmlFor="name">Cupom</label>
                        <input type="name" className="form-control" id="name" name="coupon"
                        />
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="form-group">
                        <label htmlFor="name">Link de Compra</label>
                        <input type="name" className="form-control" id="name" name="buyLink"
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <p>Música</p>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" value=""/>
                            Sertanejo
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" value=""/>
                            Eletrônica
                        </label>
                    </div>
                </div>
                <div className="col-md-4">
                    <p>Tipo</p>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" value=""/>
                              Open Bar
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" value=""/>
                              Choppada
                        </label>
                    </div>

                </div>
                <div className="col-md-4">
                    <p>Local</p>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" value=""/>
                            Zona Sul
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" value=""/>
                            Barra
                        </label>
                    </div>
                </div>

                <div className="col-12 mt-5">
                    <button className="btn btn-primary btn-block"> Enviar </button>
                </div>
            </form>

        )
    }
}

const mapStateToProps = (state, props) => ({event: state.event});


export default connect(mapStateToProps, null)(EventExtras);