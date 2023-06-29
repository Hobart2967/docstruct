import { Container } from 'inversify';

export interface App {
  container: Container;
  run(): void | Promise<void>;
}