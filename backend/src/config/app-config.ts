import {AppProperties} from './app-properties.model';
export class AppConfig {

  private _appConfig: AppProperties;

  // configName is the name of the properties file.
  // There's an untracked folder properties at the same level as the src directory with the properties.
  public setAppConfig(configName: string) {
    this._appConfig = require(`../../properties/${configName}.properties.json`);
  }

  public get appConfig(): AppProperties {
    return this._appConfig;
  }

}

export const appConfig = new AppConfig();
