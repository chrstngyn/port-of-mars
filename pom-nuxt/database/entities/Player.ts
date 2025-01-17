import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role, ROLES } from "@/core/types";
import { User } from "./User";
import { Game } from "./Game";

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "enum",
    enum: ROLES,
  })
  role!: Role;

  @ManyToOne((type) => User, (user) => user.players, { nullable: false })
  user!: User;

  @ManyToOne((type) => Game, (game) => game.players, { nullable: false })
  game!: Game;

  @Column("int", { nullable: true })
  points!: number | null;
}
