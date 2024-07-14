import {
    Controller,
    Post,
    Get,
    Body,
} from '@nestjs/common';
import { BookMarkService } from '../service/Book-mark.service'

@Controller('user/book-mark')
export class BookMarkController {
    constructor(
        private bookMarkService: BookMarkService,
    ) { }

    @Post('/create')
    async create(@Body() body: any) {

        const hands = await this.bookMarkService.create(body);
        return hands;
    }

    @Post('/read')
    async read(@Body() body: any) {

        const hands = await this.bookMarkService.read(body);
        return hands;
    }

}
