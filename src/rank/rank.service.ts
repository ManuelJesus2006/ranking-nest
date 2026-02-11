import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRankDto } from './dto/create-rank.dto';
import { AstraService } from 'src/database/database.provider';
import { Rank } from './entities/rank.entity';

@Injectable()
export class RankService {
  constructor(
    private readonly astra: AstraService
  ) { }
  private get rankingCollection(){
    return this.astra.db.collection<Rank>('ranks')
  }

  ordenarPuntuacionOrdenCreciente() {
    try{
      
    }catch(e){
      throw new InternalServerErrorException(`Ha ocurrido un error fatal, pongase en contacto con su administrador: ${e}`)
    }
  }

  async encontrarCrearPorNombreYPuntos(createRankdDto: CreateRankDto) {
    try{
      const rank = await this.rankingCollection.findOne({name:createRankdDto.name, puntuacion:createRankdDto.puntos})
      if (rank) return rank
      const newRank:Rank = {
        _id: undefined,
        name: createRankdDto.name,
        puntuacion: createRankdDto.puntos
      }

      return {
        message: "Se ha creado el rank de forma exitosa",
        data: newRank
      }
      
    }catch(e){
      throw new InternalServerErrorException(`Ha ocurrido un error fatal, pongase en contacto con su administrador: ${e}`)
    }
  }
}
