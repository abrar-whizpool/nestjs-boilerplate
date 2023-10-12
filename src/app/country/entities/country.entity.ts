import { baseEntity } from 'src/utils/baseEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Country extends baseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;
}
