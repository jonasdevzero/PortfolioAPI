import "dotenv"
import "reflect-metadata"
import "./database/connection"
import fastify from "fastify"
import fastifyCors from "fastify-cors"
import fastifyJWT from "fastify-jwt"
import cluster from "cluster"
import { cpus } from "os"
import routes from "./routes"

if (cluster.isPrimary) {
    for (let i = 0; i < cpus().length; i++) {
        cluster.fork()
    }

    cluster.on("exit", worker => {
        console.log(`Process ${worker.process.pid} died`)
        cluster.fork()
    })
} else {
    const port = process.env.PORT || 5000
    const host = "0.0.0.0"
    const secret = process.env.ADMIN_SECRET || "devzero"
    
    const server = fastify({ logger: true })
    
    server.register(fastifyCors, { origin: true, methods: ["GET, POST", "PUT", "DELETE", "PATCH", "OPTIONS"] })
    server.register(fastifyJWT, { secret })
    server.register(routes)
    
    server.listen(port, host, async (err, address) => {
        if (err) {
            server.log.error(err)
            process.exit(1)
        }
        
        server.log.info(`server listening on ${address}`)
    })
}
    