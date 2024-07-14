import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { BookMark } from '../schema/Book-mark.schema';

@Injectable()
export class BookMarkService {

    constructor(
        @InjectModel(BookMark.name) private readonly bookMarkModal: Model<BookMark>,
    ) { }

    async create(body: any): Promise<any> {

        let newBookMarkModal = new this.bookMarkModal(body);
        await newBookMarkModal.save()

        return {
            isOkay: true
        }
    }

    async read(body: any): Promise<any> {

        let result = await this.bookMarkModal.find({ type: body.type, userId: body.userId });

        return {
            isOkay: true,
            result: result
        }
    }


}
