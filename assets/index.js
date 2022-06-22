const timeDialog = document.querySelector('#time-dialog');

const successDialog = document.getElementById('sucess-dialog');
const buttonAnimation = document.getElementById('checkmark-svg');
const submitBtn = document.getElementById('submit-btn');

const multistepForm = document.getElementById('multistep-form');
const formSteps = [...multistepForm.querySelectorAll('[data-step]')];

const nextButton = [...multistepForm.querySelectorAll('[data-next-btn]')];
const navBarSteps = [...document.querySelectorAll('.navbar-step')];

const appointmentOptionsContainer = [...document.querySelectorAll('input[name="appointment-type"]')];
const appointmentOptionsArray = [...document.querySelectorAll('.form-group-radio')];

let selctedAppointmentType;
let fullName = document.getElementById('fullName').value;
let email = '';
let description = '';

//Adds event listener to radio buttons indicating the Appointment type 
//and adds the class to distinguish wich one was selected

appointmentOptionsContainer.forEach(input => {
    input.addEventListener('click', (e)=> {
        appointmentOptionsArray.forEach(type => {
            let selectedRadio = [...document.querySelectorAll('input[type="radio"] + label')];
            selectedRadio.forEach(radio => {
                radio.removeAttribute('checked');
                radio.parentElement.classList.remove('checked-radio');
            });
        });
        e.target.setAttribute('checked', true)
        e.target.parentElement.classList.add('checked-radio');
        selctedAppointmentType = e.target.value;
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
    navbarCurrentStep()
}

nextButton.forEach(button => {
    button.addEventListener('click', ()=> {
        currentStep += 1;
        cardCurrentStep();
        navbarCurrentStep()
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

// Render Calendar Functions and variables
const calendarBody = document.querySelector('.calendar-body');
const currentMonth = document.querySelector('#month-name');
const currentYear = document.querySelector('#year');

const date = new Date();
date.setDate(1);
const monthIndex = date.getMonth();
const year = date.getFullYear();

const firstWeekDayIndex = date.getDay() - 1;
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const lastDayPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

const monthsArray = [ 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
let days = '';

currentMonth.innerHTML = monthsArray[monthIndex];
currentYear.innerHTML = year;

const renderCalendar = () => {
    for (let i = firstWeekDayIndex; i >= 1 ; i--) {
        days += `<div class="prev-month-day">${-1 * (i - lastDayPrevMonth)}</div>`;
    }
    
    for ( let i = 1; i <= lastDay; i++) {
        days += `<div class="current-month-day">${i}</div>`;
    }
    
    for ( let i = 1 ; i <= 42 - firstWeekDayIndex - lastDay ; i++) {
        days += `<div class="next-month-day">${i}</div>`;
        calendarBody.innerHTML = days;
    }

    const currentMonthDaysNodeList = document.querySelectorAll('.current-month-day');
    currentMonthDays = [...currentMonthDaysNodeList];

    // Adds event listener to all days in the month to open the Time modal to select time to book
    currentMonthDays.forEach(currentMonthDay => openModal('click', currentMonthDay, timeDialog))
};

renderCalendar();

