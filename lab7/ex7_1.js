let conductorCounter = 0

const Fork = function () {
    this.state = 0
    return this
}

Fork.prototype.acquire = function (iter, philosopher, cb) {
    if (this.state === 0) {
        this.state = 1
        philosopher.gotForks++
        if (philosopher.gotForks === 2)
            cb()
    } else {
        setTimeout(() => {
            this.acquire(iter + 1, philosopher, cb)
        }, 1000 * 2 * iter)
    }
}

Fork.prototype.release = function () {
    this.state = 0
}

const Philosopher = function (id, forks) {
    this.id = id
    this.forks = forks
    this.gotForks = 0
    this.f1 = id % forks.length
    this.f2 = (id + 1) % forks.length
    return this
}

Philosopher.prototype.startNaive = function (count) {
    const forks = this.forks, f1 = this.f1, f2 = this.f2, id = this.id

    const action = () => {
        if (this.gotForks === 2) {
            setTimeout(() => {
                console.log(id + ' eating')
                forks[f1].release()
                forks[f2].release()
                this.gotForks = 0
                this.startNaive(count - 1)
            }, Math.random() * 3000)
        }
    }

    setTimeout(() => {
        if (count > 0) {
            forks[f1].acquire(1, this, action)
            forks[f2].acquire(1, this, action)
        }
    }, Math.random() * 3000)
}

Philosopher.prototype.startAsym = function (count) {
    const forks = this.forks, f1 = this.f1, f2 = this.f2, id = this.id

    const action = () => {
        if (this.gotForks === 2) {
            setTimeout(() => {
                console.log(id + ' eating')

                if (id % 2 === 0) {
                    forks[f1].release()
                    forks[f2].release()
                } else {
                    forks[f1].release()
                    forks[f2].release()
                }

                this.gotForks = 0
                this.startAsym(count - 1)
            }, 2000)
        }
    }

    setTimeout(() => {
        if (count > 0) {
            if (id % 2 === 0) {
                forks[f2].acquire(1, this, action)
                forks[f1].acquire(1, this, action)
            } else {
                forks[f1].acquire(1, this, action)
                forks[f2].acquire(1, this, action)
            }
        }
    }, Math.random() * 3000)
}

Philosopher.prototype.startConductor = function (N, count, iter) {
    const forks = this.forks, f1 = this.f1, f2 = this.f2, id = this.id

    const action = () => {
        if (this.gotForks === 2) {
            setTimeout(() => {
                console.log(id + ' eating')
                forks[f1].release()
                forks[f2].release()
                this.gotForks = 0
                this.startConductor(N, count - 1, 0)
            }, Math.random() * 3000)
        }
    }

    if (N % 2 === 1 || conductorCounter < N) {
        conductorCounter++
        setTimeout(() => {
            if (count > 0) {
                forks[f1].acquire(1, this, action)
                forks[f2].acquire(1, this, action)
                conductorCounter--
            }
        }, Math.random() * 3000)
    } else {
        setTimeout(() => {
            this.startConductor(N, count, iter + 1)
        }, 1000 * 2 * iter)
    }
}

const N = 5
const times = 2
let forks = []
let philosophers = []
for (let i = 0; i < N; i++) {
    forks.push(new Fork())
}

for (let i = 0; i < N; i++) {
    philosophers.push(new Philosopher(i, forks))
}

for (let i = 0; i < N; i++) {
    // philosophers[i].startNaive(times)
    // philosophers[i].startAsym(times)
    philosophers[i].startConductor(N, times, 0)
}