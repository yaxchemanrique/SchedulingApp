const timeDialog = document.querySelector('#time-dialog');
const currentMonthDaysNodeList = document.querySelectorAll('.current-month-day');
const currentMonthDays = [...currentMonthDaysNodeList];

const successDialog = document.getElementById('sucess-dialog');
const buttonAnimation = document.getElementById('checkmark-svg');
const submitBtn = document.getElementById('submit-btn');

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
