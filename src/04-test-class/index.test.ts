// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(15);
    expect(bankAccount.getBalance()).toBe(15);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(15);
    expect(() => bankAccount.withdraw(20)).toThrow(
      new InsufficientFundsError(bankAccount.getBalance()),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(15);
    const newClentBankAccound = getBankAccount(1);
    expect(() => bankAccount.transfer(200, newClentBankAccound)).toThrow(
      new InsufficientFundsError(bankAccount.getBalance()),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(15);
    expect(() => bankAccount.transfer(2, bankAccount)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(15);
    expect(bankAccount.deposit(15).getBalance()).toBe(30);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(15);
    expect(bankAccount.withdraw(10).getBalance()).toBe(5);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(15);
    const newClentBankAccound = getBankAccount(1);
    expect(bankAccount.transfer(10, newClentBankAccound).getBalance()).toBe(5);
    expect(newClentBankAccound.getBalance()).toBe(11);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(100);

    (random as jest.Mock).mockReturnValue(0);
    const balance = await bankAccount.fetchBalance();
    expect(balance).toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(100);

    (random as jest.Mock).mockReturnValue(50);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(100);

    (random as jest.Mock).mockReturnValue(0);
    expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
