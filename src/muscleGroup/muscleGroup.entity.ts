import { Exercise } from 'src/exercise/exercise.entity';
import { Training } from 'src/training/training.entity';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, ManyToMany } from 'typeorm';

@Entity({ name: "muscle_groups" })
export class MuscleGroup extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @ManyToMany(() => Training, {primary: true, nullable: true})
  trainings: Training;
}