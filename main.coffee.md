Priority Queue
==============

PriorityQueue manages a queue of elements with priorities. The defaul behavior
is to return elements with the highest priority first.

If `low` is set to `true` returns lowest first instead.

    PriorityQueue = (options={}) ->
      items = []
      sorted = false

      if options.low
        sortStyle = prioritySortLow
      else
        sortStyle = prioritySortHigh

      sort = ->
        items.sort sortStyle
        sorted = true

Accessor functions need to ensure the items are sorted. This decorator wraps
that up nicely.

      ensureSorted = (fn) ->
        (args...) ->
          sort() unless sorted
          fn(args...)

Public Methods
--------------

Removes and returns the next element in the queue. If the queue is empty returns
`undefined`.

      pop: ensureSorted ->
        items.pop()?.object

Returns but does not remove the next element in the queue. If the queue is empty
returns `undefined`.

      top: ensureSorted ->
        items[items.length - 1]?.object

Check if the given object is included in the priority queue. Returns true if
it was found, false if not.

      includes: (object) ->
        items.reduce (found, item) ->
          found or (object is item.object)
        , false

Return the current number of elements in the queue.

      size: ->
        items.length

Check if the queue is empty. Returns true if there are no items in the queue,
false otherwise.

      empty: ->
        items.length is 0

Push an object onto the queue with the given priority.

      push: (object, priority) ->
        items.push
          object: object
          priority: priority

        sorted = false

Helpers
-------

    prioritySortLow = (a, b) ->
      b.priority - a.priority

    prioritySortHigh = (a, b) ->
      a.priority - b.priority

Export
------

    if module?
      module.exports = PriorityQueue
    else
      window.PriorityQueue = PriorityQueue
