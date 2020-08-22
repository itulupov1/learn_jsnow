'use strict';

const isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

const calculate = document.getElementById('start'); // Кнопка рассчитать 
const addIncome = document.getElementsByTagName('button')[0]; // 1 plus
const addExpenses = document.getElementsByTagName('button')[1]; // 2 plus
const depositCheckbox = document.querySelector('#deposit-check'); // checkbox 
const addIncomeItem = document.querySelectorAll('.additional_income-item'); // инпуты возможного дохода
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const addIncomeMonthValue = document.getElementsByClassName('additional_income-value')[0];
const addExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount'); // месячный доход
const incomeTitle = document.querySelector('input.income-title'); // имя доп дохода
const addExpensesItem = document.querySelector('.additional_expenses-item'); // название возможных расходов
const target = document.querySelector('.target-amount'); // сумма цели
const range = document.querySelector('.period-select'); // период расчета
const periodAmount = document.querySelector('.period-amount'); //вывод числа периода
const depositBankSelect = document.querySelector('.deposit-bank'); // выбор банка, в котором депозит
const depositAmount = document.querySelector('.deposit-amount'); // сумма депозита
const depositPercent = document.querySelector('.deposit-percent'); // процент депозита
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');

const appData = {
	income: {},
	incomeMonth: 0,
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	percentDeposit: 0,
	moneyDeposit: 0,
	budget: 0,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	start: function () {

		appData.budget = +salaryAmount.value;

		appData.getExpenses();
		appData.getIncome();
		appData.getExpensesMonth();
		appData.getAddExpenses();
		appData.getAddIncome();
		appData.getBudget();

		appData.showResult();
		// appData.getTargetMonth();
		// appData.getStatusIncome();
		// appData.getInfoDeposit();
	},
	showResult: function() {
		budgetMonthValue.value = appData.budgetMonth;
		budgetDayValue.value = Math.round(appData.budgetDay);
		expensesMonthValue.value = appData.expensesMonth;
		addExpensesValue.value = appData.addExpenses.join(', ');
		addIncomeMonthValue.value = appData.addIncome.join(', ');
		targetMonthValue.value = Math.ceil(appData.getTargetMonth());
		incomePeriodValue.value = appData.calcSavedMoney();
		range.addEventListener('input', function(){
			incomePeriodValue.value = appData.calcSavedMoney();
		});
	},
	addExpensesBlock: function () {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpenses);
		expensesItems = document.querySelectorAll('.expenses-items');
		if (expensesItems.length == 3) {
			addExpenses.style.display = 'none';
		}
	},
	addIncomeBlock: function(){
		let cloneIncomeItem = incomeItems[0].cloneNode(true);
		incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncome);
		incomeItems = document.querySelectorAll('.income-items');
		if (incomeItems.length == 3) {
			addIncome.style.display = 'none';
		}
	},
	getExpensesMonth: function() {
		for (let key in appData.expenses) {
			appData.expensesMonth += +appData.expenses[key];
		}
	},
	getBudget: function() {
		appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
		appData.budgetDay = appData.budgetMonth / 30;
	},
	getTargetMonth: function() {
		return target.value / appData.budgetMonth;
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
	getExpenses: function() {
		expensesItems.forEach(function(item){
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cashExpenses = item.querySelector('.expenses-amount').value;
			if (itemExpenses !== '' && cashExpenses !== ''){
				appData.expenses[itemExpenses] = cashExpenses;
			}
		});
	},
	getIncome: function(){
		incomeItems.forEach(function(item){
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			if (itemIncome !== '' && cashIncome !== '') {
				appData.income[itemIncome] = cashIncome;
			}
		});

		for (let key in appData.income){
			appData.incomeMonth += +appData.income[key];
		}
	},
	getAddExpenses: function() {
		let addExpenses = addExpensesItem.value.split(',');
		addExpenses.forEach(function(item) {
			item = item.trim();
			if (item !== ''){
				appData.addExpenses.push(item);
			}
		});
	},
	getAddIncome: function() {
		addIncomeItem.forEach(function(item) {
			let itemValue = item.value.trim();
			if (itemValue !== ''){
				appData.addIncome.push(itemValue);
			}
		});
	},
	getInfoDeposit: function() {
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
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
		return appData.budgetMonth * range.value;
	},
};

calculate.setAttribute('disabled', true);
salaryAmount.addEventListener('input', function () {
	if (salaryAmount.value !== '') {
		calculate.removeAttribute('disabled');
	}
});

calculate.addEventListener('click', appData.start);

addExpenses.addEventListener('click', appData.addExpensesBlock);
addIncome.addEventListener('click', appData.addIncomeBlock);

range.addEventListener('input', function(){
	periodAmount.textContent = range.value;
});
// console.log('Расходы за месяц:', appData.expensesMonth);
// if (appData.getTargetMonth() >= 0) {
// 	console.log('Цель будет достигнута за:', Math.ceil(appData.getTargetMonth()) + ' месяцев');
// } else {
// 	console.log('Цель не будет достигнута');
// }
// console.log(appData.getStatusIncome());
// console.log('Наша программа включает в себя данные:');
// for (let key in appData) {
// 	console.log('Ключ: ' + key + ' Значение: ' + appData[key]);
// }

// if ((appData.addExpenses).length > 0) {
// 	let addExpenses = [];
// 	for (let key in appData.addExpenses) {
// 		addExpenses += (appData.addExpenses[key])[0].toUpperCase() + (appData.addExpenses[key]).slice(1) + ', ';
// 		addExpenses.split(', ').toString();
// 	}
// 	console.log('Возможные расходы: ' + addExpenses.substring(0, addExpenses.length - 2));
// }
