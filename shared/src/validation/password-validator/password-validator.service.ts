export abstract class PasswordValidator {
  validatePassword(password: string): Promise<PasswordValidation> {
    return new Promise((resolve, reject) => {

      const passwordIsLongEnough = password.length >= 6;
      if (!passwordIsLongEnough) {
        resolve({
          isValid: false,
          error: {
            message: 'Password is not long enough'
          }
        });
      }

      /**
       * you can add other assertions... or replace this completely by some library / service of your choice.
       * since it's promise based you could also choose to use a web-service.
       */

      resolve({
        isValid: true,
      });

    });
  }
}

export interface PasswordValidation {
  isValid: boolean;
  error?: {
    number?: number;
    message: string;
  };
}
