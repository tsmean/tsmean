import {PasswordValidation, PasswordValidator} from './password-validator.service';
describe('Password Validator', () => {

  let passwordValidator: PasswordValidator;

  beforeAll(() => {
    class PasswordValidatorImpl extends PasswordValidator {
      constructor() {
        super();
      }
    }
    passwordValidator = new PasswordValidatorImpl();
  });


  it('should accept a good password', async (done) => {
    const passwordValidation: PasswordValidation = await passwordValidator.validatePassword('98s89hsh,.838hWeh2.3.3');
    expect(passwordValidation.isValid).toBe(true);
    done();
  });

  it('should reject a bad password', async (done) => {
    const passwordValidation: PasswordValidation = await passwordValidator.validatePassword('kljaf');
    expect(passwordValidation.isValid).toBe(false);
    done();
  });

});
