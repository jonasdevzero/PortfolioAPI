import { getRepository, Not } from "typeorm"
import * as yup from "yup"
import Admin from "../models/Admin"
import { ServerRequest, ServerReply } from "../types/controller"
import cryptUtil from "../utils/cryptUtil"

const SYSTEM_PASSWORD = process.env.SYSTEM_PASSWORD

export default {
    async index(req: ServerRequest, reply: ServerReply) {
        try {
            const adminRepository = getRepository(Admin)
            const admins = await adminRepository.find()

            reply.status(200).send({ admins })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },

    async create(req: ServerRequest, reply: ServerReply) {
        try {
            const { username, email, password, confirm_password, system_password, super_admin } = req.body

            if (password !== confirm_password)
                return reply.status(400).send({ message: "Passwords different!" })

            if (!SYSTEM_PASSWORD || SYSTEM_PASSWORD === "null")
                return reply.status(401).send({ message: "It's not possible to create new accounts for now!" })

            if (system_password !== SYSTEM_PASSWORD)
                return reply.status(401).send({ message: "You don't have authorization to create an account!" })

            const adminRepository = getRepository(Admin)

            const schema = yup.object().shape({
                username: yup.string().min(4).max(10).required(),
                email: yup.string().email().required(),
                password: yup.string().min(6).required(),
                system_password: yup.string().required(),
            })

            let validationError: any
            const [existsUsername, existsEmail] = await Promise.all([
                adminRepository.findOne({ where: { username } }),
                adminRepository.findOne({ where: { email } }),
                schema.validate(req.body).catch((err: any) => validationError = err)
            ])

            if (validationError)
                return reply.status(400).send({ message: validationError.errors[0] })

            if (existsUsername)
                return reply.status(400).send({ message: "Username already in use!" })

            if (existsEmail)
                return reply.status(400).send({ message: "Email already in use!" })

            let adm: Admin
            if (super_admin === true) {
                const exsitsSuperAdm = await adminRepository.findOne({ where: { role: 0 } })

                if (!!exsitsSuperAdm)
                    return reply.status(401).send({ message: "You can't create an account as super adm" })

                adm = await adminRepository.create({ username, email, password, role: 0 }).save()
            } else {
                adm = await adminRepository.create({ username, email, password, role: 1 }).save()
            }

            const token = await reply.jwtSign({ id: adm.id }, { expiresIn: 86400000 }) // 1 Day
            reply.status(201).send({ token })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },

    async login(req: ServerRequest, reply: ServerReply) {
        try {
            const { username, password } = req.body

            const adminRepository = getRepository(Admin)
            const adm = await adminRepository.findOne({ username })

            if (!adm)
                return reply.status(404).send({ message: "User not found!" })

            if (!cryptUtil.comparePasswords(password, adm.password))
                return reply.status(401).send({ message: "Incorrect password!" })

            const token = await reply.jwtSign({ id: adm.id }, { expiresIn: 86400000 }) // 1 Day
            reply.status(200).send({ token })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },

    async auth(req: ServerRequest, reply: ServerReply) {
        try {
            const id = req.user as string

            const adminRepository = getRepository(Admin)
            const admin = await adminRepository.findOne(id)

            reply.status(200).send({ admin })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },

    async update(req: ServerRequest, reply: ServerReply) {
        try {
            const id = req.user.toString()
            const { username, email } = req.body

            const adminRepository = getRepository(Admin)

            const schema = yup.object().shape({
                username: yup.string().min(4).max(10).required("Username required!"),
                email: yup.string().email().required("Email required!"),
            })

            let validationError: any
            const [existsUsername, existsEmail] = await Promise.all([
                adminRepository.findOne({ where: { username, id: Not(id) } }),
                adminRepository.findOne({ where: { email, id: Not(id) } }),
                schema.validate(req.body).catch((err: any) => validationError = err)
            ])

            if (validationError)
                return reply.status(400).send({ message: validationError.errors[0] })

            if (existsUsername)
                return reply.status(400).send({ message: "Username already in use!" })

            if (existsEmail)
                return reply.status(400).send({ message: "Email already in use!" })

            const adm = await adminRepository.findOne(id)

            if (!adm)
                return reply.status(404).send({ message: "User not found!" })

            await adminRepository.update(id, { username, email })
            reply.status(200).send({ message: "Ok" })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },

    async updateActivity(req: ServerRequest, reply: ServerReply) {
        try {
            const my_id = req.user.toString()
            const adm_id = req.params.id

            if (my_id === adm_id)
                return reply.status(400).send({ message: "You can't update your activity" })

            const adminRepository = getRepository(Admin)
            const [me, adm] = await Promise.all([
                adminRepository.findOne(my_id),
                adminRepository.findOne(adm_id)
            ])

            if (!me)
                return reply.status(404).send({ message: "You user are not found!" })

            if (!adm)
                return reply.status(404).send({ message: "Adm not found!" })

            if (me.role !== 0)
                return reply.status(401).send({ message: "Only the super adm can update an adm" })

            await adminRepository.update(adm_id, { activated: !adm.activated })
            reply.status(200).send({ message: "Ok" })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },
}
