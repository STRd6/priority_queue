/*global document, jQuery, ok, test */

(function($) {
  $(function() {
    test("PriorityQueue#push", function() {
      var queue = PriorityQueue();

      queue.push(2, 5);

      ok(queue.size() === 1, "queue.size()");
      ok(!queue.empty(), "!queue.empty()");
    });

    test("PriorityQueue#includes", function() {
      var queue = PriorityQueue();

      queue.push(5, 0);

      equals(queue.includes(5), true);
      equals(queue.includes(0), false);
    });

    test("PriorityQueue#empty", function() {
      var queue = PriorityQueue();

      ok(queue.size() === 0, "queue.size() === 0");
      ok(queue.empty(), "queue.empty()");
    });

    test("PriorityQueue#pop", function() {
      var queue = PriorityQueue();
      var good = {benefit: 6};
      var decent = {benefit: 3};
      var bad = {benefit: 1};

      queue.push(good, 10);
      queue.push(decent, 5);
      queue.push(bad, 1);

      equals(queue.pop(), good, "Start with best");
      equals(queue.pop(), decent, "then next best");
      equals(queue.pop(), bad, "then next");
    });

    test("PriorityQueue#pop with low => true", function() {
      var queue = PriorityQueue({low: true});
      var good = {benefit: 6};
      var decent = {benefit: 3};
      var bad = {benefit: 1};

      queue.push(good, 1);
      queue.push(decent, 5);
      queue.push(bad, 10);

      equals(queue.pop(), good, "Start with best");
      equals(queue.pop(), decent, "then next best");
      equals(queue.pop(), bad, "then next");
    });
  });
})(jQuery);