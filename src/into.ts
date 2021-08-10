import { Subject, Observable, } from 'rxjs'
import { takeUntil, } from 'rxjs/operators'

export const into = <T extends {}>(observable: Subject<T>) => {
  const finish = new Subject<null>()
  observable.subscribe({
    complete: () => finish.next(null),
  })

  return (obs: Observable<T>): Observable<T> => {
    obs.pipe(
      takeUntil(finish),
    ).subscribe((v) => observable.next(v))
    return obs
  }
}
