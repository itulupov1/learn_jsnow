'use strict';

const isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
const start = function () {
	do {
		money = prompt('Ваш месячный доход?');
	} while (!isNumber(money));
};
start();

const appData = {
	income: {},
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	percentDeposit: 0,
	moneyDeposit: 0,
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

		if (confirm('Есть ли у вас дополнительный заработок?')) {
			let itemIncome;
			do {
				itemIncome = prompt('Какой у вас дополнительный заработок?', 'таксую');
			} while (!isNaN(itemIncome));
			let cashIncome;
			do {
				cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 10000);
			} while (!isNumber(cashIncome));
			appData.income[itemIncome] = cashIncome;
		}
		const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кино, Театр, чай, вода');
		if (addExpenses === !null || isNaN(addExpenses)) {
			appData.addExpenses = addExpenses.toLowerCase().split(', ');
		}
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
		for (let i = 0; i < 2; i++) {
			let key;
			do {
				key = prompt('Введите обязательную статью расходов?');
			} while (!isNaN(key));
			do {
				appData.expenses[key] = prompt('Во сколько это обойдется?');
			} while (!isNumber(appData.expenses[key]));
			appData.expenses[key] *= 1;
		}
	},
	getInfoDeposit: function() {
		if (appData.deposit) {
			let percentDeposit;
			do {
				percentDeposit = prompt('Какой годовой процент?', '5');
			} while (!isNumber(percentDeposit));
			appData.percentDeposit = percentDeposit;
			let moneyDeposit;
			do {
				moneyDeposit = prompt('Какая сумма заложена?', 15000);
			} while (!isNumber(moneyDeposit));
			appData.moneyDeposit = moneyDeposit;
		}
	},
	calcSavedMoney: function() {
		return appData.budgetMonth * appData.period;
	}
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();
//appData.calcSavedMoney();

console.log('Расходы за месяц:', appData.expensesMonth);
if (appData.getTargetMonth() >= 0) {
	console.log('Цель будет достигнута за:', Math.ceil(appData.getTargetMonth()) + ' месяцев');
} else {
	console.log('Цель не будет достигнута');
}
console.log(appData.getStatusIncome());
console.log('Наша программа включает в себя данные:');
for (let key in appData) {
	console.log('Ключ: ' + key + ' Значение: ' + appData[key]);
}

if ((appData.addExpenses).length > 0) {
	let addExpenses = [];
	for (let key in appData.addExpenses) {
		addExpenses += (appData.addExpenses[key])[0].toUpperCase() + (appData.addExpenses[key]).slice(1) + ', ';
		addExpenses.split(', ').toString();
	}
	console.log('Возможные расходы: ' + addExpenses.substring(0, addExpenses.length - 2));
}


const calculate = document.getElementById('start'); // Кнопка рассчитать 
const addIncome = document.getElementsByTagName('button')[0]; // 1 plus
const addExpenses = document.getElementsByTagName('button')[1]; // 2 plus
const depositCheckbox = document.querySelector('#deposit-check'); // checkbox 
const addIncomeItem = document.querySelectorAll('.additional_income-item'); // инпуты возможного дохода

const budgetMonthValue = document.getElementsByClassName('budget_month-value');
const budgetDayValue = document.getElementsByClassName('budget_day-value');
const expensesMonthValue = document.getElementsByClassName('expenses_month-value');
const addIncomeMonthValue = document.getElementsByClassName('additional_income-value');
const addExpensesValue = document.getElementsByClassName('additional_expenses-value');
const incomePeriodValue = document.getElementsByClassName('income_period-value');
const targetMonthValue = document.getElementsByClassName('target_month-value');

const salaryAmount = document.querySelector('.salary-amount'); // месячный доход
const incomeTitle = document.querySelector('input.income-title'); // имя доп дохода
const incomeAmount = document.querySelector('.income-amount'); // сумма доп дохода
const expensesTitle = document.querySelector('input.expenses-title'); // имя обязательного расхода
const expensesAmount = document.querySelector('.expenses-amount'); // сумма обязательного расхода
const addExpensesItem = document.querySelector('.additional_expenses-item'); // название возможных расходов
const target = document.querySelector('.target-amount'); // сумма цели
const range = document.querySelector('.period-select'); // период расчета
const depositBankSelect = document.querySelector('.deposit-bank'); // выбор банка, в котором депозит
const depositAmount = document.querySelector('.deposit-amount'); // сумма депозита
const depositPercent = document.querySelector('.deposit-percent'); // процент депозита
