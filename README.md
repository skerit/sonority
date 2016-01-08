# Sonority

Sonority is an audio library written in JavaScript, for node.js and the browser.

## Install

```bash
$ npm install sonority
```

## Backends

Currently, only VLC (via cvlc) is supported.
Not even mplayer is possible, because it's remote-control slave interface only works through stdin (making streams impossible to use) and named pipes (mkfifo), which is not supported in node.js