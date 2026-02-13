import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query } from '@nestjs/common';
import { RankService } from './rank.service';
import { CreateRankDto } from './dto/create-rank.dto';
import { UpdateRankDto } from './dto/update-rank.dto';

@Controller('api/v1/')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get('/notifica')
  findAll(@Query() createRankdDto: CreateRankDto) {
    return this.rankService.encontrarCrearPorNombreYPuntos(createRankdDto);
  }

  @Get('/ranking')
  findOne() {
    return this.rankService.ordenarPuntuacionOrdenCreciente();
  }
}
