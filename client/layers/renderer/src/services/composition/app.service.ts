import { Container } from 'inversify';
import { App } from './app.model';
import { Bootstrapper } from './tokens';
import { Bootstrapper as BootstrapperModel } from './bootstrapper.interface';
import { Provider } from './provider.interface';

export class AppService {
  public static create(providers: Provider[]): App {

    const container = this.buildContainer(providers);
    container
      .bind(Container)
      .toConstantValue(container);

    return {
      container,
      run: async () => {
        const bootstrappers = container.getAll<BootstrapperModel>(Bootstrapper);
        for (const bootstrapper of bootstrappers) {
          await bootstrapper.run();
        }
      }
    }
  }

  static buildContainer(providers: Provider[]): Container {
    const container = new Container();
    for (const provider of providers) {
      let binding = container
        .bind(provider.as || provider.provide);

      if (provider.type === 'constant') {
        binding.toConstantValue(provider.provide);
        continue;
      }

      const result = (!provider.as)
        ? binding.toSelf()
        : binding.to(provider.provide);

      result
        .inSingletonScope();
    }

    return container;
  }
}