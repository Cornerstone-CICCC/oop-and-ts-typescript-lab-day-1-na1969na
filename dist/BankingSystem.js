"use strict";
// 🏦 Create a banking system where users can create accounts, deposit, withdraw, and check their balance.
// 1. Implement a function `createAccount` that adds a new account to the `accounts` array. It should return a `BankAccount` object.
// 2. Implement a function `processTransaction` that allows deposits and withdrawals and stores them in the transactions array. It should return a string.
// 3. Implement a function `getBalance` that returns the balance of a given account number.
// 4. Implement a function `getTransactionHistory` that returns the list of transactions for an account.
// 5. Implement a function `checkActiveStatus` that returns the active status of an account number.
// 6. Implement a function `closeAccount` that removes an account from the array and returns a confirmation string.
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["Deposit"] = 0] = "Deposit";
    TransactionType[TransactionType["Withdraw"] = 1] = "Withdraw";
})(TransactionType || (TransactionType = {}));
const accounts = [];
function createAccount(accountNo, firstname, lastname, initialDeposit, isActive = true) {
    const account = {
        accountNo,
        firstname,
        lastname,
        balance: initialDeposit,
        isActive,
        transactions: [],
    };
    accounts.push(account);
    return account;
}
function processTransaction(accountNo, amount, transactionType) {
    const account = accounts.find((account) => account.accountNo === accountNo);
    if (!account) {
        return "Account not found";
    }
    if (transactionType === TransactionType.Deposit) {
        account.balance += amount;
        account.transactions.push({
            accountNo,
            amount,
            type: TransactionType.Deposit,
        });
        return `${amount} deposited into account number ${accountNo}`;
    }
    else {
        if (account.balance < amount) {
            return "Insufficient funds for withdrawal";
        }
        account.balance -= amount;
        account.transactions.push({
            accountNo,
            amount,
            type: TransactionType.Withdraw,
        });
        return `${amount} withdrawn from account number ${accountNo}`;
    }
}
function getBalance(accountNo) {
    const account = accounts.find((account) => account.accountNo === accountNo);
    if (!account) {
        return 0;
    }
    return account.balance;
}
function getTransactionHistory(accountNo) {
    const account = accounts.find((account) => account.accountNo === accountNo);
    if (!account) {
        return [];
    }
    return account.transactions;
}
function checkActiveStatus(accountNo) {
    const account = accounts.find((account) => account.accountNo === accountNo);
    if (!account) {
        return false;
    }
    return account.isActive;
}
function closeAccount(accountNo) {
    const index = accounts.findIndex((account) => account.accountNo === accountNo);
    if (index === -1) {
        return "Account not found";
    }
    accounts.splice(index, 1);
    return `Account number ${accountNo} closed`;
}
// Test cases (students should add more)
console.log(createAccount(1, "John", "Smith", 100)); // { accountNo: 1, firstname: "John", lastname: "Smith", balance: 100, isActive: true, transactions: [] }
console.log(processTransaction(1, 50, TransactionType.Deposit)); // "50 deposited into account number 1"
console.log(processTransaction(1, 20, TransactionType.Withdraw)); // "20 withdrawn from account number 1"
console.log(processTransaction(1, 500, TransactionType.Withdraw)); // "Insufficient funds for withdrawal"
console.log(getBalance(1)); // 130
console.log(getTransactionHistory(1)); // [{ accountNo: 1, amount: 50, type: TransactionType.Deposit }, { accountNo: 1, amount: 20, type: TransactionType.Withdraw }]
console.log(checkActiveStatus(1)); // true
console.log(closeAccount(1)); // "Account number 1 closed"
