import { IsString, IsNumber } from "class-validator";
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRankDto {
    
    @ApiProperty({ 
        example: 'Manolo', 
        description: 'Nombre del jugador' 
    })
    @IsString({
        message: 'Usted debe introducir un nombre en los parametros con el termino "name". Si desea, visite /api/v1/docs'
    })
    name: string;

    @ApiProperty({ 
        example: 1500, 
        description: 'Puntuación obtenida' 
    })
    @Type(() => Number)
    @IsNumber({}, {
        message: 'Usted debe introducir una puntuación numérica en los parametros con el termino "puntos". Si desea, visite /api/v1/docs'
    })
    puntos: number;
}