---
layout: post
title: Streams
class: streams
date: 2015-02-18
---

We've briefly touched on streams already during the `learnyounode` tutorial. Streams are a powerful part of Node.js and allow data to flow from one source to another. We're also able to transform the data as it flows by [piping (`pipe`)][node-pipe] it [`through`][through2] different [transformations][node-tansform].

There are two great resources for learning about streams:

 - [Stream Adventure][stream-adventure]
 - [Stream Handbook][stream-handbook]

While everything you'd want to do could be done with pure Node, the community has abstracted some common stream related functionality into nice, functional abstractions. It's therefore best to learn about streams from these community resources rather than Node's documentation.

[node-pipe]: http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
[through2]: https://github.com/rvagg/through2
[node-tansform]: http://nodejs.org/api/stream.html#stream_class_stream_transform
[stream-adventure]: https://github.com/substack/stream-adventure
[stream-handbook]: https://github.com/substack/stream-handbook
