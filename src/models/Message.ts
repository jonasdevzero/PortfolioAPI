import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("message")
export default class Message extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string 

    @Column()
    email: string 

    @Column()
    text: string 

    @Column()
    sent_at: Date
}
