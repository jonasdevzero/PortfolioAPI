import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createMessage1638619847007 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "message",
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
                    name: "email",
                    type: "text",                    
                },
                {
                    name: "text",
                    type: "text",
                },
                {
                    name: "sent_at",
                    type: "timestamp",
                    default: "now()",                    
                },
                {
                    name: "viewed",
                    type: "boolean",
                    default: false,
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("message")
    }

}
