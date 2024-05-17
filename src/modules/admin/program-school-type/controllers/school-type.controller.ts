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
import { SchoolTypeService } from '../services/school-type.service'
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('admin/program-school/type')
export class SchoolTypeController {
    constructor(
        private schoolTypeService: SchoolTypeService,
    ) { }

    @Post('/read')
    async read(@Body() body: any) {

        const hands = await this.schoolTypeService.read(body);
        return hands;
    }

    @Post('/create')
    async create(@Body() body: any) {

        const hands = await this.schoolTypeService.create(body);
        return hands;
    }

    @Post('/delete')
    async delete(@Body() body: any) {

        const hands = await this.schoolTypeService.delete(body);
        return hands;
    }

    @Post('/update')
    async update(@Body() body: any) {

        const hands = await this.schoolTypeService.update(body);
        return hands;
    }
    
}
