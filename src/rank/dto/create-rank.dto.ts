import { IsString, IsNumber} from "class-validator";
export class CreateRankDto {
    @IsString()
    name: string

    @IsNumber()
    puntos: number
}
