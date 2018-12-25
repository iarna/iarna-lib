# v1.0.6 (2018-12-24)

* Fix compat with chakracore

# v1.0.5 (2018-03-02)

* Fixed a bug where lib paths to scan were being associated with the wrong module

# v1.0.4 (2018-03-02)

* Fixed a bug where if you had multiple copies of @iarna/lib in your tree,
  the require would return an empty object.
* Fixed a bug where if you had multiple copies of @iarna/lib in your tree,
  the function would resolve relative to the first thing to require it, not
  the thing registering the paths.
