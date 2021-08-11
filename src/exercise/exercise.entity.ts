import { MuscleGroup } from 'src/muscleGroup/muscleGroup.entity';
import { TrainingItem } from 'src/trainingItem/trainingItem.entity';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, OneToMany, JoinTable } from 'typeorm';

@Entity({ name: "exercises" })
export class Exercise extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @OneToMany(() => TrainingItem, trainingItem => trainingItem.exercise, {nullable: true})
  training_items: TrainingItem[];
}