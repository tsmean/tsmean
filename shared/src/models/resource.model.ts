export interface ResourceWithoutId {
  id?: string;
  [x: string]: any;
}

export interface Resource {
  id: string;
  [x: string]: any;
}
