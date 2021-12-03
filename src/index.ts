import fastify from "fastify"
import routes from "./routes"

const port = process.env.PORT || 5000
const host = "0.0.0.0"

const server = fastify({ logger: true })

server.register(routes)

server.listen(port, host, async (err, address) => {
    if (err) {
        server.log.error(err)
        process.exit(1)
    }

    server.log.info(`server listening on ${address}`)
})
