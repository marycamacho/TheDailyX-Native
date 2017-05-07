/**
 * Created by mary on 4/2/2016.
 */
export function defaultData() {
    return [
        {
            name: "Water",
            metricType: "encourage",
            goal: 8
        },
        {
            name: "Vitamins",
            metricType: "encourage",
            goal: 2
        },
        {
            name: "Calories",
            metricType: "discourage",
            goal: 12
        },
        {
            name: "Exercise",
            metricType: "encourage",
            goal: 5
        }
    ]
}

function getData(){
    var dailyDataString = localStorage.getItem('dailyData');

    if (dailyDataString) {
        var data = JSON.parse(dailyDataString);
        data.dateStored =  data.dateStored || new Date();
        return data;
    } else {
        return {
            dateStored: new Date()
        };
    }
}

function saveData(data){
    data.dateStored = new Date();
    if (window.localStorage){
        var dataString = JSON.stringify(data);
        console.log(dataString);
        localStorage.setItem('dailyData',dataString);
    } else {
        alert('Local Storage not Supported');
    }
}

function resetData () {
    var data={
        dateStored: new Date()
    };
    saveData(data);
    return data;
}


