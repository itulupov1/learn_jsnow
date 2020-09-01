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
const valueSelect = depositBankSelect.value;

class AppData {
	constructor() {
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
	}
	checked() {
		if (salaryAmount.value !== '') {
			calculate.removeAttribute('disabled');
		}
	}
	start() {
		if (salaryAmount.value === '') {
			calculate.setAttribute('disabled', true);
			return;
		}

		addExpenses.setAttribute('disabled', true);
		addIncome.setAttribute('disabled', true);

		const allInput = document.querySelectorAll('input[type = text]');
		allInput.forEach(item => item.setAttribute('disabled', true));
		calculate.style.display = 'none';
		cancel.style.display = 'block';
		depositCheckbox.setAttribute('disabled', true);
		depositBankSelect.setAttribute('disabled', true);

		this.budget = +salaryAmount.value;

		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getAddIncome();
		this.getInfoDeposit();
		this.getBudget();
		this.showResult();
	}
	reset() {
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

		DataInput.forEach(item => {
			item.value = '';
			item.removeAttribute('disabled');
			range.value = 0;
			periodAmount.innerHTML = range.value;
		});
		resultInput.forEach(item => item.value = '');
		depositCheckbox.removeAttribute('disabled');
		depositBankSelect.removeAttribute('disabled');

		const itemClear = item => {
			const startStr = item.className;
			const items = document.querySelectorAll(`.${startStr}`);
			for (let i = 1; i < items.length; i++) {
				if (items[i].parentNode) {
					items[i].parentNode.removeChild(items[i]);
				}
			}
		};
		expensesItems.forEach(itemClear);
		incomeItems.forEach(itemClear);

		addExpenses.style.display = 'block';
		addIncome.style.display = 'block';
		calculate.style.display = 'block';
		cancel.style.display = 'none';
		addExpenses.removeAttribute('disabled');
		addIncome.removeAttribute('disabled');
		depositCheckbox.checked = false;
		depositPercent.style.display = 'none';
		depositBankSelect.style.display = 'none';
		depositAmount.style.display = 'none';
		depositBankSelect.value = '';
	}
	showResult() {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = Math.round(this.budgetDay);
		expensesMonthValue.value = this.expensesMonth;
		addExpensesValue.value = this.addExpenses.join(', ');
		addIncomeMonthValue.value = this.addIncome.join(', ');
		targetMonthValue.value = Math.ceil(this.getTargetMonth());
		incomePeriodValue.value = this.calcSavedMoney();
	}
	rangeEvent() {
		incomePeriodValue.value = this.calcSavedMoney();
		periodAmount.textContent = range.value;
	}
	addExpensesBlock() {
		const cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpenses);
		expensesItems = document.querySelectorAll('.expenses-items');
		if (expensesItems.length === 3) {
			addExpenses.style.display = 'none';
		}
	}
	addIncomeBlock() {
		const cloneIncomeItem = incomeItems[0].cloneNode(true);
		incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncome);
		incomeItems = document.querySelectorAll('.income-items');
		if (incomeItems.length === 3) {
			addIncome.style.display = 'none';
		}
	}
	getExpensesMonth() {
		for (let key in this.expenses) {
			this.expensesMonth += +this.expenses[key];
		}
	}
	getBudget() {
		const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
		this.budgetDay = this.budgetMonth / 30;
	}
	getTargetMonth() {
		return target.value / this.budgetMonth;
	}
	getStatusIncome() {
		if (this.budgetDay >= 1200) {
			return ('У вас высокий уровень дохода!');
		}
		else if (this.budgetDay >= 600) {
			return ('У вас средний уровень дохода');
		}
		else if (this.budgetDay >= 0) {
			return ('К сожалению у вас уровень дохода ниже среднего');
		}
		else {
			return ('Что то пошло не так');
		}
	}
	getExpenses() {
		expensesItems.forEach(item => {
			const itemExpenses = item.querySelector('.expenses-title').value;
			const cashExpenses = item.querySelector('.expenses-amount').value;
			if (itemExpenses !== '' && cashExpenses !== '') {
				this.expenses[itemExpenses] = cashExpenses;
			}
		}, this);
	}
	getIncome() {
		incomeItems.forEach(item => {
			const itemIncome = item.querySelector('.income-title').value;
			const cashIncome = item.querySelector('.income-amount').value;
			if (itemIncome !== '' && cashIncome !== '') {
				this.income[itemIncome] = cashIncome;
			}
		}, this);

		for (let key in this.income) {
			this.incomeMonth += +this.income[key];
		}
	}
	getAddExpenses() {
		const addExpenses = addExpensesItem.value.split(',');
		addExpenses.forEach(item => {
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
			}
		}, this);
	}
	getAddIncome() {
		addIncomeItem.forEach(item => {
			const itemValue = item.value.trim();
			if (itemValue !== '') {
				this.addIncome.push(itemValue);
			}
		}, this);
	}
	getInfoDeposit() {
		if (this.deposit) {
			this.percentDeposit = depositPercent.value;
			this.moneyDeposit = depositAmount.value;
		}
	}
	calcSavedMoney() {
		return this.budgetMonth * range.value;
	}
	changePercent() {
		const valueSelect = depositBankSelect.value;
		if (valueSelect === 'other') {
			depositPercent.style.display = 'inline-block';
			depositPercent.addEventListener('keyup', this.checkedPercent);
		} else if (valueSelect === '') {
			calculate.setAttribute('disabled', true);
		} else {
			depositPercent.value = valueSelect;
			depositPercent.removeEventListener('keyup', this.checkedPercent);
			depositPercent.style.display = 'none';
			if (depositAmount.value) {
				calculate.removeAttribute('disabled');
			} else {
				depositAmount.addEventListener('keyup', function () {
					if (depositAmount.value) {
						calculate.removeAttribute('disabled');
					}
				});
			}
		}
	}

	depositHandler() {
		if (depositCheckbox.checked) {
			calculate.setAttribute('disabled', true);
			depositBankSelect.style.display = 'inline-block';
			depositAmount.style.display = 'inline-block';
			this.deposit = true;
			depositBankSelect.addEventListener('change', this.changePercent.bind(this));
		}
		else {
			depositBankSelect.style.display = 'none';
			depositAmount.style.display = 'none';
			depositBankSelect.value = '';
			depositAmount.value = '';
			depositPercent.value = '';
			this.deposit = false;
			depositBankSelect.removeEventListener('change', this.changePercent.bind(this));
			depositPercent.style.display = 'none';
		}
	}
	checkedPercent() {
		if (depositPercent.value < 0 || depositPercent.value > 100 || depositPercent.value === '' || isNaN(depositPercent.value) === true) {
			alert("Введите корректное значение в поле проценты");
			calculate.setAttribute('disabled', true);
			depositPercent.value = '';
		} else {
			calculate.removeAttribute('disabled');
		}

	}

	eventListeners() {
		calculate.addEventListener('click', this.start.bind(this));
		addExpenses.addEventListener('click', this.addExpensesBlock);
		addIncome.addEventListener('click', this.addIncomeBlock);
		salaryAmount.addEventListener('keyup', this.checked);
		cancel.addEventListener('click', this.reset.bind(this));
		range.addEventListener('input', this.rangeEvent.bind(this));

		depositCheckbox.addEventListener('change', this.depositHandler.bind(this));
	}
}


const appData = new AppData();
appData.eventListeners();
