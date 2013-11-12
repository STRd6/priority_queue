PriorityQueue = require "../main"

ok = assert
equals = assert.equal
test = it

describe "PriorityQueue", ->
  test "#push", ->
    queue = PriorityQueue()
    queue.push 2, 5

    ok queue.size() is 1, "queue.size()"
    ok not queue.empty(), "!queue.empty()"

  test "#includes", ->
    queue = PriorityQueue()
    queue.push 5, 0

    equals queue.includes(5), true
    equals queue.includes(0), false
  
  test "#empty", ->
    queue = PriorityQueue()
    ok queue.size() is 0, "queue.size() === 0"
    ok queue.empty(), "queue.empty()"
  
  test "#pop", ->
    queue = PriorityQueue()
    
    good = benefit: 6
    decent = benefit: 3
    bad = benefit: 1
    
    queue.push good, 10
    queue.push decent, 5
    queue.push bad, 1
    
    equals queue.pop(), good, "Start with best"
    equals queue.pop(), decent, "then next best"
    equals queue.pop(), bad, "then next"
  
  test "#pop with low => true", ->
    queue = PriorityQueue(low: true)
    
    good = benefit: 6
    decent = benefit: 3
    bad = benefit: 1
    
    queue.push good, 1
    queue.push decent, 5
    queue.push bad, 10
    
    equals queue.pop(), good, "Start with best"
    equals queue.pop(), decent, "then next best"
    equals queue.pop(), bad, "then next"