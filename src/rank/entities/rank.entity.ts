import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rank {
    _id?: string;

    @Column()
    name: string;

    @Column()
    puntuacion: number;
}
