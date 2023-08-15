import { Exclude } from "class-transformer";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoleEntity } from "../role/RoleEntity";
import { LevelEntity } from "../level/LevelEntity";

export enum StatusEnum {
    ADMIN = 'admin',    
    MEMBER = 'member',   
}

@Entity('User')
export class UserEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;   

    @Column({ unique: true })
    email: string;
    
    @Column()
    @Exclude()
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: StatusEnum.MEMBER })
    status: StatusEnum;

    @ManyToMany(() => RoleEntity, role => role.users)
    @JoinTable({
        name: 'user_role',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' }
    })
    roles: RoleEntity[];
    @ManyToOne(() => LevelEntity, level => level.users, { nullable: true })
    level: LevelEntity;
}