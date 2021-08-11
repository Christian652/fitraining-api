import { MuscleGroup } from 'src/muscleGroup/muscleGroup.entity';
import { TrainingItem } from 'src/trainingItem/trainingItem.entity';
import { TrainingSheet } from 'src/trainingSheet/trainingSheet.entity';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, ManyToMany, OneToOne, ManyToOne, OneToMany, JoinTable } from 'typeorm';

@Entity({ name: "trainings" })
export class Training extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'simple-json' })
  days_in_week: any;

  @JoinTable()
  @ManyToMany(() => MuscleGroup, {primary: true})
  muscle_groups: MuscleGroup[];

  @ManyToOne(() => TrainingSheet, trainingSheet => trainingSheet.trainings)
  training_sheet: TrainingSheet;

  @OneToMany(() => TrainingItem, trainingItem => trainingItem.training)
  training_items: TrainingItem[];
}