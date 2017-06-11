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

/**
 * @returns {Date} The first instant of the current day. Useful to determine if a date
 * is older than the current day
 */
function todaysDateStart() {
    var todaysDate = new Date();
    todaysDate.setHours(0, 0, 0, 0);
    return todaysDate;
}

export function getTodaysData() {
    var data = getData();

    //If the data was last stored today then return it
    if (data.dateStored > todaysDateStart()) {
        return data;
    }

    //Otherwise move the scores to historical storage and reset the current score
    data = updateHistoricalScores(data);
    data = resetScoresForToday(data);
    return data;
}

function updateHistoricalScores(currentData) {

    var historicalScores = { date: currentData.dateStored }
    currentData.metrics.forEach(m => {
        historicalScores[m.id] = m.score
    })

    currentData.scores.push(historicalScores);

    return currentData;
}

export function saveData(applicationState){
    var currentStoredData = getTodaysData()
    var newDataToStore = {
        metrics: applicationState.metrics,
        scores: currentStoredData.scores || [],
        dateStored: new Date()
    };

    if (window.localStorage){
        var dataString = JSON.stringify(newDataToStore);
        localStorage.setItem(DATA_STORAGE_KEY, dataString);
    } else {
        alert('Local Storage not Supported');
    }
}

/**
 * Used to zero out the days scores
 */
export function resetScoresForToday(currentData) {
    console.log(currentData);
    return {
        ...currentData,
        metrics: currentData.metrics.map(m => {
            return { ...m, score: 0 }
        })
    };
}

export function resetData() {
    if (window.localStorage) {
        localStorage.removeItem(DATA_STORAGE_KEY);
    }

    var data=defaultMetrics();
    saveData(data);
    return data;
}