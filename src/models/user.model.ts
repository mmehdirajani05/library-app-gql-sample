/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.model';
import { Exclude } from 'class-transformer';

@Entity({ name: 'user' })
export class UserModel extends BaseModel {
  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    name: 'name',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  avatar: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 128,
    nullable: true,
    select: false,
  })
  @Exclude()
  password: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
    name: 'socket_id',
  })
  socket_id: string;

}
