import { of, Subject, interval } from 'rxjs'
import { take, mapTo, finalize, } from 'rxjs/operators'
import { into } from './into'

const error = () => { throw new Error('') };

it('should pipe the new item into the existing Subject/Behavior subject', (complete) => {
  const main = new Subject<string>()

  main.asObservable().pipe(take(1)).subscribe({
    next: (val) => {
      expect(val).toBe('TEST')
    },
    error,
    complete,
  })

  of<string>('TEST').pipe(into(main))
})

it('should pipe multiple items into the existing Subject/Behavior subject', (complete) => {
  const main = new Subject<string>()

  main.asObservable().pipe(take(2)).subscribe((val) => {
    expect(val).toBe('TEST')
  })

  interval(100).pipe(
    take(2),
    mapTo('TEST'))
    .pipe(into(main))
    .subscribe({ complete })
})

it('should close pipe when destination observable closes', (complete) => {
  const main = new Subject<string>()

  main.pipe(
    take(2)
  )
    .subscribe({
      next: (val) => expect(val).toBe('TEST'),
      error,
      complete: () => main.complete(),
    })

  const loop = interval(100)

  loop.pipe(mapTo('TEST'), into(main))

  of(100, 200, 'close', 300).pipe(
    mapTo('TEST'),
    finalize(() => main.complete()),
  )
    .pipe(into(main))
    .subscribe({ complete })
})
