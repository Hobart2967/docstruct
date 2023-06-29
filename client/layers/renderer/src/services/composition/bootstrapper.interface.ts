export interface Bootstrapper {
  run(): void | Promise<void>;
}