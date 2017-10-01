import React, {Component} from 'react';
import FacebookEvent from "../facebook-event/FacebookEvent";
import './RegisterPage.css';

class RegisterPage extends Component {

    componentDidMount() {

    }



    render() {
        return (
            <div className="RegisterPage container">
                <FacebookEvent/>

            </div>
        )
    }
}

export default RegisterPage;