import React from 'react';
import MetricBox from "./metricBox";

function renderBoxes(numberToRender, score, metric) {
    var boxes = [];
    const numberOfBoxesForGoal = Math.ceil(metric.goal / 2);

    for (var i = 1; i <= numberToRender; i++) {
        let boxState = "";
        let aboveGoal = i > numberOfBoxesForGoal;
        if (i * 2 <= score) {
            boxState = "double";
        } else if ((i * 2) - 1 === score) {
            boxState = "single";
        }

        boxes.push(
            <MetricBox key={i} boxState={boxState} aboveGoal={aboveGoal} metric={metric}/>
        )
    }
    return boxes;
}

export default function ({metric}) {
    if (metric.metricType === "encourage") {
        let numberOfBoxes = metric.score + 1 > metric.goal ?
            Math.ceil((metric.score + 1) / 2) : Math.ceil(metric.goal / 2);

        return (
            <div className="metric-boxes encourage">
                {renderBoxes(numberOfBoxes, metric.score, metric)}
            </div>
        )
    } else {
        let numberOfBoxes = Math.ceil(metric.score / 2) + 1;

        return (
            <div className="metric-boxes discourage">
                {renderBoxes(numberOfBoxes, metric.score, metric)}
            </div>
        );
    }
} ;