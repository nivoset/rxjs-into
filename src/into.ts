import { Subject, Observable, } from 'rxjs'
import { last, takeUntil, } from 'rxjs/operators'

export const into = <T extends {}>(observable: Subject<T>) => {
  const finish = new Subject<null>();
  observable.pipe(
    last(),
  ).subscribe(
    () => { },
    () => { },
    () => finish.next(null))

  return (obs: Observable<T>): Observable<T> => {
    obs.pipe(
      takeUntil(finish),
    ).subscribe((v) => observable.next(v))
    return obs
  }
}
