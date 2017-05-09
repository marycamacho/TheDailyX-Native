import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDefaultData } from '../actions/index';
import MetricListItem from './MetricListItem';

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

        return metrics.map(m => (
            <MetricListItem metric={m} key={m.name}/>
        ))
    }

}

function mapStateToProps(state) {
    return {
        metrics: state.metrics
    };
}

export default connect(mapStateToProps, { getDefaultData })(MetricList);

