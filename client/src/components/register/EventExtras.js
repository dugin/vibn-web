import React, {Component} from 'react';
import './EventExtras.css';
import {connect} from 'react-redux';
import {getTags, postEvent} from "../../api/FirebaseAPI";
import {TAGS} from "../../utils/constants";
import {addOrRemoveFromArray, removeAccentAndSpace} from "../../utils/utils";
import {Redirect} from 'react-router-dom';
import moment from 'moment';
import serializeForm from 'form-serialize';
import isEmpty from 'lodash/isEmpty';

class EventExtras extends Component {

    state = {
        locationRegion: [],
        musicStyle: [],
        partyKind: [],
        tags: {locationRegion: [], musicStyle: [], partyKind: []},
        isSending: false,
        success: false
    };

    componentDidMount() {

        this.getAllTags();

        console.log(this.props.event);

    }

    getAllTags = () => {

        Promise.all(Object.values(TAGS).map(t => getTags(t)))
            .then(val => {
                val.forEach((d, i) => {
                    this.setState({
                        [Object.values(TAGS)[i]]:
                            Object.keys(this.state)[i].localeCompare(TAGS.LOCATION_REGION) === 0 ?
                                d.data()[removeAccentAndSpace(this.props.event.city || 'Rio de Janeiro')] :
                                d.data().name
                    })
                })
            })
    };

    onLocationRegion = (index) => {
        const region = this.state.locationRegion[index];

        this.setState(state => ({
            tags: {
                locationRegion: addOrRemoveFromArray(this.state.tags.locationRegion, region),
                musicStyle: state.tags.musicStyle,
                partyKind: state.tags.partyKind
            }
        }));

    };
    onPartyKind = (index) => {
        const party = this.state.partyKind[index];

        this.setState(state => ({
            tags: {
                partyKind: addOrRemoveFromArray(this.state.tags.partyKind, party),
                musicStyle: state.tags.musicStyle,
                locationRegion: state.tags.locationRegion
            }
        }));
    };
    onMusicStyle = (index) => {
        const music = this.state.musicStyle[index];

        this.setState(state => ({
            tags: {
                musicStyle: addOrRemoveFromArray(this.state.tags.musicStyle, music),
                locationRegion: state.tags.locationRegion,
                partyKind: state.tags.partyKind
            }
        }));
    };


    onSend = (e) => {
        e.preventDefault();

        const values = serializeForm(e.target, {hash: true});

        const result = {
            tags: this.state.tags,
            ...this.props.event,
            ...values,
            createdAt: moment().toDate()
        };

        this.setState({isSending: true});

        postEvent(result)
            .then(resp => {
                this.setState({success: true});
            })
            .catch(err => {
                this.setState({isSending: false});
            })
    };

    render() {

        if (this.state.success || isEmpty(this.props.event))
            return <Redirect push to="/admin/events/register"/>;

        return (
            <form className="row EventExtras" onSubmit={this.onSend}>

                <div className=" col-md-3">
                    <div className="form-group">
                        <label htmlFor="name">Cupom</label>
                        <input type="name" className="form-control"  name="coupon"
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group">
                        <label htmlFor="name">Desconto (%)</label>
                        <input type="number" className="form-control" name="discount"
                        />
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="form-group">
                        <label htmlFor="name">Link de Compra</label>
                        <input type="name" className="form-control"  name="buyLink"
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <p>Música</p>
                    {this.state.musicStyle.map((m, i) => (
                        <div key={i} className="form-check">
                            <label className="form-check-label">
                                <input className="form-check-input" onClick={() => this.onMusicStyle(i)}
                                       type="checkbox" value=""/>
                                {m}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="col-md-4">
                    <p>Tipo</p>
                    {this.state.partyKind.map((p, i) => (
                        <div key={i} className="form-check">
                            <label className="form-check-label">
                                <input className="form-check-input" onClick={() => this.onPartyKind(i)}
                                       type="checkbox" value=""/>
                                {p}
                            </label>
                        </div>
                    ))}

                </div>
                <div className="col-md-4">
                    <p>Local</p>
                    {this.state.locationRegion.map((l, i) => (
                        <div key={i} className="form-check">
                            <label className="form-check-label">
                                <input className="form-check-input" onClick={() => this.onLocationRegion(i)}
                                       type="checkbox"
                                       value=""/>
                                {l}
                            </label>
                        </div>
                    ))}
                </div>

                <div className="col-12 mt-5">
                    <button disabled={this.state.isSending}
                            className="btn btn-primary  btn-block">
                        {this.state.isSending ? 'Enviando...' : 'Enviar'}</button>
                </div>
            </form>

        )
    }
}

const mapStateToProps = (state, props) => ({event: state.event});


export default connect(mapStateToProps, null)(EventExtras);