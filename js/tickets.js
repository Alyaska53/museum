const type = document.querySelector('.tickets-type');
const tick = document.getElementsByName('radio');
const totalEuro = document.querySelector('.total-euro');

const basicNumber = document.querySelector('.basic-number');
const basicMinus = document.querySelector('.basic-minus');
const basicPlus = document.querySelector('.basic-plus');

const seniorNumber = document.querySelector('.senior-number');
const seniorMinus = document.querySelector('.senior-minus');
const seniorPlus = document.querySelector('.senior-plus');

let typeValue = localStorage.getItem('typeValue') || 20;
let basicValue = localStorage.getItem('basicValue') || 0;
let seniorValue = localStorage.getItem('seniorValue') || 0;
let total = localStorage.getItem('totalMoneyEuro') || 0;

for (let i = 0; i < tick.length; i++) {
  if (tick[i].type == "radio" && tick[i].value == localStorage.getItem('typeValue')) {
    tick[i].checked = true;
  }
}

totalEuro.innerText = `Total € ${total}`;
basicNumber.value = basicValue;
seniorNumber.value = seniorValue;

function calc() {
  total = (typeValue * basicValue) +  (typeValue / 2 * seniorValue);
  totalEuro.innerText = `Total € ${total}`;
  localStorage.setItem('totalMoneyEuro', total);
  localStorage.setItem('basicValue', basicValue);
  localStorage.setItem('seniorValue', seniorValue);
}

type.addEventListener('click', function() {
  for (let i = 0; i < tick.length; i++) {
    if (tick[i].checked) {
      typeValue = tick[i].value;
      localStorage.setItem('typeValue', typeValue);
      calc();
    } 
  } 
})

basicPlus.addEventListener('click', function() {
  basicValue = basicNumber.value;
  calc();
})

basicMinus.addEventListener('click', function() {
  basicValue = basicNumber.value;
  calc();
})

seniorPlus.addEventListener('click', function() {
  seniorValue = seniorNumber.value;
  calc();
})

seniorMinus.addEventListener('click', function() {
  seniorValue = seniorNumber.value;
  calc();
})


calc();





