import React from 'react';
import { boolean } from 'yargs';

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
    // 1 Capital letter, 1 lower case letter, number, special character 8 to 20 digits long
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
});
