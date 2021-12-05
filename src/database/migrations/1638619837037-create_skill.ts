import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createSkill1638619837037 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "skill",
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
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "type",
                    type: "varchar",
                },
                {
                    name: "description",
                    type: "varchar",
                },
                {
                    name: "icon_url",
                    type: "text",
                },
                {
                    name: "more_link",
                    type: "text",
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("skill")
    }

}
