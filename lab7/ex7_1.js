var Fork = function () {
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

var Philosopher = function (id, forks) {
  this.id = id
  this.forks = forks
  this.gotForks = 0
  this.f1 = id % forks.length
  this.f2 = (id + 1) % forks.length
  return this
}

Philosopher.prototype.startNaive = function (count) {
  var forks = this.forks, f1 = this.f1, f2 = this.f2, id = this.id

  const action = () => {
    if (this.gotForks === 2) {
      setTimeout(() => {
        console.log(id + ' eating')
        forks[f1].release()
        forks[f2].release()
        this.gotForks = 0
        this.startNaive(count - 1)
      }, 2000)
    }
  }

  if (count > 0) {
    forks[f1].acquire(1, this, action)
    forks[f2].acquire(1, this, action)
  }
}

Philosopher.prototype.startAsym = function (count) {
  var forks = this.forks, f1 = this.f1, f2 = this.f2, id = this.id

  const action = () => {
    if (this.gotForks === 2) {
      setTimeout(() => {
        console.log(id + ' eating')
        forks[f1].release()
        forks[f2].release()
        this.gotForks = 0
        this.startNaive(count - 1)
      }, 2000)
    }
  }

  if (count > 0) {
    if (id % 2 === 0) {
      forks[f2].acquire(1, this, action)
      forks[f1].acquire(1, this, action)
    } else {
      forks[f1].acquire(1, this, action)
      forks[f2].acquire(1, this, action)
    }
  }
}

Philosopher.prototype.startConductor = function (count) {
  var forks = this.forks,
    f1 = this.f1,
    f2 = this.f2,
    id = this.id

  // zaimplementuj rozwiazanie z kelnerem
  // kazdy filozof powinien 'count' razy wykonywac cykl
  // podnoszenia widelcow -- jedzenia -- zwalniania widelcow
}

var N = 5
var forks = []
var philosophers = []
for (var i = 0; i < N; i++) {
  forks.push(new Fork())
}

for (var i = 0; i < N; i++) {
  philosophers.push(new Philosopher(i, forks))
}

for (var i = 0; i < N; i++) {
  // philosophers[i].startNaive(2)
  philosophers[i].startAsym(2)
}