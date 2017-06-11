/**
 * Created by mary on 4/2/2016.
 */

const DATA_STORAGE_KEY = 'dailyData';

function defaultMetrics() {
    return {
        metrics: [
        {
            id: "water",
            name: "Water",
            metricType: "encourage",
            goal: 8,
            score: 0,
            order: 0
        },
        {
            id: "vitamins",
            name: "Vitamins",
            metricType: "encourage",
            goal: 2,
            score: 0,
            order: 1
        },
        {
            id: "calories",
            name: "Calories",
            metricType: "discourage",
            goal: 12,
            score: 0,
            order: 2
        },
        {
            id: "exercise",
            name: "Exercise",
            metricType: "encourage",
            goal: 5,
            score: 0,
            order: 3
        }
    ]}
}

function getData(){
    var dailyDataString = localStorage.getItem(DATA_STORAGE_KEY);

    if (dailyDataString) {
        let data = JSON.parse(dailyDataString);
        data.dateStored =  new Date(data.dateStored  || "");
        return data;
    } else {
        let data = defaultMetrics();
        data.dateStored = new Date();
        return data;
    }
}

export function getTodaysData() {
    var data = getData();

    var todaysDate = new Date();
    todaysDate.setHours(0, 0, 0, 0);
    if (data.dateStored > todaysDate) {
        return data;
    }

    return defaultMetrics();
}

export function saveData(applicationState){
    var data = {
        metrics: applicationState.metrics,
        scores: applicationState.scores || [],
        dateStored: new Date()
    };

    if (window.localStorage){
        var dataString = JSON.stringify(data);
        localStorage.setItem(DATA_STORAGE_KEY, dataString);
    } else {
        alert('Local Storage not Supported');
    }
}

/**
 * Used to zero out the days scores
 */
export function resetScoresForDay() {

}

export function resetData() {
    if (window.localStorage) {
        localStorage.removeItem(DATA_STORAGE_KEY);
    }

    var data=defaultMetrics();
    saveData(data);
    return data;
}