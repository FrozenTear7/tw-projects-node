// Napisz funkcje (bez korzytania z biblioteki async) wykonujaca
// rownolegle funkcje znajdujace sie w tablicy
// parallel_functions. Po zakonczeniu wszystkich funkcji
// uruchamia sie funkcja final_function. Wskazowka:  zastosowc
// licznik zliczajacy wywolania funkcji rownoleglych

const printAsync = (s, cb) => {
  const delay = Math.floor((Math.random() * 1000) + 500)

  setTimeout(() => {
    console.log(s)

    if (cb)
      cb()
  }, delay)
}

const inparallel = (parallel_functions, final_function) => {
  let counter = 0

  parallel_functions.forEach(func => func(() => {
    if(++counter === 3)
      final_function()
  }))
}

A = (cb) => printAsync('A', cb)
B = (cb) => printAsync('B', cb)
C = (cb) => printAsync('C', cb)
D = (cb) => printAsync('Done', cb)

inparallel([A, B, C], D)

// kolejnosc: A, B, C - dowolna, na koncu zawsze "Done"