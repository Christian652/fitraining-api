import { Exercise } from 'src/exercise/exercise.entity';
import { Training } from 'src/training/training.entity';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: "training_items" })
export class TrainingItem extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'integer'})
  num_sets: number;

  @Column({type: 'integer'})
  num_reps: number;

  @ManyToOne(() => Exercise, exercise => exercise.training_items)
  exercise: Exercise;

  @ManyToOne(() => Training, training => training.training_items)
  training: Training;
}