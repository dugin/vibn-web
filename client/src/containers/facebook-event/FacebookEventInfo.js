import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import { Redirect } from 'react-router-dom';
import { setEventAction } from '../../reducers/event.reducer';
import { dateMask, timeMask } from '../../utils/masks';
import MaskedInput from 'react-text-mask';
import { GeoPoint } from 'firebase/firestore/api/geo_point';
import 'moment/locale/pt-br';
import _ from 'lodash';

class FacebookEventInfo extends Component {
  constructor(props) {
    super(props);

    this.state = { imgSource: _.get(props.event, 'cover.source', '') };
  }

  setDate = date => {
    if (date) {
      return moment(date, moment.ISO_8601).format('DD/MM/YYYY');
    }
  };

  setTime = date => {
    if (date) {
      return moment(date, moment.ISO_8601).format('HH:mm');
    }
  };

  onContinue = e => {
    const { event } = this.props;
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });

    values.img = this.state.imgSource;
    values.id = _.get(event, 'id');

    if (values.latitude && values.longitude)
      values.coordinates = new GeoPoint(
        Number.parseFloat(values.latitude),
        Number.parseFloat(values.longitude)
      );

    values.startDate = moment(
      `${values.startDate} ${values.startTime}`,
      'DD/MM/YYYY HH:mm'
    ).toDate();
    values.endDate = moment(`${values.endDate} ${values.endTime}`, 'DD/MM/YYYY HH:mm').toDate();

    delete values.imgSource;
    delete values.latitude;
    delete values.longitude;
    delete values.endTime;
    delete values.startTime;

    this.props.dispatch(setEventAction(values));
    this.setState({ onContinue: true });
  };

  render() {
    if (this.state.onContinue) return <Redirect push to="/admin/events/register/continue" />;

    const { event } = this.props;
    return (
      <form className="row" onSubmit={this.onContinue}>
        <div className="col-12 col-md-4 img-wrapper">
          <img
            className="rounded img"
            src={this.state.imgSource}
            height={120}
            width="auto"
            alt=""
          />
        </div>

        <div className="col-md-8 col-12">
          <div className="form-group">
            <label htmlFor="name">Título</label>
            <input
              type="name"
              className="form-control"
              required
              id="name"
              name="title"
              defaultValue={_.get(event, 'name')}
            />
          </div>
          <div className="row">
            <div className="form-group col-md-10">
              <label htmlFor="name">Subtítulo</label>
              <input type="name" className="form-control" id="name" name="subtitle" />
            </div>
            <div className="form-group col-md-2">
              <label className="attendingCount" htmlFor="name">
                Confirmados
              </label>
              <input
                name="attendingCount"
                type="name"
                className="form-control"
                id="name"
                defaultValue={_.get(event, 'attending_count')}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <div className="form-group col-md-12 mt-2">
              <label className="imgSource" htmlFor="imgSource">
                Url da Imagem
              </label>
              <input
                name="imgSource"
                type="text"
                className="form-control"
                id="name"
                defaultValue={this.state.imgSource}
                onChange={event => this.setState({ imgSource: event.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group mt-2">
            <label htmlFor="name">Dia e hora de Início</label>
            <div className="row">
              <div className="col-md-6">
                <MaskedInput
                  mask={dateMask}
                  type="name"
                  className="form-control"
                  id="name"
                  required
                  name="startDate"
                  value={this.setDate(_.get(event, 'start_time'))}
                />
              </div>
              <div className="col-md-6">
                <MaskedInput
                  mask={timeMask}
                  type="name"
                  className="form-control"
                  id="name"
                  required
                  name="startTime"
                  value={this.setTime(_.get(event, 'start_time'))}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group mt-2">
            <label htmlFor="name">Dia e hora de Término</label>
            <div className="row">
              <div className="col-md-6">
                <MaskedInput
                  mask={dateMask}
                  type="name"
                  className="form-control"
                  id="name"
                  required
                  name="endDate"
                  value={this.setDate(_.get(event, 'end_time'))}
                />
              </div>
              <div className="col-md-6">
                <MaskedInput
                  mask={timeMask}
                  type="name"
                  className="form-control"
                  id="name"
                  required
                  name="endTime"
                  value={this.setTime(_.get(event, 'end_time'))}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 ">
          <div className="row">
            <div className="form-group col-md-6 ">
              <label htmlFor="place">Local</label>
              <input
                type="text"
                className="form-control "
                id="place"
                name="place"
                defaultValue={_.get(event, 'place.name')}
              />
            </div>
            <div className="form-group col-md-6 ">
              <label htmlFor="coord">Coordenadas</label>
              <div className="row">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control "
                    id="coord"
                    name="latitude"
                    defaultValue={_.get(event, 'place.location.latitude')}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control "
                    id="coord"
                    name="longitude"
                    defaultValue={_.get(event, 'place.location.longitude')}
                  />
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
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  placeholder="Endereço"
                  defaultValue={_.get(event, 'place.location.street')}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control "
                  id="name"
                  required
                  name="neighborhood"
                  placeholder="Bairro"
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control "
                  id="name"
                  required
                  name="city"
                  placeholder="cidade"
                  defaultValue={_.get(event, 'place.location.city')}
                />
              </div>
              <div className="col-md-1">
                <input
                  type="text"
                  className="form-control "
                  id="name"
                  required
                  name="props"
                  placeholder="estado"
                  defaultValue={_.get(event, 'place.location.city')}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="form-group mt-2">
            <label htmlFor="desc">Descrição</label>
            <textarea
              name="description"
              className="form-control"
              id="desc"
              defaultValue={_.get(event, 'description')}
              rows="15"
              cols="50"
            />
          </div>
        </div>
        <div className="col-12">
          <button className="btn btn-primary btn-block" type="submit">
            CONTINUAR
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ eventReducer }) => ({ event: eventReducer.event });

export default connect(mapStateToProps)(FacebookEventInfo);
