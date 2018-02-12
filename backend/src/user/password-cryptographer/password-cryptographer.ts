import * as bcrypt from 'bcrypt-nodejs';
import {Component} from '@nestjs/common';
import {PasswordCryptographerService} from './password-cryptographer.interface';

@Component()
export class PasswordCryptographerServiceImpl implements PasswordCryptographerService {

  doHash (plaintextPassword: string): Promise<string> {

    return new Promise((resolve, reject) => {

      bcrypt.genSalt(this.saltRounds(), (error, salt) => {
        bcrypt.hash(plaintextPassword, salt, null, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      });

    });

  }

  doCompare (plaintextPassword, hash): Promise<boolean> {

    return new Promise((resolve, reject) => {

      bcrypt.compare(plaintextPassword, hash, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });

    });

  }

  private saltRounds() {
    return 5;
  }

}
