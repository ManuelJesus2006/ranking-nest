import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRankDto } from './dto/create-rank.dto';
import { AstraService } from 'src/database/database.provider';
import { Rank } from './entities/rank.entity';

@Injectable()
export class RankService {
  constructor(
    private readonly astra: AstraService
  ) { }
  private get rankingCollection() {
    return this.astra.db.collection<Rank>('ranks')
  }

  async ordenarPuntuacionOrdenCreciente() {

    let allRanks = await this.rankingCollection.find(
      {},
      { projection: { _id: 0 } }
    ).toArray();
    if (allRanks.length == 0) {
      throw new NotFoundException('No hay ningún ranking registrado. ¡Sea el primero en hacerlo en: GET /api/v1/notifica! No olvide utilizar los parametros nombre y puntos. Si desea, visite /api/v1/docs')
    }
    try {
      allRanks.sort((a, b) => b.puntuacion - a.puntuacion)
      return {
        message: 'Ranking ordenado de mayor a menor',
        data: allRanks
      }

    } catch (e) {
      throw new InternalServerErrorException(`Ha ocurrido un error fatal, pongase en contacto con su administrador: ${e}`)
    }
  }

  async encontrarCrearPorNombreYPuntos(createRankdDto: CreateRankDto) {

    if (!createRankdDto.name || !createRankdDto.puntos) {
      throw new BadRequestException('Usted no ha introducido los parámetros necesarios para crear o ver un ranking: nombre="(su nombre u otro)" y puntos="(su puntuación u otro)" Si desea, visite /api/v1/docs')
    }
    try {
      const rank = await this.rankingCollection.findOne({ name: createRankdDto.name, puntuacion: createRankdDto.puntos })
      if (rank) return {
        message: 'Se ha encontrado el rank de forma exitosa',
        data: {
          "name": rank.name,
          "puntuacion": rank.puntuacion
        }
      }
      const newRank: Rank = {
        _id: undefined,
        name: createRankdDto.name,
        puntuacion: createRankdDto.puntos
      }

      await this.rankingCollection.insertOne(newRank)

      return {
        message: "Se ha creado el rank de forma exitosa",
        data: newRank
      }

    } catch (e) {
      throw new InternalServerErrorException(`Ha ocurrido un error fatal, pongase en contacto con su administrador: ${e}`)
    }
  }
}
