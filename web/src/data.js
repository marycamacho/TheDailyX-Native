/**
 * Created by mary on 4/2/2016.
 */

const DATA_STORAGE_KEY = 'dailyData';

function defaultData() {
    return {
        metrics: [
        {
            name: "Water",
            metricType: "encourage",
            goal: 8,
            score: 0,
            order: 0
        },
        {
            name: "Vitamins",
            metricType: "encourage",
            goal: 2,
            score: 0,
            order: 1
        },
        {
            name: "Calories",
            metricType: "discourage",
            goal: 12,
            score: 0,
            order: 2
        },
        {
            name: "Exercise",
            metricType: "encourage",
            goal: 5,
            score: 0,
            order: 3
        }
    ]}
}

export function getData(){
    var dailyDataString = localStorage.getItem(DATA_STORAGE_KEY);

    if (dailyDataString) {
        let data = JSON.parse(dailyDataString);
        data.dateStored =  new Date(data.dateStored  || "");
        return data;
    } else {
        let data = defaultData();
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

    return defaultData();
}

export function saveData(data){
    data.dateStored = new Date();
    if (window.localStorage){
        var dataString = JSON.stringify(data);
        localStorage.setItem(DATA_STORAGE_KEY, dataString);
    } else {
        alert('Local Storage not Supported');
    }
}

export function resetData() {
    if (window.localStorage) {
        localStorage.removeItem(DATA_STORAGE_KEY);
    }

    var data=defaultData();
    saveData(data);
    return data;
}


