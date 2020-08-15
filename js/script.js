'use strict';

let isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let start = function () {
	do {
		money = prompt('Ваш месячный доход?');
	} while (!isNumber(money));
};
start();

let appData = {
	income: {},
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	mission: 1000000,
	period: 12,
	budget: money,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	getExpensesMonth: function() {
		for (let key in appData.expenses) {
			appData.expensesMonth += appData.expenses[key];
		}
		return appData.expensesMonth;
	},
	getBudget: function() {
		appData.budgetMonth = appData.budget - appData.expensesMonth;
		appData.budgetDay = appData.budgetMonth / 30;
	},
	getTargetMonth: function() {
		return appData.mission / appData.budgetMonth;
	},
	getStatusIncome: function() {
		if (appData.budgetDay >= 1200) {
			return ('У вас высокий уровень дохода!');
		} else if (appData.budgetDay >= 600) {
			return ('У вас средний уровень дохода');
		} else if (appData.budgetDay >= 0) {
			return ('К сожалению у вас уровень дохода ниже среднего');
		} else {
			return ('Что то пошло не так');
		}
	},
	asking: function () {
		const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
		appData.addExpenses = addExpenses.toLowerCase().split(', ');
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
		for (let i = 0; i < 2; i++) {
			let key = prompt('Введите обязательную статью расходов?');
			do {
				appData.expenses[key] = +prompt('Во сколько это обойдется?');
			} while (!isNumber(appData.expenses[key]));
		}
	}
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log('Расходы за месяц:', appData.expensesMonth);
if (appData.getTargetMonth() >= 0) {
	console.log('Цель будет достигнута за:', Math.ceil(appData.getTargetMonth()) + ' месяцев');
} else {
	console.log('Цель не будет достигнута');
}
console.log(appData.getStatusIncome());
