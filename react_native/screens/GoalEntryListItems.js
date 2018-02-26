import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDefaultData, decrementMetricScore } from '../actions/index';
import GoalEntryListItem from './GoalEntryListItem';
import _ from 'lodash';

import './MetricList.css';

class MetricList extends Component {

    componentWillMount() {
        this.props.getDefaultData();
    }

    render() {
        return (
            <div id="metric-list">
                { this.renderList() }
            </div>
        );
    }

    renderList() {
        const metrics = this.props.metrics;
        if (!metrics) {
            return;
        }

        const orderedMetrics = _.sortBy(metrics, "order");
        return orderedMetrics
            .map(m => {
                const decrementHandler = () => this.props.decrementMetricScore(m);
                return (
                    <GoalEntryListItem metric={m} key={m.name} onDecrement={decrementHandler}/>
                )
            });
    }

}

function mapStateToProps(state) {
    return {
        metrics: state.metrics
    };
}

export default connect(mapStateToProps, { getDefaultData, decrementMetricScore })(MetricList);

