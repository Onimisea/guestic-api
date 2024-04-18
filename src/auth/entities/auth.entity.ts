import { Entity, Column, ObjectIdColumn, Index } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('users')
@Index(['email'], { unique: true }) // Index the email field for uniqueness and performance
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ type: 'string' })
  email: string;

  @Column({ type: 'string' })
  password: string;

  // Optional fields
  @Column({ type: 'string', nullable: true })
  firstname?: string;

  @Column({ type: 'string', nullable: true })
  lastname?: string;

  @Column({ type: 'string', nullable: true })
  phoneNumber?: string;

  @Column({ type: 'string', nullable: true })
  alternativePhoneNumber?: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: Date;
}
