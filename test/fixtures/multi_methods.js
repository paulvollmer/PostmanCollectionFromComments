/**
 * @postmanName foo-get
 * @postmanGroup foo
 * @postmanDescription some words about GET foo
 * @postmanMethod GET
 * @postmanUrl http://localhost:8080
 *
 * @postmanName foo-post
 * @postmanGroup foo
 * @postmanDescription some words about POST foo
 * @postmanMethod POST
 * @postmanUrl http://localhost:8080
 */
module.exports = function(req, res) {
  res.send('hello world');
};
