import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: 'numeric',
    nullable: false,
    unique: true,
  })
  phone!: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  firstName!: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  lastName!: string;

  @Column({
    type: 'varchar',
  })
  password: string;
}
