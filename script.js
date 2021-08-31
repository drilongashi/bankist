'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Linda Surdulli',
  movements: [700, 450, -300, 3000, -850, 1100, 70, 1300],
  interestRate: 1.2, // %
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false){
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a,b) => a -b) : movements;

movs.forEach(function (mov, i,){
  const type = mov > 0 ? 'deposit' : 'withdrawal';

  const html =`
          <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1}${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
  `;
  containerMovements.insertAdjacentHTML('afterbegin', html);

});
};

const calcDisplayBalance = function (acc){
   acc.balance = acc.movements.reduce((acc, mov) => acc
      + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc){
  const incomes = acc.movements
      .filter(mov => mov > 0)
      .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
      .filter( mov => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
      .filter(mov => mov > 0)
      .map(deposit => (deposit * acc.interestRate) / 100)
      .filter((int, i, arr) => {
        return int >= 1;
      })
      .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;

};

const createUsernames = function (accs){
  accs.forEach(function (acc){
   acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map(name =>  name[0])
        .join('');
  })
};
createUsernames(accounts);

const updateUI = function (acc){
  // Display movements
  displayMovements(acc.movements)

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);

};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e){
  // Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username ===
      inputLoginUsername.value);
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.
      value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount
        .owner
        .split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields after login
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);

  }
  });

btnTransfer.addEventListener('click', function (e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
      acc => acc.username === inputTransferTo.value
  );
inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 &&
      receiverAcc &&
      currentAccount.balance >= amount &&
  receiverAcc?.username !== currentAccount.username){
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e){
  e.preventDefault();

  if (
      inputCloseUsername.value === currentAccount.
  username &&
  Number(inputClosePin.value) === currentAccount.pin
  )
  {
    const index = accounts.findIndex(
        acc => acc.username === currentAccount.username
    );

    //Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;

  }
  inputCloseUsername.value = inputClosePin = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e){
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})




/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

/*
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2));
console.log([...arr]);

// SPLICE

console.log(arr.splice(2));

// REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);

console.log([...arr, ...arr2]);
*/

/*const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()){
  if(movement > 0){
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  }else {
    console.log(`Movement ${i + 1}: You withdraw ${Math.abs(movement)}`)
  }
}
console.log('------ FOR EACH ------');

movements.forEach(function (mov, i, arr){
  if(mov > 0){
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  }else {
    console.log(`Movement ${i + 1}: You withdraw ${Math.abs(mov)}`)
  }
});*/

/*const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map){
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);*/

/*const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

/!*const movementsUSD = movements.map(function (mov){
  return mov * eurToUsd;
});*!/

const movementsUSD = movements.map((mov) =>
   mov * eurToUsd);

/!*const movementsUSD = movements.map(function (mov){
  return mov * eurToUsd;
});*!/

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for(const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSD);

const movementsDescriptions = movements.map((mov, i) =>
`Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdre'} ${Math.abs(mov)}`
);

console.log(movementsDescriptions);*/

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUsd = 1.1;

const movementsUSD = movements.map(mov => mov * euroToUsd);
console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * euroToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map((mov, i) =>
    `Movement ${i + 1}: You ${ mov > 0 ? 'deposited' : 'withdraw'} ${Math.abs(mov)}`
);
console.log(movementsDescriptions);
*/

/*
//Filter method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(function (mov){
  return mov > 0;
})
console.log(movements);

const withdrawls = movements.filter(mov => mov < 0);
console.log(withdrawls);
*/

/*const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);*/

// accumulator -> SNOWBALL
/*const balance = movements.reduce(function (acc, cur, i, arr){
  console.log(`Iteration ${i}: ${acc}`)
  return acc + cur;
}, 0);
console.log(balance);*/

/*
// accumulator with arrow function
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balance2 = 0;
for(const mov of movements){
 balance2+=mov;
};
console.log(balance2);
*/

// Maximum value of movements value with reduce

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const max = movements.reduce((acc, mov) => {
  console.log(acc, mov);
  if(acc > mov)
    return acc;
  else return mov;
}, movements[0]);
console.log(max);
*/

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
const totalDeposit = movements
    .filter(mov => mov > 0)
    .map(mov => mov * eurToUsd)
    .reduce((acc, mov) => acc + mov, 0);
console.log(totalDeposit);
*/

/*
// find method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner ===
'Jessica Davis');
console.log(account);
*/

/*const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements);

//EQUALITY
console.log(movements.includes(-130));

// some condition
const anyDepost = movements.some(mov => mov > 0);

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDepost);

// EVERY
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));*/

/*
//flat
const arr = [[1,2,3], [4,5,6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1,2],3], [4,[5,6]], 7, 8];
console.log(arrDeep.flat(2));

// flat
const overalBalance = accounts
    .map(acc => acc.movements)
    .flat()
    .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// flatMap
const overalBalance = accounts
    .flatMap(acc => acc.movements)
    .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);*/

/*// String
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

// Numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];*/

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// Ascending
/*movements.sort((a, b) => {
  if(a > b) return 1;
  if(a < b) return -1;
});*/
/*movements.sort((a,b) => a -b);
console.log(movements);*/

// Descending
/*movements.sort((a, b) => {
  if(a > b) return -1;
  if(a < b) return 1;
});*/
/*
movements.sort((a,b => b -a));
console.log(movements);
*/
/*
const arr = [1,2,3,4,5,6,7];
console.log(new Array(1,2,3,4,5,6,7));

// Empty arrays + fill method
const x = new Array(7);
console.log(x);

x.fill(1, 3,5);
x.fill(1);
console.log(x);

arr.fill(23, 4, 6);
console.log(arr);

// Array.from
const y =Array.from({length: 7}, ()=> 1);
console.log(y);

const z = Array.from({length: 7}, (cur, i) => i + 1);
console.log(z);



labelBalance.addEventListener('click', function (){
  const movementsUI = Array.from(document.
  querySelectorAll('.movements__value'));

  console.log(movementsUI);

});*/

// Array Methods Practice
// 1.
const bankDepositSum = accounts
    .flatMap(acc => acc.movements)
    .filter(mov => mov > 0)
    .reduce((sum, cur) => sum + cur,0);

console.log(bankDepositSum);

/*// 2.
const numDeposits1000 = accounts
    .flatMap(acc => acc.movements).filter(mov => mov >= 1000).length;*/

/*const numDeposits1000 = accounts
    .flatMap(acc => acc.movements)
    .reduce((count, cur) => curr >= 1000 ? count + 1 : count , 0);

console.log(numDeposits1000);*/

/*// 3.
const sums = const numDeposits1000 = accounts
    .flatMap(acc => acc.movements).reduce((sums, cur) => {
      cur > 0 ? sums.deposits += cur : sums.withdrawals
      += cur;
      return sums;
    }, {deposits: 0, withdrawals: 0})
console.log(sums);*/

/*// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title){
  const exceptions = ['a','an', 'and','the','but','or','on','in','with'];

  const titleCase = title
      .toLowerCase()
      .split(' ')
      .map(word => exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)).join(' ');
  return titleCase;
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another tittle with an EXAMPLE'));*/






















