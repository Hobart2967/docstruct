import { render } from 'solid-js/web';
import { Presentation } from '../views/presentation/presentation.view';
import { DependencyInjectionProvider } from '../contexts/dependency-injection';
import { Container } from 'inversify';

// TODO: Try to get this into app.bootstrapper.tsx. Somehow, injectable decorator is not compatible with tsx files.
export function loadApp(element: HTMLElement, container: Container): void {
  render(
    () => <DependencyInjectionProvider container={container}>
      <Presentation />
    </DependencyInjectionProvider>,
    element);
}