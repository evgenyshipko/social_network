/* eslint-disable camelcase */
import {
  Column,
  CreateDateColumn,
  Entity as EntityORM,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum Sex {
  MALE = "male",
  FEMALE = "female",
}

@EntityORM("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({
    type: "timestamp",
    name: "registration_date",
  })
  registrationDate: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_date" })
  updatedDate: Date;

  @Column({ type: "varchar", length: 100, name: "first_name" })
  firstName: string;

  @Column({ type: "varchar", length: 100, name: "last_name" })
  lastName: string;

  @Column({ type: "varchar", length: 512 })
  password: string;

  @Column({ type: "date" })
  birthday: Date;

  @Column({
    type: "enum",
    nullable: false,
    enum: Object.values(Sex),
    enumName: "sex",
  })
  sex: Sex;

  @Column({ type: "varchar", length: 100 })
  city: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "text" })
  about: string;
}
