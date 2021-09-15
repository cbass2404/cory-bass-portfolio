import { hashPassword, verifyPassword } from '../auth';

describe('hashPassword function works as follows', () => {
  it('takes in a string and hashes it', async () => {
    let password: string = 'password';

    const hashedPassword = await hashPassword(password);
    expect(hashedPassword).not.toEqual(password);
    expect(typeof hashedPassword).toEqual('string');
  });
});

describe('verifyPassword function works as follows', () => {
  const rightPassword = 'password';
  const wrongPassword = 'drowssap';

  it('returns true if right password is given', async () => {
    const hashedPassword = await hashPassword(rightPassword);
    const isValid = await verifyPassword(rightPassword, hashedPassword);

    expect(isValid).toBeTruthy();
  });

  it('returns false if wrong password is given', async () => {
    const hashedPassword = await hashPassword(rightPassword);
    const isValid = await verifyPassword(wrongPassword, hashedPassword);

    expect(isValid).toBeFalsy();
  });
});
