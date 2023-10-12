import { CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn, VersionColumn } from 'typeorm';

@Entity()
export class baseEntity {
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date;

  @VersionColumn({ default: 1 })
  version: number;
}