const formTrigger = document.querySelector('.tickets-buy'),
      form = document.querySelector('.overlay'),
      formCloseBtn = document.querySelector('.form-close');

formTrigger.addEventListener('click', () => {
  form.classList.add('show');
  form.classList.remove('hide');
});

function closeForm() {
  form.classList.add('hide');
  form.classList.add('show');
}

formCloseBtn.addEventListener('click', closeForm);

form.addEventListener('click', (e) => {
  if(e.target === form) {
      closeForm();
  }
});

document.addEventListener('keydown', (e) => {
  if(e.code === 'Escape' && form.classList.contains('show')) {
    closeForm();
  }
});

const dateInput = document.querySelector('#date').
      timeInput = document.querySelector('#time');

dateInput.addEventListener('click', function() {
  dateInput.classList.add('date');
  dateInput.classList.add('calendar');
});

timeInput.addEventListener('click', function() {
  timeInput.classList.add('time');
});