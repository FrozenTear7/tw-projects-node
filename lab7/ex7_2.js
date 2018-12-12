const Sem = function () {
    this.state = false
    return this
}

Sem.prototype.acquire = function (iter) {
    if (!this.state)
        this.state = true
    else
        setTimeout(() => {
            this.acquire(iter + 1)
        }, 1000 * 2 * iter)
}

Sem.prototype.release = function () {
    this.state = false
}

const Writer = function () {
    resource.acquire()

    console.log('xd')

    resource.release()
}

const Reader = function () {
    rmutex.acquire()

    readCount++

    if (readCount === 1)
        resource.acquire()

    console.log('xddd')

    rmutex.release()

    rmutex.acquire()

    readCount--

    if (readCount === 0)
        resource.release()

    rmutex.release()
}

const N = 3
let readCount = 0
const resource = new Sem()
const rmutex = new Sem()

let readers = []
let writers = []

for(let i = 0; i < N; i++) {
    readers.push(new Reader())
    writers.push(new Writer())
}