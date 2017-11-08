export abstract class EmailValidator {
  validateEmail(email: string): Promise<EmailValidation> {
    return new Promise((resolve, reject) => {
      const re = /\S+@\S+\.\S+/;
      const isValid =  re.test(email);
      const emailValidation = {
        isValid: isValid
      };
      resolve(emailValidation);
    });
  }

  simpleCheck(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return  re.test(email);
  }

};

export interface EmailValidation {
  isValid: boolean;
}
