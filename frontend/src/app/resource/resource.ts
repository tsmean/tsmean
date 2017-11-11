export interface Resource {
  uid?: string;
  [x: string]: any; // any number of unknown properties
}
