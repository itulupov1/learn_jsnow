'use strict';
const money = +prompt('Ваш месячный доход?', 45000);
const income = 'фриланс';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const expenses1 = prompt('Введите обязательную статью расходов?', 'бензин');
const expenses2 = prompt('Введите вторую обязательную статью расходов?', 'кофе');
const amount1 = +prompt('Во сколько это обойдется?', 10000);
const amount2 = +prompt('Во сколько это обойдется?', 5000);
const mission = 1000000;
const period = 12;
const accumulatedMonth = getAccumulatedMonth();
const budgetDay = accumulatedMonth / 30;


const showTypeOf = function (data) {
	console.log(data, typeof(data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log(addExpenses.toLowerCase().split(', '));

console.log('Расходы за месяц', getExpensesMonth());
console.log('Бюджет на день', Math.floor(budgetDay));
console.log('Цель будет достигнута за:', Math.ceil(getTargetMonth()) + ' месяцев');

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

function getExpensesMonth() {
	return amount1 + amount2;
}

function getAccumulatedMonth() {
	return money - amount1 - amount2;
}

function getTargetMonth() {
	return mission / accumulatedMonth;
}