# Marvel API Integration

To cache the result of Marvel api characters I've used the local object of Javascript (redis can also be used but for it to run on all computers out of the box , it needs to
containerized, although support for caching engine is made possible in code through factory pattern see in `libs/cache`).

When the first call to `GET /characters` is made, our node api checks whether the data already exists in the cache or not. If the data doesn't exist it makes the initial call to the Marvel API with limit=100 and offset=0. The response gives the `total` characters available in the Marvel's database. Using the `total` value we calculate the remaining amount of calls to be made in order to fetch all the data. We prepare the promises that are executed parallelly and save the result in cache. Subsequent calls made to this route will serves the data directly from cache

### Cache Invalidation
As Marvel API docs mentions that new characters can be added to their databases, our cache can get out-dated and needs to be updated. For this we run a cron job (using `node-cron`) that runs every 12 hours that updates the cache.

### Further Improvements
One more improvement that can be made to this API is to fetch all the characters whenever the server is started using the `syncCharacters` before `app.listen()`, so that even the first user doesn't experience any latency.