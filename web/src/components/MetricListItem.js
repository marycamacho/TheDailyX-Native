import React from 'react';
import MetricBoxes from "./MetricBoxes";

export default function({metric}){
    return (
        <div className="metric-container">
            <h3>{metric.name}</h3>
            <MetricBoxes metric={metric}/>
        </div>

    );
};

