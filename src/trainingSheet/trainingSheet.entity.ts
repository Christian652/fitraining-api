import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { Trainer } from '../trainer/trainer.entity';
import { Student } from '../student/student.entity';
import { Training } from 'src/training/training.entity';

@Entity({ name: "training_sheets" })
export class TrainingSheet extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @ManyToOne(() => Trainer, trainer => trainer.training_sheets)
  trainer: Trainer;

  @ManyToOne(() => Student, student => student.training_sheets)
  student: Student;

  @OneToMany(() => Training, training => training.training_sheet)
  trainings: Training[];
}