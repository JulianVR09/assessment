import { Role } from "src/common/enums/role.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ select: false, nullable: false })
    password: string;

    @Column()
    phone: string;

    @Column({ type: 'enum', default: Role.USER, enum: Role})
    role: Role;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
