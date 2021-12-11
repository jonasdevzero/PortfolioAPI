import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProjectImage1638619749278 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "project_image",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isUnique: true,
                    isGenerated: true,
                    unsigned: true,
                    generationStrategy: "uuid",
                    default: `uuid_generate_v4()`,
                },
                {
                    name: "url",
                    type: "text",
                },
                {
                    name: "project_id",
                    type: "uuid",
                },
            ],
            foreignKeys: [
                {
                    name: "ProjectImage",
                    columnNames: ["project_id"],
                    referencedTableName: "project",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("project_image")
    }

}
