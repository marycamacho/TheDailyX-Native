import React from 'react';
import MetricBox from "./metricBox";

function renderBoxes(numberToRender) {
    var boxes = [];
    for (var i = 0; i < numberToRender; i++) {
        boxes.push(
            <MetricBox/>
        )
    }
    return boxes;
}

export default function ({metric}) {
    console.log(metric);
    if (metric.metricType === "encourage") {
        return (
            <div className="metric-boxes encourage">
                {renderBoxes(metric.goal)}
            </div>
        )


    }

    return (
        <div className="metric-boxes discourage"></div>
    );
} ;