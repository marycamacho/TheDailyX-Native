/**
 * Created by marycamacho on 5/2/17.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/index';

class MetricBox extends Component {

    componentWillMount() {
        this.props.fetchUser();
    }

    render () {
        const {box} = this.props;

        if(!this.props.user) {
            return <div>Loading...</div>
        } else {

           return (
                <div>

                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return{user: state.currentUser.user}
}

export default connect(mapStateToProps, { fetchUser} ) (MetricBox);


