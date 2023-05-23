const newYears = '1 Jan 2024';

var days, hours, mins, seconds;

const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minsElement = document.getElementById('mins');
const secondsElement = document.getElementById('seconds');

function formatTime(time) {
    return (time < 10) ? `0${time}` : time;
}

function countdown() {
    const newYearsDate = new Date(newYears);
    console.log(newYearsDate);
    const currentDate = new Date();
    console.log(currentDate);
    
    const totalSeconds = (newYearsDate - currentDate) / 1000;
    
    days = Math.floor(totalSeconds/(3600 * 24));
    hours = Math.floor(totalSeconds/(3600)) % 24;
    mins = Math.floor(totalSeconds/(60) % (60));
    seconds = Math.floor(totalSeconds % 60);

    /*

    days = Math.floor(totalSeconds / (24 * 60 * 60));

    rem_seconds = totalSeconds - (days * 24 * 60 * 60);
    hours = Math.floor((rem_seconds) / (60 * 60));
    
    rem_seconds = rem_seconds - (hours * 60 * 60);
    mins = Math.floor((rem_seconds) / 60);
    
    rem_seconds = rem_seconds - (mins * 60);
    seconds = Math.floor(rem_seconds);
    
    */

    daysElement.innerHTML = days
    hoursElement.innerHTML = hours;
    minsElement.innerHTML = mins;
    secondsElement.innerHTML = formatTime(seconds);

}

countdown()

setInterval(countdown, 1000)