(function(pkg) {
  // Expose a require for our package so scripts can access our modules
  window.require = Require.generateFor(pkg);
})({
  "version": "2.0.0-pre",
  "source": {
    "main.coffee.md": {
      "path": "main.coffee.md",
      "mode": "100644",
      "content": "Priority Queue\n==============\n\nPriorityQueue manages a queue of elements with priorities. Default\nis to return elements with the highest priority first.\n\nIf `low` is set to `true` returns lowest first instead.\n\n    PriorityQueue = (options={}) ->\n      contents = []\n      sorted = false\n\n      if options.low\n        sortStyle = prioritySortLow\n      else\n        sortStyle = prioritySortHigh\n\n      sort = ->\n        contents.sort sortStyle\n        sorted = true\n\nAccessor functions need to ensure the contents are sorted. This decorator wraps\nthat up nicely.\n\n      ensureSorted = (fn) ->\n        (args...) ->\n          sort() unless sorted\n          fn(args...)\n\n      self =\n\nRemoves and returns the next element in the queue. If the queue is empty returns\n`undefined`.\n\n        pop: ensureSorted ->\n          contents.pop()?.object\n\nReturns but does not remove the next element in the queue. If the queue is empty \nreturns `undefined`.\n\n        top: ensureSorted ->\n          contents[contents.length - 1]?.object\n\nCheck if the given object is included in the priority queue. Returns true if\nit was found, false if not.\n\n        includes: (object) ->\n          contents.reduce (found, item) ->\n            found or (object is item.object)\n          , false\n\nReturn the current number of elements in the queue.\n\n        size: ->\n          contents.length\n\nCheck if the queue is empty. Returns true if there are no items in the queue,\nfalse otherwise.\n\n        empty: ->\n          contents.length is 0\n  \n        \nPush an object onto the queue with the given priority.\n\n        push: (object, priority) ->\n          contents.push\n            object: object\n            priority: priority\n  \n          sorted = false\n  \n      self\n\nHelpers\n-------\n\n    prioritySortLow = (a, b) ->\n      b.priority - a.priority\n\n    prioritySortHigh = (a, b) ->\n      a.priority - b.priority\n\nExport\n------\n\n    if module?\n      module.exports = PriorityQueue\n    else\n      window.PriorityQueue = PriorityQueue\n",
      "type": "blob"
    },
    "test/priority_queue.coffee": {
      "path": "test/priority_queue.coffee",
      "mode": "100644",
      "content": "PriorityQueue = require \"../main\"\n\nok = assert\nequals = assert.equal\ntest = it\n\ndescribe \"PriorityQueue\", ->\n  test \"#push\", ->\n    queue = PriorityQueue()\n    queue.push 2, 5\n\n    ok queue.size() is 1, \"queue.size()\"\n    ok not queue.empty(), \"!queue.empty()\"\n\n  test \"#includes\", ->\n    queue = PriorityQueue()\n    queue.push 5, 0\n\n    equals queue.includes(5), true\n    equals queue.includes(0), false\n  \n  test \"#empty\", ->\n    queue = PriorityQueue()\n    ok queue.size() is 0, \"queue.size() === 0\"\n    ok queue.empty(), \"queue.empty()\"\n  \n  test \"#pop\", ->\n    queue = PriorityQueue()\n    \n    good = benefit: 6\n    decent = benefit: 3\n    bad = benefit: 1\n    \n    queue.push good, 10\n    queue.push decent, 5\n    queue.push bad, 1\n    \n    equals queue.pop(), good, \"Start with best\"\n    equals queue.pop(), decent, \"then next best\"\n    equals queue.pop(), bad, \"then next\"\n  \n  test \"#pop with low => true\", ->\n    queue = PriorityQueue(low: true)\n    \n    good = benefit: 6\n    decent = benefit: 3\n    bad = benefit: 1\n    \n    queue.push good, 1\n    queue.push decent, 5\n    queue.push bad, 10\n    \n    equals queue.pop(), good, \"Start with best\"\n    equals queue.pop(), decent, \"then next best\"\n    equals queue.pop(), bad, \"then next\"",
      "type": "blob"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "mode": "100644",
      "content": "version: \"2.0.0-pre\"\nentryPoint: \"main\"\nremoteDependencies: [\n  \"http://strd6.github.io/require/v0.2.2.js?\"\n]\n",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "mode": "100644",
      "content": "== Description ==\n\nA priority queue is a handy data structure with many uses. From graph search\nalgorithms to simple job queues, having this in your toolbelt will help to give\nyou a solid foundation.\n\n== Features ==\n\n* Simple to use and understand.\n* Creates a single PriorityQueue constructor.\n* Instantiate via `PriorityQueue()` or `new PriorityQueue()`\n* Offers both highest first and lowest first ordering.\n* Test suite included.\n\nThe default is highest priority first, but when doing something like A* you want lowest priority first... it handles it: `queue = PriorityQueue({low: true});` Boom!\n\n== Example Usage ==\n\n    # Highest priority first\n    queue = PriorityQueue()\n\n    queue.push(\"b\", 5)\n    queue.push(\"a\", 10)\n\n    queue.pop() # => \"a\"\n    queue.pop() # => \"b\"\n\n    # Lowest priority first\n    queue = PriorityQueue\n      low: true\n\n    queue.push(\"x\", 5)\n    queue.push(\"y\", 10)\n\n    queue.pop() # => \"x\"\n    queue.pop() # => \"y\"\n\n== License ==\n\nMIT\n",
      "type": "blob"
    }
  },
  "distribution": {
    "main": {
      "path": "main",
      "content": "(function() {\n  var PriorityQueue, prioritySortHigh, prioritySortLow,\n    __slice = [].slice;\n\n  PriorityQueue = function(options) {\n    var contents, ensureSorted, self, sort, sortStyle, sorted;\n    if (options == null) {\n      options = {};\n    }\n    contents = [];\n    sorted = false;\n    if (options.low) {\n      sortStyle = prioritySortLow;\n    } else {\n      sortStyle = prioritySortHigh;\n    }\n    sort = function() {\n      contents.sort(sortStyle);\n      return sorted = true;\n    };\n    ensureSorted = function(fn) {\n      return function() {\n        var args;\n        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n        if (!sorted) {\n          sort();\n        }\n        return fn.apply(null, args);\n      };\n    };\n    self = {\n      pop: ensureSorted(function() {\n        var _ref;\n        return (_ref = contents.pop()) != null ? _ref.object : void 0;\n      }),\n      top: ensureSorted(function() {\n        var _ref;\n        return (_ref = contents[contents.length - 1]) != null ? _ref.object : void 0;\n      }),\n      includes: function(object) {\n        return contents.reduce(function(found, item) {\n          return found || (object === item.object);\n        }, false);\n      },\n      size: function() {\n        return contents.length;\n      },\n      empty: function() {\n        return contents.length === 0;\n      },\n      push: function(object, priority) {\n        contents.push({\n          object: object,\n          priority: priority\n        });\n        return sorted = false;\n      }\n    };\n    return self;\n  };\n\n  prioritySortLow = function(a, b) {\n    return b.priority - a.priority;\n  };\n\n  prioritySortHigh = function(a, b) {\n    return a.priority - b.priority;\n  };\n\n  if (typeof module !== \"undefined\" && module !== null) {\n    module.exports = PriorityQueue;\n  } else {\n    window.PriorityQueue = PriorityQueue;\n  }\n\n}).call(this);\n\n//# sourceURL=main.coffee",
      "type": "blob"
    },
    "test/priority_queue": {
      "path": "test/priority_queue",
      "content": "(function() {\n  var PriorityQueue, equals, ok, test;\n\n  PriorityQueue = require(\"../main\");\n\n  ok = assert;\n\n  equals = assert.equal;\n\n  test = it;\n\n  describe(\"PriorityQueue\", function() {\n    test(\"#push\", function() {\n      var queue;\n      queue = PriorityQueue();\n      queue.push(2, 5);\n      ok(queue.size() === 1, \"queue.size()\");\n      return ok(!queue.empty(), \"!queue.empty()\");\n    });\n    test(\"#includes\", function() {\n      var queue;\n      queue = PriorityQueue();\n      queue.push(5, 0);\n      equals(queue.includes(5), true);\n      return equals(queue.includes(0), false);\n    });\n    test(\"#empty\", function() {\n      var queue;\n      queue = PriorityQueue();\n      ok(queue.size() === 0, \"queue.size() === 0\");\n      return ok(queue.empty(), \"queue.empty()\");\n    });\n    test(\"#pop\", function() {\n      var bad, decent, good, queue;\n      queue = PriorityQueue();\n      good = {\n        benefit: 6\n      };\n      decent = {\n        benefit: 3\n      };\n      bad = {\n        benefit: 1\n      };\n      queue.push(good, 10);\n      queue.push(decent, 5);\n      queue.push(bad, 1);\n      equals(queue.pop(), good, \"Start with best\");\n      equals(queue.pop(), decent, \"then next best\");\n      return equals(queue.pop(), bad, \"then next\");\n    });\n    return test(\"#pop with low => true\", function() {\n      var bad, decent, good, queue;\n      queue = PriorityQueue({\n        low: true\n      });\n      good = {\n        benefit: 6\n      };\n      decent = {\n        benefit: 3\n      };\n      bad = {\n        benefit: 1\n      };\n      queue.push(good, 1);\n      queue.push(decent, 5);\n      queue.push(bad, 10);\n      equals(queue.pop(), good, \"Start with best\");\n      equals(queue.pop(), decent, \"then next best\");\n      return equals(queue.pop(), bad, \"then next\");\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/priority_queue.coffee",
      "type": "blob"
    },
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"2.0.0-pre\",\"entryPoint\":\"main\",\"remoteDependencies\":[\"http://strd6.github.io/require/v0.2.2.js?\"]};",
      "type": "blob"
    }
  },
  "entryPoint": "main",
  "dependencies": {},
  "remoteDependencies": [
    "http://strd6.github.io/require/v0.2.2.js?"
  ],
  "progenitor": {
    "url": "http://strd6.github.io/editor/"
  },
  "repository": {
    "id": 220605,
    "name": "priority_queue",
    "full_name": "STRd6/priority_queue",
    "owner": {
      "login": "STRd6",
      "id": 18894,
      "avatar_url": "https://0.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045?d=https%3A%2F%2Fidenticons.github.com%2F39df222bffe39629d904e4883eabc654.png&r=x",
      "gravatar_id": "33117162fff8a9cf50544a604f60c045",
      "url": "https://api.github.com/users/STRd6",
      "html_url": "https://github.com/STRd6",
      "followers_url": "https://api.github.com/users/STRd6/followers",
      "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
      "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
      "organizations_url": "https://api.github.com/users/STRd6/orgs",
      "repos_url": "https://api.github.com/users/STRd6/repos",
      "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
      "received_events_url": "https://api.github.com/users/STRd6/received_events",
      "type": "User",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/STRd6/priority_queue",
    "description": "A JavaScript PriorityQueue",
    "fork": false,
    "url": "https://api.github.com/repos/STRd6/priority_queue",
    "forks_url": "https://api.github.com/repos/STRd6/priority_queue/forks",
    "keys_url": "https://api.github.com/repos/STRd6/priority_queue/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/STRd6/priority_queue/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/STRd6/priority_queue/teams",
    "hooks_url": "https://api.github.com/repos/STRd6/priority_queue/hooks",
    "issue_events_url": "https://api.github.com/repos/STRd6/priority_queue/issues/events{/number}",
    "events_url": "https://api.github.com/repos/STRd6/priority_queue/events",
    "assignees_url": "https://api.github.com/repos/STRd6/priority_queue/assignees{/user}",
    "branches_url": "https://api.github.com/repos/STRd6/priority_queue/branches{/branch}",
    "tags_url": "https://api.github.com/repos/STRd6/priority_queue/tags",
    "blobs_url": "https://api.github.com/repos/STRd6/priority_queue/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/STRd6/priority_queue/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/STRd6/priority_queue/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/STRd6/priority_queue/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/STRd6/priority_queue/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/STRd6/priority_queue/languages",
    "stargazers_url": "https://api.github.com/repos/STRd6/priority_queue/stargazers",
    "contributors_url": "https://api.github.com/repos/STRd6/priority_queue/contributors",
    "subscribers_url": "https://api.github.com/repos/STRd6/priority_queue/subscribers",
    "subscription_url": "https://api.github.com/repos/STRd6/priority_queue/subscription",
    "commits_url": "https://api.github.com/repos/STRd6/priority_queue/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/STRd6/priority_queue/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/STRd6/priority_queue/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/STRd6/priority_queue/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/STRd6/priority_queue/contents/{+path}",
    "compare_url": "https://api.github.com/repos/STRd6/priority_queue/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/STRd6/priority_queue/merges",
    "archive_url": "https://api.github.com/repos/STRd6/priority_queue/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/STRd6/priority_queue/downloads",
    "issues_url": "https://api.github.com/repos/STRd6/priority_queue/issues{/number}",
    "pulls_url": "https://api.github.com/repos/STRd6/priority_queue/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/STRd6/priority_queue/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/STRd6/priority_queue/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/STRd6/priority_queue/labels{/name}",
    "releases_url": "https://api.github.com/repos/STRd6/priority_queue/releases{/id}",
    "created_at": "2009-06-07T01:59:36Z",
    "updated_at": "2013-11-12T19:51:03Z",
    "pushed_at": "2013-11-12T19:50:58Z",
    "git_url": "git://github.com/STRd6/priority_queue.git",
    "ssh_url": "git@github.com:STRd6/priority_queue.git",
    "clone_url": "https://github.com/STRd6/priority_queue.git",
    "svn_url": "https://github.com/STRd6/priority_queue",
    "homepage": "",
    "size": 259,
    "stargazers_count": 17,
    "watchers_count": 17,
    "language": "JavaScript",
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 9,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 9,
    "open_issues": 0,
    "watchers": 17,
    "default_branch": "master",
    "master_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "network_count": 9,
    "subscribers_count": 2,
    "branch": "master",
    "defaultBranch": "master"
  }
});