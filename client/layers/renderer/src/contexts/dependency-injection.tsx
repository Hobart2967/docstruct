import { Container } from 'inversify';
import { Context, JSXElement, createContext, useContext } from 'solid-js';

let DependencyInjectionContext: Context<Container> = undefined;

export function DependencyInjectionProvider(props: { container: Container, children: JSXElement}): JSXElement {
  DependencyInjectionContext = createContext(props.container);

  return (<DependencyInjectionContext.Provider value={props.container}>
    {props.children}
  </DependencyInjectionContext.Provider>);
}

export function useService<T>(token: T|any): T {
  if (DependencyInjectionContext === undefined) {
    throw new Error("Trying to use undefined dependency injection context. Initialize it first!");
  }

  return useContext(DependencyInjectionContext).get(token);
}