const timeDialog = document.querySelector('#time-dialog');

const successDialog = document.getElementById('sucess-dialog');
const buttonAnimation = document.getElementById('checkmark-svg');
const submitBtn = document.getElementById('submit-btn');

const multistepForm = document.getElementById('multistep-form');
const formSteps = [...multistepForm.querySelectorAll('[data-step]')];

const nextButton = [...multistepForm.querySelectorAll('[data-next-btn]')];
const navBarSteps = [...document.querySelectorAll('.navbar-step')];

const appointmentOptionsLabels = [...document.querySelectorAll('input[name="appointment-type"]')];
const appointmentOptionsInputContainers = [...document.querySelectorAll('.form-group-radio')];

const appointmentTimeInputs = [...document.querySelectorAll('input[name="appt-time"]')];

const calendarBody = document.querySelector('.calendar-body');
const currentMonth = document.querySelector('#month-name');
const currentYear = document.querySelector('#year');
const today = new Date();
const todayDay = today.getDate();
const date = new Date();

let buttonPrevMonth;
let buttonNextMonth;
let monthIndex;

let selctedAppointmentType;
let selctedAppointmentTime;
let fullName = document.getElementById('fullName').value;
let email = '';
let description = '';
//Adds event listener to radio buttons indicating the Appointment type 
//and adds the class to distinguish wich one was selected

appointmentOptionsLabels.forEach(input => {
    input.addEventListener('click', (e)=> {
        appointmentOptionsInputContainers.forEach(type => {
            let radioOptions = [...document.querySelectorAll('input[name="appointment-type"] + label')];
            radioOptions.forEach(radio => {
                radio.removeAttribute('checked');
                radio.parentElement.classList.remove('checked-radio');
            });
        });
        e.target.setAttribute('checked', true)
        e.target.parentElement.classList.add('checked-radio');
        selctedAppointmentType = e.target.value;
    })
})

appointmentTimeInputs.forEach(input =>{
    let labelOptions = [...document.querySelectorAll('.time-tag-label')];
        input.addEventListener('click', (e) => {
            const selectedLabelId = e.target.id;
            labelOptions.forEach(label => {
                label.classList.remove('checked');
                console.log(label.id, selectedLabelId);
                if (label.id == `${selectedLabelId}-label` && !label.classList.contains('disabled')) {
                    label.classList.add('checked');
                }
            });
        })
})
//Function that sets an event Listener and opens its modal
function openModal(listener, target, modal) {
    target.addEventListener(listener, ()=> {
        modal.showModal();
    })
}

submitBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    submitBtn.style.pointerEvents = 'none';
    submitBtn.classList.add('animating');
    openModal('animationend', buttonAnimation, successDialog);
});

let currentStep = formSteps.findIndex(step => {
    return step.classList.contains('active');
});

if (currentStep < 0) {
    currentStep = 0;
    formSteps[currentStep].classList.add('active');
    cardCurrentStep();
    navbarCurrentStep();
}

nextButton.forEach(button => {
    button.addEventListener('click', ()=> {
        currentStep += 1;
        cardCurrentStep();
        navbarCurrentStep();
        setsButtonsMoveMonth();
    });
})

function cardCurrentStep() {
    formSteps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep);
    });
}

function navbarCurrentStep() {
    navBarSteps.forEach((navbarItem, index)=> {
        navbarItem.classList.toggle('current-step', index === currentStep);
    });
}

function setsButtonsMoveMonth() {
    if(currentStep === 2){
        stepThree = document.querySelector('.form-card-container.active')
        buttonPrevMonth = stepThree.querySelector('#prev-btn');
        buttonNextMonth = stepThree.querySelector('#next-btn');
        console.log('setsButtonsMoveMonth - if =2')
        eventListenerMoveMonths();
    } else {return}
}

// Render Calendar Functions and variables
const buttonsMonthFunctionClickListener = (button, move) => {
    button.addEventListener('click', () => {
        switch (move) {
            case 'next':
                date.setMonth(date.getMonth() + 1);
                break;
            case 'prev':
                date.setMonth(date.getMonth() - 1);
                break;
        }
        renderCalendar();
        eventListenerForCalendar();
    });
};

const eventListenerForCalendar = () => {
    const currentMonthDaysNodeList = document.querySelectorAll('.current-month-day');
    currentMonthDays = [...currentMonthDaysNodeList];

    // Adds event listener to all days in the month to open the Time modal to select time to book
    currentMonthDays.forEach(currentMonthDay => openModal('click', currentMonthDay, timeDialog));

    const nextMonthDaysNodeList = document.querySelectorAll('.next-month-day');
    nextMonthDays = [...nextMonthDaysNodeList];
    nextMonthDays.forEach( nextMonthDay => {
        buttonsMonthFunctionClickListener(nextMonthDay, 'next');
    });

    const prevMonthDaysNodeList = document.querySelectorAll('.prev-month-day');
    prevMonthDays = [...prevMonthDaysNodeList];
    prevMonthDays.forEach( prevMonthDay => {
        if (monthIndex > today.getMonth()) {
            buttonsMonthFunctionClickListener(prevMonthDay, 'prev');
        }
    })
};

function eventListenerMoveMonths() {
    buttonsMonthFunctionClickListener(buttonNextMonth, 'next');
    buttonsMonthFunctionClickListener(buttonPrevMonth, 'prev');
}

const renderCalendar = () => {
    date.setDate(1);
    monthIndex = date.getMonth();
    const year = date.getFullYear();

    const firstWeekDayIndex = date.getDay() - 1;
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const lastDayPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    const monthsArray = [ 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    let days = '';

    currentMonth.innerHTML = monthsArray[monthIndex];
    currentYear.innerHTML = year;

    for (let i = firstWeekDayIndex; i >= 1 ; i--) {
        days += `<div class="prev-month-day">${-1 * (i - lastDayPrevMonth)}</div>`;
    }
    
    for ( let i = 1; i <= lastDay; i++) {
        if (monthIndex < today.getMonth() && year <= today.getFullYear()){
            days += `<div class="prev-month-day cursor-not-allowed">${i}</div>`;
        } else if (monthIndex == today.getMonth()){
            if(i <= today.getDate() && year == today.getFullYear()) {
                days += `<div class="prev-month-day cursor-not-allowed">${i}</div>`;
            } else {
                days += `<div class="current-month-day">${i}</div>`;
            }
        } else {
            days += `<div class="current-month-day">${i}</div>`;
        }
    }
    
    for ( let i = 1 ; i <= 42 - firstWeekDayIndex - lastDay ; i++) {
        days += `<div class="next-month-day">${i}</div>`;
        calendarBody.innerHTML = days;
    }    
};



renderCalendar();
eventListenerForCalendar();



// Render Weather Card Functions and variables
const longitude = -99.1331785;
const latitude = 19.4326296;
const currentDate = new Date();
const currentDateTimestamp = currentDate.getTime();
const currentTimeAmPm =  currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

const currentTime = document.getElementById('currentTime');
const currentDeg = document.getElementById('curret-deg');
const highestTemp = document.getElementById('hi-temp');
const lowestTemp = document.getElementById('lo-temp');
const weatherIcon = document.getElementById('weather-icon');


const API_KEY = '33e210e3244afb4f2582929f61935a15';
const urlApi= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&dt=${currentDateTimestamp}&appid=${API_KEY}&units=metric` 

let weatherResponseJson = {};
let iconResponseJson = {};

const getCurrentWeather = async () => {
    const response = await fetch(urlApi);
    weatherResponseJson = await response.json();
    console.log(weatherResponseJson);
    
};

const renderWeather = () => {
    const currentWeatherResults = weatherResponseJson.main;
    currentTime.innerText = currentTimeAmPm;
    currentDeg.innerText = currentWeatherResults.temp;
    highestTemp.innerText = currentWeatherResults.temp_max;
    lowestTemp.innerText = currentWeatherResults.temp_min;
};

const getWeatherIcon = async () => {
    iconResponse = await fetch('./assets/icons.json');
    iconResponseJson = await iconResponse.json();
};

const renderWeatherIcon = () => {
    const iconDescription = weatherResponseJson.weather[0].description
    const weatherIconsArray = iconResponseJson.weatherIcons;
    console.log(iconDescription);
    const matchingIndexIconName = weatherIconsArray.findIndex(name => name.name == iconDescription);
    console.log(matchingIndexIconName);
    if (matchingIndexIconName >= 0) {
        weatherIcon.innerHTML = weatherIconsArray[matchingIndexIconName].svg
    } else {
        weatherIcon.innerHTML = weatherIconsArray[2].svg
    }
}

(async() => {
    await getCurrentWeather();
    renderWeather();
    await getWeatherIcon();
    renderWeatherIcon();
})();
