/* eslint-disable prettier/prettier */
import { Entity, Column, CreateDateColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Exclude } from 'class-transformer';

export enum BookCollection {
  READ =  'read',
  READING = 'reading',
  UNREAD = 'want to read'
}

@Entity({ name: 'book' })
export class BookModel extends BaseModel {
  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    name: 'title',
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    name: 'author',
  })
  author: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
    name: 'description',
  })
  description: string;

  @Column({
    nullable: true,
    name: 'book_created_at',
  })
  book_created_at: Date;

}
