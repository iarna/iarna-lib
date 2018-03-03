# v1.0.3 (2018-03-02)

* Fixed a bug where if you had multiple copies of @iarna/lib in your tree,
  the require would return an empty object.
* Fixed a bug where if you had multiple copies of @iarna/lib in your tree,
  the function would resolve relative to the first thing to require it, not
  the thing registering the paths.
