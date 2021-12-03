import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProjects1638554925302 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "projects",
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'text',
                },
                {
                    name: 'html',
                    type: 'text',
                },
                {
                    name: 'repository_link',
                    type: 'text',
                },
                {
                    name: 'website_link',
                    type: 'text',
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("projects")
    }

}
