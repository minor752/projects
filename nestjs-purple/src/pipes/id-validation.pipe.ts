import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { Types, isValidObjectId } from 'mongoose';
import { ID_VALIDATION_ERROR } from './pipes.constants';

export class IdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type != 'param') {
      return value;
    }
    if (!isValidObjectId(value)) {
      throw new BadRequestException(ID_VALIDATION_ERROR);
    }

    return value;
  }
}
