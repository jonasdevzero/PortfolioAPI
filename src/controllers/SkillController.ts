import { getRepository } from "typeorm"
import * as yup from "yup"
import Skill from "../models/Skill"
import { ServerRequest, ServerReply } from "../types/controller"

const skillsType = ["technology", "tool"]

export default {
    async index(req: ServerRequest, reply: ServerReply) {
        try {
            const { type } = req.query

            if (!skillsType.includes(type) && type !== "*")
                return reply.status(400).send({ message: "Query 'type' incorrect!" })

            const skillRepository = getRepository(Skill)
            const skills = type === "*" ? await skillRepository.find() : await skillRepository.find({ where: { type } })

            reply.status(200).send({ skills })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },

    async create(req: ServerRequest, reply: ServerReply) {
        try {
            const { name, type, description, icon_url, more_link } = req.body

            const validationError = await validateData(req.body)
            if (validationError)
                return reply.status(400).send({ message: validationError })

            const skillRepository = getRepository(Skill)
            await skillRepository.create({ name, type, description, icon_url, more_link }).save()

            reply.status(201).send({ message: "Ok" })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },

    async update(req: ServerRequest, reply: ServerReply) {
        try {
            const skill_id = req.params.id as string
            const { name, type, description, icon_url, more_link } = req.body

            const skillRepository = getRepository(Skill)
            const skill = await skillRepository.findOne(skill_id)

            if (!skill)
                return reply.status(404).send({ message: "Skill not found!" })

            const validationError = await validateData(req.body)
            if (validationError)
                return reply.status(400).send({ message: validationError })

            await skillRepository.update(skill, { name, type, description, icon_url, more_link })

            reply.status(200).send({ message: "Ok" })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },

    async delete(req: ServerRequest, reply: ServerReply) {
        try {
            const skill_id = req.params.id as string 

            const skillRepository = getRepository(Skill)
            const skill = await skillRepository.findOne(skill_id)

            if (!skill)
                return reply.status(400).send({ message: "Skill not found!" })

            await skillRepository.delete(skill)

            reply.status(200).send({ message: "Ok" })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },
}

async function validateData(data: Skill) {
    if (!skillsType.includes(data.type))
        return "Query 'type' incorrect!"

    const schema = yup.object().shape({
        name: yup.string().required(),
        type: yup.string().required(),
        description: yup.string().required(),
        icon_url: yup.string().required(),
        more_link: yup.string().required(),
    })

    let validationError: any = undefined
    await schema.validate(data).catch((err: any) => validationError = err.errors[0])

    return validationError
}
