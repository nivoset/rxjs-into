import { of, Subject, interval } from 'rxjs'
import { take, map, } from 'rxjs/operators'
import { into } from './into'

it('should pipe the new item into the existing Subject/Behavior subject', (done) => {
  const main = new Subject<string>()

  main.asObservable().pipe(take(1)).subscribe((val) => {
    expect(val).toBe('TEST')
    main.complete()
  }, undefined, done)

  of<string>('TEST').pipe(into(main))
})

it('should pipe multiple items into the existing Subject/Behavior subject', (done) => {
  const main = new Subject<string>()

  main.asObservable().pipe(take(2)).subscribe((val) => {
    expect(val).toBe('TEST')
  })

  interval(100).pipe(take(2), map((v) => 'TEST'))
    .pipe(into(main))
    .subscribe({ complete: done })
})
