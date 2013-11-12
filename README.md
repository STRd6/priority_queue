== Description ==

A priority queue is a handy data structure with many uses. From graph search
algorithms to simple job queues, having this in your toolbelt will help to give
you a solid foundation.

== Features ==

* Simple to use and understand.
* Creates a single PriorityQueue constructor.
* Instantiate via `PriorityQueue()` or `new PriorityQueue()`
* Offers both highest first and lowest first ordering.
* Test suite included.

The default is highest priority first, but when doing something like A* you want lowest priority first... it handles it: `queue = PriorityQueue({low: true});` Boom!

== Example Usage ==

    # Highest priority first
    queue = PriorityQueue()

    queue.push("b", 5)
    queue.push("a", 10)

    queue.pop() # => "a"
    queue.pop() # => "b"

    # Lowest priority first
    queue = PriorityQueue
      low: true

    queue.push("x", 5)
    queue.push("y", 10)

    queue.pop() # => "x"
    queue.pop() # => "y"

== License ==

MIT
