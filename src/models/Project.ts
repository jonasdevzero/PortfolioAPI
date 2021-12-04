import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm"
import ProjectImage from "./ProjectImage"

@Entity("project")
export default class Project extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string 

    @Column()
    description: string

    @Column()
    html: string

    @Column()
    repository_link: string

    @Column()
    website_link: string

    @OneToMany(_ => ProjectImage, projectImage => projectImage.project)
    @JoinColumn({ name: "project_id" })
    images: ProjectImage[]
}
