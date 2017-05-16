/**
 * Created by marycamacho on 5/2/17.
 * This component is intended to be the smallest component in the project - the square that in each metric
 * is either blank, has a single slash or a full X. The references to user here are left over from a previous project
 * and can be removed. We can decide at what level user validation should go later.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementMetricScore } from '../actions';


class MetricBox extends Component {
    render() {
        const { boxState, metric, aboveGoal } = this.props;
        const className = `metric-box ${boxState} ${aboveGoal ? "above" : ""}`;

        return (
            <div className={className} onClick={this.props.incrementMetricScore.bind(this, metric)}/>
        )
    }
}

export default connect(null, { incrementMetricScore })(MetricBox);