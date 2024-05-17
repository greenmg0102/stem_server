import {
    Controller,
    Get,
    UseGuards,
    HttpCode,
    Param,
    Post,
    Body,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express';
import { SchoolService } from '../services/school.service'
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('admin/school')
export class SchoolController {
    constructor(
        private schoolService: SchoolService,
    ) { }

    @Post('/read')
    async read(@Body() body: any) {

        const hands = await this.schoolService.read(body);
        return hands;
    }

    @Post('/create')
    async create(@Body() body: any) {

        const hands = await this.schoolService.create(body);
        return hands;
    }

    @Post('/delete')
    async delete(@Body() body: any) {

        const hands = await this.schoolService.delete(body);
        return hands;
    }

    @Post('/update')
    async update(@Body() body: any) {

        const hands = await this.schoolService.update(body);
        return hands;
    }
    
}
