import { Module } from '@nestjs/common';
import { BookMarkService } from './service/Book-mark.service';
import { BookMarkController } from './controller/Book-mark.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookMark, BookMarkSchema } from './schema/Book-mark.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: BookMark.name, schema: BookMarkSchema },
  ])],
  providers: [BookMarkService],
  controllers: [
    BookMarkController
  ]
})

export class BookMarkModule { }