/*
** Zadanie:
** Napisz funkcje loop(n), ktora powoduje wykonanie powyzszej
** sekwencji zadan n razy. Czyli: 1 2 3 1 2 3 1 2 3 ... done
**
*/

const printAsync = (s, cb) =>
  setTimeout(() => {
      console.log(s)

      if (cb)
        cb()
    }, Math.floor((Math.random() * 1000) + 500),
  )

const task1 = (cb) => {
  printAsync('1', () => {
    task2(cb)
  })
}

const task2 = (cb) => {
  printAsync('2', () => {
    task3(cb)
  })
}

const task3 = (cb) => {
  printAsync('3', cb)
}

const loop = (n) => {
  task1(() => {
    if (n === 1) {
      console.log('done!')
    } else {
      loop(n - 1)
    }
  })
}

loop(2)