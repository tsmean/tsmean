export interface PasswordCryptographerService {
  doCompare(plaintextPassword: string, hash: string): Promise<boolean>;
  doHash(plaintextPassword: string): Promise<string>;
}
