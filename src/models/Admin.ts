import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
    reset_password: string

    @Column()
    expire_password: Date

    @Column()
    created_at: Date
}