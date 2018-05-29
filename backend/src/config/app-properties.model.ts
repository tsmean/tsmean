export interface AppProperties {
  db: {
    host: string;
    dbname: string;
    port: number;
    dbuser: string;
    dbpassword: string;
    testsMayDropDb: boolean;
  };
  cors: {
    origin: string | string[];
  };
  token: {
    secret: string;
    algorithm?: string;
    expiresIn?: string;
  };
}
