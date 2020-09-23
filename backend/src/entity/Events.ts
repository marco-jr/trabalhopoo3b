/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { uuid as uuidv4 } from 'uuidv4';
import User from './User';

@Entity('events')
export class Events {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId: string;

  @Column()
  name!: string;

  @Column()
  picture!: string;

  @Column()
  description!: string;

  @Column()
  location!: string;

  @ManyToOne(type => User, user => user.events)
  user: User;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async uuid() {
    this.id = uuidv4();
  }
}

export default Events;
