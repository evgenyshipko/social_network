/* eslint-disable camelcase */
import {
  Column,
  CreateDateColumn,
  Entity as EntityORM,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { City } from "./city.entity";

enum Sex {
  MALE = "MALE",
  FEMALE = "FEMALE",
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

  @Column({ type: "varchar", length: 100 })
  salt: string;

  @Column({ type: "date" })
  birthday: Date;

  @Column({
    type: "enum",
    nullable: false,
    enum: Object.values(Sex),
    enumName: "sex",
  })
  sex: Sex;

  @Column({ type: "uuid", name: "city_id" })
  cityId: string;

  @OneToOne(() => City)
  @JoinColumn({ name: "city_id" })
  city: City;
}
