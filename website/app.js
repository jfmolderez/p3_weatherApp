/* Global Variables */
const apikey = 'e8621bc51d871e3032bf9d1f8e2624f4'
const prefix_url = 'https://api.openweathermap.org/data/2.5/weather?';


const getCurrentTemperature = async (zip)=> {
    const url = `${prefix_url}zip=${zip},us&appid=${apikey}`;
    const res = await fetch(url);
    try {
        const data = await res.json();
        console.log(data);
        return {temp: data.main.temp, success: true};         
    } catch(error) {
        console.log("error : ", error);
        return {success: false}
    }
}

const postData = async (url, data) => {
    const fetchResponse = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const data = await fetchResponse.json();
        return data;
    } catch(error) {
        console.log('postData - error : ', error);
    }
}

const updateUI = async (success) => {

    const res = await fetch('/all');
    const fullData = await res.json();
    const data = fullData.data;
    const n = fullData.results; 

    if (n > 0) {    
        const entry = data[n - 1];
        document.getElementById('date').innerHTML = entry['date'];
        document.getElementById('temp').innerHTML = entry['temperature'];
        document.getElementById('content').innerHTML = entry['comment'];
        document.getElementById('warning').innerHTML = '';
    } else {
        document.getElementById('date').innerHTML = '';
        document.getElementById('temp').innerHTML = '';
        document.getElementById('content').innerHTML = '';
        document.getElementById('warning').innerHTML = 'Warning : no entries !!!';
    }
    if (!success) {
        document.getElementById('warning').innerHTML = "Warning : could not get a temperature based on the last zip code entered!"
    }   
}

const performAction = async (e) => {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const tempRecord = await getCurrentTemperature(zip)
    if (tempRecord.success) {
        const posted = await postData('/all', {temperature: tempRecord.temp, comment: feelings, date: newDate});
        updateUI(true);
    } else {
        updateUI(false)
    }
};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// 

document.getElementById('generate').addEventListener('click', performAction);

