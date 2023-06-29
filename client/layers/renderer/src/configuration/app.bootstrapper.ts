import { Bootstrapper } from '../services/composition/bootstrapper.interface';
//import { Presentation } from '../views/presentation/presentation.view';
import { Container, decorate, inject, injectable } from 'inversify';
import { loadApp } from './load-app';

@injectable()
export class AppBootstrapper implements Bootstrapper {
  public constructor(
    @inject(Container)
    private readonly _container: Container) { }

  public async run(): Promise<void> {
    const app = document.getElementById('app');

    if (!app) {
      return;
    }

    loadApp(app, this._container);
  }
}
