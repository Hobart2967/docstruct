import { injectable } from 'inversify';
import { Observable, Subject, takeUntil } from 'rxjs';
import { createSignal, onCleanup } from 'solid-js';

@injectable()
export class RxJsAdapterService {
  public createSignalFrom<T>(
    input: Observable<T>,
    defaultValue?: T,
    cleanup$ = this.onCleanup$(),
  ) {
    const [value, setValue] = createSignal(defaultValue as T);

    input
      .pipe(takeUntil(cleanup$))
      .subscribe(setValue);

    return [value, setValue] as const;
  }

  public onCleanup$() {
    const obs = new Subject<void>();

    onCleanup(() => {
      obs.next();
      obs.complete();
    });

    return obs.asObservable();
  }
}