import {EmailValidation, EmailValidator} from './email-validator.service';
describe('Email Validator', () => {

  let emailValidator: EmailValidator;

  beforeAll(() => {
    class EmailValidatorImpl extends EmailValidator {
      constructor() {
        super();
      }
    }
    emailValidator = new EmailValidatorImpl();
  });

  it('should accept a good email', async (done) => {
    const emailValidation: EmailValidation = await emailValidator.validateEmail('bersling@gmail.com');
    expect(emailValidation.isValid).toBe(true);
    done();
  });

  it('should reject a bad email address', async (done) => {
    const emailValidation: EmailValidation = await emailValidator.validateEmail('kljaf');
    expect(emailValidation.isValid).toBe(false);
    done();
  });

});
