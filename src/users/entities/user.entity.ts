import { Appointment } from "../../appointments/entities/appointment.entity";
import { Role } from "../../common/enums/role.enum";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({ type: 'boolean', default: true})
    available: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[];
}
