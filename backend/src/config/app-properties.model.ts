export interface AppProperties {
  db: {
    host: string;
    dbname: string;
    port: number;
    dbuser: string;
    dbpassword: string;
    testsMayDropDb: boolean;
  };
}
