export interface Provider {
  provide: any;
  as?: any;
  type?: 'constant'|'singleton';
}