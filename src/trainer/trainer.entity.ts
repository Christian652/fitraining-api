import { TrainingSheet } from 'src/trainingSheet/trainingSheet.entity';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity'

@Entity({ name: "trainers" })
export class Trainer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany(() => TrainingSheet, trainingSheet => trainingSheet.trainer, {nullable: true})
  training_sheets: TrainingSheet[];

}