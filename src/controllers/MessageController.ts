import { getRepository } from "typeorm"
import * as yup from "yup"
import Message from "../models/Message"
import { ServerRequest, ServerReply } from "../types/controller"

export default {
    async index(req: ServerRequest, reply: ServerReply) {
        try {
            let { limit, skip } = req.query

            limit = limit > 0 ? limit : 30
            skip = ((skip > 0 ? skip : 0) * limit)

            const messageRepository = getRepository(Message)
            const messages = await messageRepository.find({ 
                order: { sent_at: "DESC" },
                take: limit,
                skip
            })

            reply.status(200).send({ messages })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },

    async show(req: ServerRequest, reply: ServerReply) {
        try {
            const id = req.params.id as string

            const messageRepository = getRepository(Message)
            const message = await messageRepository.findOne(id)

            if (!message)
                return reply.status(404).send({ message: "Message not found!" })

            reply.status(200).send({ message })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },

    async create(req: ServerRequest, reply: ServerReply) {
        try {
            const { email, text } = req.body

            const schema = yup.object().shape({
                email: yup.string().email().required("Digite o seu email!"),
                text: yup.string().required("Digite alguma mensagem!"),
            })

            let validationError: any
            await schema.validate(req.body).catch((err: any) => validationError = err)

            if (validationError)
                return reply.status(400).send({ message: validationError.errors[0] })

            const messageRepository = getRepository(Message)
            await messageRepository.create({ email, text }).save()

            reply.status(201).send({ message: "Ok" })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },

    async update(req: ServerRequest, reply: ServerReply) {
        try {
            const id = req.params.id as string 

            const messageRepository = getRepository(Message)
            const message = await messageRepository.findOne(id)

            if  (!message)
                return reply.status(404).send({ message: "Message not found!" })

            await messageRepository.update(id, { viewed: !message.viewed })

            reply.status(200).send({ message: "Ok" })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },
}
