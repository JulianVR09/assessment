import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    day: string;

    @Column()
    startHour: string;

    @Column()
    endHour: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id'}) 
    user: User;

    @Column()
    doctorId: string;

    @Column({ nullable: true })
    reason?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
