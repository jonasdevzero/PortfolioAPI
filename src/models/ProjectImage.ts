import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import Project from "./Project"

@Entity("project_image")
export default class ProjectImage extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column()
    url: string 

    @Column()
    project_id: string 

    @ManyToOne(_ => Project, project => project.images)
    @JoinColumn({ name: "project_id" })
    project: Project
}
