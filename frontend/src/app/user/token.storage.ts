import {Injectable} from '@angular/core';

@Injectable()
export class TokenStorage {
  private readonly TOKEN_KEY = 'TOKEN';

  get token() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token || undefined;
  }

  set(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  clear() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
