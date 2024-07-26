import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  ValidateNested,
  IsOptional,
  IsArray,
} from 'class-validator';

class ProductCharacteristicDto {
  @IsString()
  name: string;

  @IsString()
  value: string;
}

export class CreateProductDto {
  @IsString()
  image: string;

  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  oldPrice?: number;

  @IsNumber()
  credit: number;

  @IsString()
  description: string;

  @IsString()
  advantages: string;

  @IsString()
  disADvantages: string;

  @IsArray({})
  @IsString({ each: true })
  categories: string[];

  @IsArray({})
  @IsString({ each: true })
  tags: string[];

  @IsArray()
  @ValidateNested()
  @Type(() => ProductCharacteristicDto)
  characteristics: ProductCharacteristicDto[];
}
