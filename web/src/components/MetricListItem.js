import React from 'react';
import MetricBoxes from "./MetricBoxes";

export default function({metric, onDecrement}){
    return (
        <div className="metric-container">
            <h3>{metric.name}</h3>
            <div className="boxes-and-controls">
                <MetricBoxes metric={metric}/>
                <a className="decrement-metric" title="Decrement Metric" href="#" onClick={onDecrement}>X</a>
            </div>
        </div>

    );
};



