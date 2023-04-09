# Assignment_2_Web3


[COMP 4513 Assignment 2.pdf](https://github.com/Shreshthk1/Assignment_2_Web3/files/11130758/COMP.4513.Assignment.2.pdf)


API Links:

```sh
https://catnip-silver-den.glitch.me/api/movies 
```
Returns all movies.


```sh
https://catnip-silver-den.glitch.me/api/movies/limit/:num 
```
Returns the first num movies. The num field must be between 1 and 200.


```sh
https://catnip-silver-den.glitch.me/api/movies/:id
```
Returns JSON for the single painting whose id matches the provided id.


```sh
https://catnip-silver-den.glitch.me/api/movies/tmdb/:id
```
Returns movie whose tmdb_id matches the provided id.

```sh
https://catnip-silver-den.glitch.me/api/movies/year/:min/:max 
```
Returns all movies whose year is between the two supplied values. If min is larger than max,then return error message.


```sh
https://catnip-silver-den.glitch.me/api/movies/ratings/:min/:max
```
Returns all movies whose average rating is between the two supplied values. If min is larger than max, then return error message


```sh
https://catnip-silver-den.glitch.me/api/movies/title/:text
```
Returns movies whose title contains (somewhere) the provided text. This search should be case insensitive.

```sh
https://catnip-silver-den.glitch.me/api/movies/:name 
```
Returns movies that have a genre name that matches the provided value. This should be case insensitive.




