let money = 30000;
let income = 'фриланс';
let addExpenses = 'Квартплата, интернет, автомобиль, кафе';
let deposit = true;
let mission = 1000000;
let period = 12;


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);
console.log('Период равен', period + ' месяцев');
console.log('Цель заработать', mission + ' рублей');

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(', ');
console.log(addExpenses);

let budgetDay;
budgetDay = money/30;
console.log(budgetDay);