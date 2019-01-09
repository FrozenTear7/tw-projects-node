/*
** Zadanie:
** Napisz funkcje loop(n), ktora powoduje wykonanie powyzszej
** sekwencji zadan n razy. Czyli: 1 2 3 1 2 3 1 2 3 ... done
**
*/

const async = require('async')

const printAsync = (s, cb) => {
  const delay = Math.floor((Math.random() * 1000) + 500)

  setTimeout(() => {
    console.log(s)

    if (cb)
      cb()
  }, delay)
}

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
  let taskArr = []

  for (let i = 0; i < n; i++) {
      taskArr = [...taskArr, task1]
  }

  async.waterfall(
    taskArr
  , () => console.log('done!'))
}

loop(4)