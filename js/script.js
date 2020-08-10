'use strict';
const money = +prompt('Ваш месячный доход?');
const income = 'фриланс';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const expenses1 = prompt('Введите обязательную статью расходов?');
const expenses2 = prompt('Введите вторую обязательную статью расходов?');
const amount1 = +prompt('Во сколько это обойдется?');
const amount2 = +prompt('Во сколько это обойдется?');
const mission = 1000000;
const period = 12;
const budgetMonth = money - amount1 - amount2;
const budgetDay = budgetMonth / 30;


console.log(typeof money, typeof income, typeof deposit);

console.log(addExpenses.length);
console.log('Период равен', period + ' месяцев');
console.log('Цель заработать', mission + ' рублей');

console.log(addExpenses.toLowerCase().split(', '));

console.log('Бюджет на месяц', budgetMonth);
console.log('Бюджет на день', Math.floor(budgetDay));
console.log('Цель будет достигнута за:', Math.ceil(mission / budgetMonth) + ' месяцев');


if (budgetDay>= 1200) {
	console.log('У вас высокий уровень дохода!');
} else if (budgetDay >= 600) {
	console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0) {
	console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
	console.log('Что то пошло не так');
}

