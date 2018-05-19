import {HttpException} from '@nestjs/core';
import {ArgumentMetadata, HttpStatus, Pipe, PipeTransform} from '@nestjs/common';

@Pipe()
export class ParseIdPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
    } else if (val <= 0) {
      throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
    }
    return val;
  }
}
