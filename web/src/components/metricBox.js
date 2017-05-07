/**
 * Created by marycamacho on 5/2/17.
 * This component is intended to be the smallest component in the project - the square that in each metric
 * is either blank, has a single slash or a full X. The references to user here are left over from a previous project
 * and can be removed. We can decide at what level user validation should go later.
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


