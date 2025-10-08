export default (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// You pass a controller function fn (usually an async one).
// The outer arrow function returns a new function that Express can use as a route handler.
// When the route is hit, Express calls this returned function.
// Inside it, Promise.resolve(fn(req, res, next)) runs — this executes fn and makes sure the result is always treated as a Promise (even if fn isn’t async).
// If that Promise rejects (i.e. an error happens inside fn), .catch(next) passes the error to Express’s error handler.
