import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("city")
export class City {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: "100",
  })
  name: string;
}
