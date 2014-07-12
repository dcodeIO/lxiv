![lxiv - A compact library to encode and decode base64 data in JavaScript.](https://raw.github.com/dcodeIO/lxiv/master/lxiv.png)
====
**lxiv** is a compact library to encode and decode base64 data in JavaScript using arbitrary sources and destinations
through the use of successively called functions, basically eliminating [memory overhead](https://github.com/dcodeIO/utfx/wiki#faq).

API
---

### encode(src, dst)

Encodes bytes to base64 char codes.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| src             | *function():(number &#124; null)* | Bytes source as a function returning the next byte respectively `null` if there are no more bytes left. 
| dst             | *function(number)* | Characters destination as a function successively called with each encoded char code. 

### decode(src, dst)

Decodes base64 char codes to bytes.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| src             | *function():(number &#124; null)* | Characters source as a function returning the next char code respectively `null` if there are no more characters left. 
| dst             | *function(number)* | Bytes destination as a function successively called with the next byte. 
| **@throws**     | *Error*         | If a character code is invalid 

### test(str)

Tests if a string is valid base64.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| str             | *string*        | String to test 
| **@returns**    | *boolean*       | `true` if valid, otherwise `false` 

Downloads
---------
* [Distributions](https://github.com/dcodeIO/lxiv/tree/master/dist)

License
-------
Apache License, Version 2.0
