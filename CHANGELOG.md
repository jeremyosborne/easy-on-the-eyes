# 0.0.3 (to be released)

* Quality of life improvement: break the client code apart into separate files
  mainly as a test to see what independent components I have.
* Make use of Node's `url` parser library on the client.
* Change `server/index.js` to optionally build assets on the fly with a webpack
  compiler, but drop the whole idea of webpack hot reloading. Not the most elegant
  but extremely simple to handle without much overhead. Also doesn't require
  any retooling (in fact allows deletion of dependencies).



# 0.0.2 (released 2016 Feb 14)

* Break dependency on `html-to-markdown`. That project inspired this, but
  I realized it's not the same thing I want to do here, and also not efficient
  enough. That project was started so I could grab wikipedia articles and store
  them in text files on disk. This project is about reading in the browser without
  distractions, and converting to and from markdown is not what is needed.
* Can click in pages and navigate to other pages, somewhat, still pretty iffy
  on whether the target page you land on will be worth seeing or not.
* Made the first page insert-url-here form appropriate for humans, not ants.
* Quality of life improvements like webpack building of client assets, various
  code linters.



# 0.0.1 (released 2016 Feb 07)

* Basic functionality as I work out exactly what I want this app to do, besides
  filter content heavy websites down into plain content.
