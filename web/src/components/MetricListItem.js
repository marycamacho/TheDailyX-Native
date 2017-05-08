import React from 'react';
import MetricBoxes from "./MetricBoxes";

export default function({metric}){
    return (
        <div className="metric-container">
            <div>{metric.name}</div>
            <MetricBoxes metric={metric}/>
        </div>

    );
};

