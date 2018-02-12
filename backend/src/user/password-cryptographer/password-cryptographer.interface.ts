export interface PasswordCryptographerService {
  doCompare (plaintextPassword, hash): Promise<boolean>;
  doHash (plaintextPassword: string): Promise<string>;
}
