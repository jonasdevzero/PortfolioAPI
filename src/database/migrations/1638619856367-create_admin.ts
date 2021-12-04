import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createAdmin1638619856367 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "admin",
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
                    name: "username",
                    type: "varchar"
                },
                {
                    name: "email",
                    type: "text",
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "role",
                    type: "integer",
                },
                {
                    name: "activated",
                    type: "boolean",
                    default: true,
                },
                {
                    name: "reset_token",
                    type: "varchar",
                    isNullable: true,
                    isUnique: true,
                },
                {
                    name: "expire_token",
                    type: "timestamp",
                    default: "now()",
                    isNullable: true,                
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("admin")
    }

}
