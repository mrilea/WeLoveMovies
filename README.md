# WeLoveMovies
---
Built using Express, PostSQL, and Knex

## API Documentation
---
### Get /movies
This route returns a list of all the movies in the database.
example:
  {
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
  }
