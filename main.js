const fastify = require("fastify")({ logger: true });
require("dotenv").config();

fastify.register(require("@fastify/mysql"), {
	connectionString: process.env.MYSQL_URL,
});

fastify.get("/allUsers", (req, res) => {
	fastify.mysql.query("SELECT * FROM users", (err, data) => {
		res.send(data);
	});
});

fastify.get("/user/:username", (req, res) => {
	fastify.mysql.query(
		"SELECT * FROM users where username=?",
		[req.params.username],
		(err, data) => {
			res.send(data);
		}
	);
});

fastify.post("/user", (req, res) => {
	fastify.mysql.query(
		"INSERT INTO users (username,password) VALUES (?,?)",
		[req.body.username, req.body.password],
		(err, data) => {
			res.send(data);
		}
	);
});

fastify.listen({ port: 3000, host: "0.0.0.0" });
