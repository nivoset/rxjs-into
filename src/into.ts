import { Subject, Observable, } from 'rxjs'
import { takeUntil, } from 'rxjs/operators'

export const into = <T>(observable: Subject<T>) => {
  const finish = new Subject<void>()
  observable.subscribe({
    complete: () => finish.next(),
  })

  return (obs: Observable<T>): Observable<T> => {
    obs.pipe(
      takeUntil(finish),
    ).subscribe((v) => observable.next(v))
    return obs
  }
}
