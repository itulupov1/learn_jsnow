const money = 30000;
const income = 'фриланс';
const addExpenses = 'Квартплата, интернет, автомобиль, кафе';
const deposit = true;
const mission = 1000000;
const period = 12;
const budgetDay = money / 30;


console.log(typeof money, typeof income, typeof deposit);

console.log(addExpenses.length);
console.log('Период равен1', period + ' месяцев');
console.log('Цель заработать', mission + ' рублей');

console.log(addExpenses.toLowerCase().split(', '));

console.log(budgetDay);