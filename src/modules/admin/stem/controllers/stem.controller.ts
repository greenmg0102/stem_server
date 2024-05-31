import {
    Controller,
    Get,
    UseGuards,
    HttpCode,
    Query,
    Param,
    Post,
    Req,
    Body,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express';
import { StemService } from '../services/stem.service';

import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('admin/stem')

export class StemController {
    constructor(
        private stemService: StemService,
    ) { }


    @Post('/read')
    async read(@Body() body: any) {
        const hands = await this.stemService.read(body);
        return hands;
    }

    @Post('/create')
    async create(@Body() body: any) {
        const hands = await this.stemService.create(body);
        return hands;
    }

    @Post('/dump-create')
    async dumpCreate(@Body() body: any) {
        const hands = await this.stemService.dumpCreate(body);
        return hands;
    }

    @Post('/stem-stream')
    async stemStream(@Body() body: any) {
        const hands = await this.stemService.stemStream(body);
        return hands;
    }

}
