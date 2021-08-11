import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Seeder } from "nestjs-seeder";
import { MuscleGroupRepository } from "src/muscleGroup/muscleGroup.repository";
import { ExerciseRepository } from "./exercise.repository";

@Injectable()
export class ExerciseSeeder implements Seeder {
  constructor(
    @InjectRepository(ExerciseRepository)
    private exerciseRepository: ExerciseRepository,
    @InjectRepository(MuscleGroupRepository)
    private muscleGroupRepository: MuscleGroupRepository,
  ) { }

  async seed(): Promise<any> {
    try {
      await this.muscleGroupRepository.insertMany([
        {
          id: 1,
          name: "Quadriceps"
        },
        {
          id: 2,
          name: "Riscotibiais"
        },
        {
          id: 3,
          name: "Panturrilhas"
        },
        {
          id: 4,
          name: "Gluteos"
        },
        {
          id: 5,
          name: "Abdomen"
        },
        {
          id: 6,
          name: "Peitoral"
        },
        {
          id: 7,
          name: "Dorsal"
        },
        {
          id: 8,
          name: "Ombros"
        },
        {
          id: 9,
          name: "Biceps"
        },
        {
          id: 10,
          name: "Triceps"
        },
      ]);

      await this.exerciseRepository.insertMany([
        // Quadriceps
        {
          id: null,
          name: "Cadeira Extensora", 
        },
        {
          id: null,
          name: "Leg 45°", 
        },
        {
          id: null,
          name: "Leg 90°" 
        },
        {
          id: null,
          name: "Agachamento Livre", 
        },
        {
          id: null,
          name: "Agachamento Bulgaro", 
        },
        {
          id: null,
          name: "Agachamento Guiado", 
        },
        {
          id: null,
          name: "Afundo", 
        },
        {
          id: null,
          name: "Avanço e Passada", 
        },
        // Posterior de Coxa
        {
          id: null,
          name: "Cadeira Flexora", 
        },
        {
          id: null,
          name: "Flexora Unilateral", 
        },
        {
          id: null,
          name: "Stiff", 
        },
        {
          id: null,
          name: "Flexão Nordica", 
        },
        // Gluteo
        {
          id: null,
          name: "Abdução maquina", 
        },
        {
          id: null,
          name: "Elevação pelvica", 
        },
        {
          id: null,
          name: "Elevação pelvica Unilateral", 
        },
        // Peitoral
        {
          id: null,
          name: "Supino Reto", 
        },
        {
          id: null,
          name: "Supino Inclinado", 
        },
        {
          id: null,
          name: "Supino Declinado", 
        },
        {
          id: null,
          name: "Supino Declinado", 
        },
        {
          id: null,
          name: "CrossOver", 
        },
        {
          id: null,
          name: "Peck Deck (Fly)", 
        },
        {
          id: null,
          name: "Flexão de Braço", 
        },
        {
          id: null,
          name: "Supino Reto Com Alteres", 
        },
        {
          id: null,
          name: "Supino Inclinado Com Alteres", 
        },
        {
          id: null,
          name: "Supino Declinado Com Alteres", 
        },
        // Costas
        {
          id: null,
          name: "Remada Curvada", 
        },
        {
          id: null,
          name: "Remada Unilateral", 
        },
        {
          id: null,
          name: "Remada Cavalinho", 
        },
        {
          id: null,
          name: "Remada Maquina", 
        },
        {
          id: null,
          name: "Puxador Frontal", 
        },
        {
          id: null,
          name: "Puxador Supinado", 
        },
        {
          id: null,
          name: "Remada Baixa", 
        },
        {
          id: null,
          name: "Remada Com Alteres", 
        },
        {
          id: null,
          name: "Barra Fixa", 
        },
        // Biceps
        {
          id: null,
          name: "Rosca Direta", 
        },
        {
          id: null,
          name: "Rosca Unilateral", 
        },
        {
          id: null,
          name: "Rosca Concentrada", 
        },
        {
          id: null,
          name: "Rosca 21", 
        },
        {
          id: null,
          name: "Rosca Banco Scott", 
        },
        {
          id: null,
          name: "Rosca na Polia", 
        },
        {
          id: null,
          name: "Biceps na Polia", 
        },
        {
          id: null,
          name: "Rosca com Alteres", 
        },
        // Triceps
        {
          id: null,
          name: "Triceps Corda", 
        },
        {
          id: null,
          name: "Triceps Pulley", 
        },
        {
          id: null,
          name: "Triceps Testa com Barra", 
        },
        {
          id: null,
          name: "Triceps Testa com Alteres", 
        },
        {
          id: null,
          name: "Triceps Francês", 
        },
        {
          id: null,
          name: "Triceps Francês Unilateral", 
        },
        {
          id: null,
          name: "Triceps Pulley Unilateral", 
        },
        {
          id: null,
          name: "Triceps Corda no Banco", 
        },
        // Ombros
        {
          id: null,
          name: "Elevação Lateral", 
        },
        {
          id: null,
          name: "Elevação Lateral Unilateral na Polia", 
        },
        {
          id: null,
          name: "Elevação Frontal", 
        },
        {
          id: null,
          name: "Remada Alta", 
        },
        {
          id: null,
          name: "Desenvolvimento de Ombros com Alteres", 
        },
        {
          id: null,
          name: "Desenvolvimento de Ombros com Barra", 
        },
        {
          id: null,
          name: "Crussifixo Inverso com Alteres", 
        },
        // panturrilha
        {
          id: null,
          name: "Flexão Plantar", 
        },
        {
          id: null,
          name: "Flexão Plantar no Leg", 
        },
        {
          id: null,
          name: "Flexão Plantar no Hack", 
        },
        {
          id: null,
          name: "Flexão Plantar Sentada", 
        },
        // Abdomen
        {
          id: null,
          name: "Abdominal Militar", 
        },
        {
          id: null,
          name: "Abdominal 'Curtinho'", 
        },
        {
          id: null,
          name: "Prancha", 
        },
        {
          id: null,
          name: "Prancha Lateral", 
        },
        {
          id: null,
          name: "Abs Supra", 
        },
        {
          id: null,
          name: "Abs Infra", 
        },
      ]);
    } catch (error) { 
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }

  async drop(): Promise<any> {
    try {
      const exercise = await this.exerciseRepository.find();
      await this.exerciseRepository.remove(exercise);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }
}