'use strict';

const isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

const calculate = document.getElementById('start'); // Кнопка рассчитать
const cancel = document.getElementById('cancel'); // Кнопка Сбросить  
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
const DataInput = document.querySelectorAll('.data input[type = text]');
const resultInput = document.querySelectorAll('.result input[type = text]');

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
	checked: function(){
		if (salaryAmount.value !== '') {
			calculate.removeAttribute('disabled');
		}
	},
	start: function () {
		if (salaryAmount.value === '') {
			calculate.setAttribute('disabled', true);
			return;
		}
		addExpenses.setAttribute('disabled', true);
		addIncome.setAttribute('disabled', true);
		
		const allInput = document.querySelectorAll('input[type = text]');
		allInput.forEach(function (item) {
			item.setAttribute('disabled', true);
		});
		calculate.style.display = 'none';
		cancel.style.display = 'block';

		this.budget = +salaryAmount.value;

		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getAddIncome();
		this.getBudget();
		this.showResult();
	},
	reset: function() {
		this.income = {};
		this.incomeMonth = 0;
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.deposit = false;
		this.percentDeposit = 0;
		this.moneyDeposit = 0;
		this.budget = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.expensesMonth = 0;

		DataInput.forEach(function (item){
			item.value = '';
			item.removeAttribute('disabled');
			range.value = 0;
			periodAmount.innerHTML = range.value;
		});
		resultInput.forEach(function(item){
			item.value = '';
		});
		for (let i = 1; i < expensesItems.length; i++) {
			if (expensesItems[i].parentNode){
				expensesItems[i].parentNode.removeChild(expensesItems[i]);
			}
			addExpenses.style.display = 'block';
		}
		for (let i = 1; i < incomeItems.length; i++) {
			if (incomeItems[i].parentNode) {
				incomeItems[i].parentNode.removeChild(incomeItems[i]);
			}
			addIncome.style.display = 'block';
		}

		calculate.style.display = 'block';
		cancel.style.display = 'none';
		addExpenses.removeAttribute('disabled');
		addIncome.removeAttribute('disabled');
		depositCheckbox.checked = false;
	},
	showResult: function() {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = Math.round(this.budgetDay);
		expensesMonthValue.value = this.expensesMonth;
		addExpensesValue.value = this.addExpenses.join(', ');
		addIncomeMonthValue.value = this.addIncome.join(', ');
		targetMonthValue.value = Math.ceil(this.getTargetMonth());
		incomePeriodValue.value = this.calcSavedMoney();
		range.addEventListener('input', function(){
			incomePeriodValue.value = appData.calcSavedMoney();
		});
	},
	addExpensesBlock: function () {
		const cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpenses);
		expensesItems = document.querySelectorAll('.expenses-items');
		if (expensesItems.length === 3) {
			addExpenses.style.display = 'none';
		}
	},
	addIncomeBlock: function(){
		const cloneIncomeItem = incomeItems[0].cloneNode(true);
		incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncome);
		incomeItems = document.querySelectorAll('.income-items');
		if (incomeItems.length === 3) {
			addIncome.style.display = 'none';
		}
	},
	getExpensesMonth: function() {
		for (let key in this.expenses) {
			this.expensesMonth += +this.expenses[key];
		}
	},
	getBudget: function() {
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
		this.budgetDay = this.budgetMonth / 30;
	},
	getTargetMonth: function() {
		return target.value / this.budgetMonth;
	},
	getStatusIncome: function() {
		if (this.budgetDay >= 1200) {
			return ('У вас высокий уровень дохода!');
		} else if (this.budgetDay >= 600) {
			return ('У вас средний уровень дохода');
		} else if (this.budgetDay >= 0) {
			return ('К сожалению у вас уровень дохода ниже среднего');
		} else {
			return ('Что то пошло не так');
		}
	},
	getExpenses: function() {
		expensesItems.forEach(function(item){
			const itemExpenses = item.querySelector('.expenses-title').value;
			const cashExpenses = item.querySelector('.expenses-amount').value;
			if (itemExpenses !== '' && cashExpenses !== ''){
				this.expenses[itemExpenses] = cashExpenses;
			}
		}, appData);
	},
	getIncome: function(){
		incomeItems.forEach(function(item){
			const itemIncome = item.querySelector('.income-title').value;
			const cashIncome = item.querySelector('.income-amount').value;
			if (itemIncome !== '' && cashIncome !== '') {
				this.income[itemIncome] = cashIncome;
			}
		}, appData);

		for (let key in this.income){
			this.incomeMonth += +this.income[key];
		}
	},
	getAddExpenses: function() {
		const addExpenses = addExpensesItem.value.split(',');
		addExpenses.forEach(function(item){
			item = item.trim();
			if (item !== ''){
				this.addExpenses.push(item);
			}
		}, appData);
	},
	getAddIncome: function() {
		addIncomeItem.forEach(function(item){
			const itemValue = item.value.trim();
			if (itemValue !== ''){
				this.addIncome.push(itemValue);
			}
		}, appData);
	},
	getInfoDeposit: function() {
		this.deposit = confirm('Есть ли у вас депозит в банке?');
		if (this.deposit) {
			let percentDeposit;
			do {
				percentDeposit = prompt('Какой годовой процент?', '5');
			} while (!isNumber(percentDeposit));
			this.percentDeposit = percentDeposit;
			let moneyDeposit;
			do {
				moneyDeposit = prompt('Какая сумма заложена?', 15000);
			} while (!isNumber(moneyDeposit));
			this.moneyDeposit = moneyDeposit;
		}
	},
	calcSavedMoney: function() {
		return this.budgetMonth * range.value;
	},
};


calculate.addEventListener('click', appData.start.bind(appData));
addExpenses.addEventListener('click', appData.addExpensesBlock);
addIncome.addEventListener('click', appData.addIncomeBlock);
salaryAmount.addEventListener('keyup', appData.checked);
cancel.addEventListener('click', appData.reset.bind(appData));

range.addEventListener('input', function(){
	periodAmount.textContent = range.value;
});

