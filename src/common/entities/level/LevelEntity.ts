import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../User/UserEntity";
import { ProgramEntity } from "../program/ProgramEntity";

@Entity('Level')
export class LevelEntity{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    grade : string;
    @OneToMany(() => UserEntity, user => user.level)
    users: UserEntity[];
    @OneToOne(() => ProgramEntity, program => program.level)
    @JoinColumn()
    program: ProgramEntity;
}