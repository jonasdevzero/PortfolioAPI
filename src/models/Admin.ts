import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm"
import cryptUtil from "../utils/cryptUtil"

@Entity("admin")
export default class Admin extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string 

    @Column()
    username: string

    @Column()
    email: string 

    @Column()
    password: string

    @Column()
    role: number

    @Column()
    activated: boolean

    @Column()
    reset_token: string

    @Column()
    expire_token: Date

    @Column()
    created_at: Date

    @BeforeInsert()
    private beforeInsert() {
        this.password = cryptUtil.encryptPassword(this.password)
    }
}