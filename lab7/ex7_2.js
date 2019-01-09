const Sem = function (init) {
  this.state = init
  return this
}

Sem.prototype.acquire = function (cb, iter) {
  if (this.state > 0)
    this.state--
  if (cb)
    cb()
  else
    setTimeout(() => {
      this.acquire(cb, iter + 1)
    }, 1000 * 2 * iter)
}

Sem.prototype.release = function () {
  this.state++
}

const write = (i) => {
  setTimeout(() => {
    resource.acquire(() => {
      item = i

      resource.release()

      write(i)
    }, 1)
  }, Math.random() * 2000)
}

const read = (i) => {
  setTimeout(() => {
    rmutex.acquire(() => {}, 1)

    readCount++

    if (readCount === 1)
      resource.acquire(() => {
        rmutex.release()

        if (item)
          console.log('Reader: ' + i + ' - item from writer: ' + item)

        rmutex.acquire(() => {
          readCount--

          if (readCount === 0)
            resource.release()

          rmutex.release()
          read(i)
        }, 1)
      }, 1)
    else {
      rmutex.release()

      if (item)
        console.log('Reader: ' + i + ' - item from writer: ' + item)

      rmutex.acquire(() => {
        readCount--

        if (readCount === 0)
          resource.release()

        rmutex.release()
        read(i)
      }, 1)
    }
  }, Math.random() * 2000)
}

const Writer = function (i) {
  write(i)
}

const Reader = function (i) {
  read(i)
}

const N = 3
let readCount = 0
const resource = new Sem(1)
const rmutex = new Sem(1)

let item

let readers = []
let writers = []

for (let i = 0; i < N; i++) {
  writers.push(new Writer(i + 1))
}

for (let i = 0; i < N * 2; i++) {
  readers.push(new Reader(i + 1))
}