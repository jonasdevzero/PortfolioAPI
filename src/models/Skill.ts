import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("skill")
export default class Skill extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string 

    @Column()
    name: string 

    @Column()
    type: number 

    @Column()
    description: string 

    @Column()
    icon_url: string

    @Column()
    more_link: string
}
