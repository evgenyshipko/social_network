import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("friend_link")
export class FriendLink {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column({
    type: "uuid",
    name: "user_id_1",
  })
  userId1: string;

  @Column({
    type: "uuid",
    name: "user_id_2",
  })
  userId2: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id_1" })
  user1: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id_2" })
  user2: string;
}
