'use strict';

let isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
const income = 'фриланс';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const mission = 1000000;
const period = 12;
let expenses = [];

let start = function() {
	do {
		money = prompt('Ваш месячный доход?');
	} while (!isNumber(money));
};
start();

const showTypeOf = function (data) {
	console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

function getExpensesMonth() {
	let sum = 0;
	let expensesSum;
	for (let i = 0; i < 2; i++){
		expenses[i] = prompt('Введите обязательную статью расходов?');
		do {
			expensesSum = prompt('Во сколько это обойдется?');
		} while (!isNumber(expensesSum));
		sum += +expensesSum;
	}
	return sum;
}

const expensesAmount = getExpensesMonth();
console.log('Расходы за месяц', expensesAmount);

function getAccumulatedMonth() {
	return money - expensesAmount;
}
const accumulatedMonth = getAccumulatedMonth();
const budgetDay = accumulatedMonth / 30;

console.log(addExpenses.toLowerCase().split(', '));

function getTargetMonth() {
	return mission / accumulatedMonth;
}
if (getTargetMonth() >= 0) {
	console.log('Цель будет достигнута за:', Math.ceil(getTargetMonth()) + ' месяцев');
} else {
	console.log('Цель не будет достигнута');
}

console.log('Бюджет на день', Math.floor(budgetDay));

function getStatusIncome() {
	if (budgetDay >= 1200) {
		return ('У вас высокий уровень дохода!');
	} else if (budgetDay >= 600) {
		return ('У вас средний уровень дохода');
	} else if (budgetDay >= 0) {
		return ('К сожалению у вас уровень дохода ниже среднего');
	} else {
		return ('Что то пошло не так');
	}
}
console.log(getStatusIncome());

