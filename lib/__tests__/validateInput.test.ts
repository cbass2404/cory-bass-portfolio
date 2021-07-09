import { isValidEmail, isValidInput, isValidPassword } from '../validateInput';

const emptyString = '';
const stringWithSpace = ' ';
const validString = 'string';
const validEmail = 'test@test.com';
const validPassword = 'A!a1qwerty';

let result: boolean;

describe('isValidInput', () => {
  it('returns true if a valid string', () => {
    result = isValidInput(validString);

    expect(result).toBeTruthy();
  });

  it('returns false if an empty string', () => {
    result = isValidInput(emptyString);

    expect(result).toBeFalsy();
  });

  it('returns false if string with only a space', () => {
    result = isValidInput(stringWithSpace);

    expect(result).toBeFalsy();
  });
});

describe('isValidEmail', () => {
  it('returns true if valid email', () => {
    result = isValidEmail(validEmail);

    expect(result).toBeTruthy();
  });

  it('returns false if empty string', () => {
    result = isValidEmail(emptyString);

    expect(result).toBeFalsy();
  });

  it('returns false if string with only a space', () => {
    result = isValidEmail(stringWithSpace);

    expect(result).toBeFalsy();
  });

  it('returns false if simple string', () => {
    result = isValidEmail(validString);

    expect(result).toBeFalsy();
  });
});

describe('isValidPassword', () => {
  // 1 Capital letter, 1 lower case letter, number, special character 6 to 15 digits long
  it('returns true if a valid password', () => {
    result = isValidPassword(validPassword);

    expect(result).toBeTruthy();
  });

  it('returns false if empty string', () => {
    result = isValidPassword(emptyString);

    expect(result).toBeFalsy();
  });

  it('returns false if string with only a space', () => {
    result = isValidPassword(stringWithSpace);

    expect(result).toBeFalsy();
  });

  it('returns false if simple string', () => {
    result = isValidPassword(validString);

    expect(result).toBeFalsy();
  });

  it('returns false if missing special character', () => {
    result = isValidPassword('A1a1qwerty');

    expect(result).toBeFalsy();
  });

  it('returns false if to short', () => {
    result = isValidPassword('A!a1q');

    expect(result).toBeFalsy();
  });

  it('returns false if to long', () => {
    result = isValidPassword('A!a1qaaaaaaaaaaa');

    expect(result).toBeFalsy();
  });

  it('returns false if no number', () => {
    result = isValidPassword('A!aaqa');

    expect(result).toBeFalsy();
  });

  it('returns false if no capital letter', () => {
    result = isValidPassword('a!a1aqa');

    expect(result).toBeFalsy();
  });

  it('returns false if no lowercase letter', () => {
    result = isValidPassword('A!A1AAA');

    expect(result).toBeFalsy();
  });
});
