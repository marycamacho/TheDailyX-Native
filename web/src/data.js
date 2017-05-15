/**
 * Created by mary on 4/2/2016.
 */
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
    var dailyDataString = localStorage.getItem('dailyData');

    if (dailyDataString) {
        let data = JSON.parse(dailyDataString);
        data.dateStored =  data.dateStored || new Date();
        return data;
    } else {
        let data = defaultData();
        data.dateStored = new Date();
        return data;
    }
}

export function saveData(data){
    data.dateStored = new Date();
    if (window.localStorage){
        var dataString = JSON.stringify(data);
        console.log(dataString);
        localStorage.setItem('dailyData',dataString);
    } else {
        alert('Local Storage not Supported');
    }
}

// function resetData () {
//     var data={
//         dateStored: new Date()
//     };
//     saveData(data);
//     return data;
// }


