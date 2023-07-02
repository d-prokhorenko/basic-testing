import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import _ from 'lodash';

jest.unmock('lodash');

describe('BankAccount', () => {
  const initialBalance = 100;
  let bankAccount = getBankAccount(initialBalance);

  beforeEach(() => {
    bankAccount = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount).toBeDefined();
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const amount = initialBalance + 100;
    const message = `Insufficient funds: cannot withdraw more than ${initialBalance}`;
    const result = () => bankAccount.withdraw(amount);

    expect(result).toThrow(InsufficientFundsError);
    expect(result).toThrow(message);
  });

  test('should throw error when transferring more than balance', () => {
    const newBankAccount = getBankAccount(initialBalance);
    const amount = initialBalance + 100;
    const message = `Insufficient funds: cannot withdraw more than ${initialBalance}`;
    const result = () => bankAccount.transfer(amount, newBankAccount);

    expect(result).toThrow(InsufficientFundsError);
    expect(result).toThrow(message);
  });

  test('should throw error when transferring to the same account', () => {
    const amount = 100;
    const message = 'Transfer failed';
    const result = () => bankAccount.transfer(amount, bankAccount);

    expect(result).toThrow(TransferFailedError);
    expect(result).toThrow(message);
  });

  test('should deposit money', () => {
    const amount = 100;
    const expected = amount + initialBalance;

    bankAccount.deposit(amount);

    const result = bankAccount.getBalance();

    expect(result).toBe(expected);
  });

  test('should withdraw money', () => {
    const amount = initialBalance - initialBalance / 2;
    const expected = initialBalance - amount;

    bankAccount.withdraw(amount);

    const result = bankAccount.getBalance();

    expect(result).toBe(expected);
  });

  test('should transfer money', () => {
    const amount = initialBalance - initialBalance / 2;
    const expected = initialBalance - amount;
    const newBankAccount = getBankAccount(initialBalance);

    bankAccount.transfer(amount, newBankAccount);

    const result = bankAccount.getBalance();
    const newBankAccountBalanceExpected = initialBalance + amount;
    const newBankAccountBalanceResult = newBankAccount.getBalance();

    expect(result).toBe(expected);
    expect(newBankAccountBalanceResult).toBe(newBankAccountBalanceExpected);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    _.random = jest.fn(() => 1);

    const result = await bankAccount.fetchBalance();

    await expect(typeof result === 'number').toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const synchronizedBalance = 1;

    _.random = jest.fn(() => synchronizedBalance);

    await bankAccount.synchronizeBalance();

    const result = bankAccount.getBalance();
    const expected = synchronizedBalance;

    await expect(result).toBe(expected);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    _.random = jest.fn(() => 0);

    const result = () => bankAccount.synchronizeBalance();
    const message = 'Synchronization failed';

    expect(result).rejects.toThrow(SynchronizationFailedError);
    expect(result).rejects.toThrow(message);
  });
});
