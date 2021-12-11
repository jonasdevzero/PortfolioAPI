import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm"
import ProjectImage from "./ProjectImage"

@Entity("project")
export default class Project extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    banner_url: string

    @Column()
    description: string

    @Column()
    html: string

    @Column()
    repository_link: string

    @Column()
    website_link: string

    @Column()
    video_demo: string

    @Column()
    created_at: Date

    @OneToMany(_ => ProjectImage, projectImage => projectImage.project, { onDelete: "CASCADE" })
    @JoinColumn({ name: "project_id" })
    images: ProjectImage[]
}
