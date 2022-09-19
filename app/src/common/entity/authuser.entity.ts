import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth_user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'email_id', unique: true})
    emailId: string;

    @Column({ name:'first_name' })
    firstName: string;

    @Column({ name:'last_name' })
    lastName: string;

    @Column({ name: "zip_code" })
    zipCode: string;
}