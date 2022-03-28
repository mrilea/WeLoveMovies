# WeLoveMovies
---
A RESTful API built using Express, PostSQL, and Knex for browsing movies, theaters, and reviews.

## API Documentation
---
### Get /movies
This route returns a list of all the movies in the database.

example:

  <pre><code>{
    "data": [
      {
        "id": 1,
        "title": "Spirited Away",
        "runtime_in_minutes": 125,
        "rating": "PG",
        "description": "Chihiro ...",
        "image_url": "https://imdb-api.com/..."
      }
      ...
    ]
  }</code></pre>

If "is_showing-true" is provieded in the URL, the route will only return movies that are currently showing in theaters.

### Get /movies/:movieId
This will return a single movie by ID.

example:
<pre><code>{
  "data": {
    "id": 1,
    "title": "Spirited Away",
    "runtime_in_minutes": 125,
    "rating": "PG",
    "description": "Chihiro...",
    "image_url": "https://imdb-api.com/..."
  }
}</code></pre>

### Delete /reviews/:reviewId
This route will delete a review by ID.

If a correct ID is entered the server will respond with "204 No Content".

If and incorrect ID is entered the server will respond with an error.

### PUT /reviews/:reviewId
This route will update a review matching the ID in the URL.

### GET /theaters
This route will return a list of all theaters.
example:
<pre><code>{
  "data": [
    {
      "theater_id": 1,
      "name": "Regal City Center",
      "address_line_1": "801 C St.",
      "address_line_2": "",
      "city": "Vancouver",
      "state": "WA",
      "zip": "98660",
      "created_at": "2021-02-23T20:48:13.335Z",
      "updated_at": "2021-02-23T20:48:13.335Z",
      "movies": [
        {
          "movie_id": 1,
          "title": "Spirited Away",
          "runtime_in_minutes": 125,
          "rating": "PG",
          "description": "Chihiro...",
          "image_url": "https://imdb-api.com...",
          "created_at": "2021-02-23T20:48:13.342Z",
          "updated_at": "2021-02-23T20:48:13.342Z",
          "is_showing": false,
          "theater_id": 1
        }
        ...
      ]
    }
    ...
  ]
}</code></pre>
