const timeDialog = document.querySelector('#time-dialog');
const currentMonthDaysNodeList = document.querySelectorAll('.current-month-day');
const currentMonthDays = [...currentMonthDaysNodeList];

const successDialog = document.getElementById('sucess-dialog');
const buttonAnimation = document.getElementById('checkmark-svg');
const submitBtn = document.getElementById('submit-btn');

const multistepForm = document.getElementById('multistep-form');
const formSteps = [...multistepForm.querySelectorAll('[data-step]')];

const nextButton = [...multistepForm.querySelectorAll('[data-next-btn]')];
const navBarSteps = [...document.querySelectorAll('.navbar-step')];

const appointmentOptionsContainer = [...document.querySelectorAll('input[name="appointment-type"]')];//document.querySelector('.grid-container');
const appointmentOptionsArray = [...document.querySelectorAll('.form-group-radio')];

let selctedAppointmentType;

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

// Adds event listener to all days in the month to open the Time modal to select time to book
currentMonthDays.forEach(currentMonthDay => openModal('click', currentMonthDay, timeDialog))

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