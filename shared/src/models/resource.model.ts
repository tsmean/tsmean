export interface ResourceWithoutId {
  id?: number;
  [x: string]: any;
}

export interface Resource {
  id: number;
  [x: string]: any;
}
