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
import { ProgramSchoolOrgService } from '../services/program-school-org.service'
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('admin/program-school-org')
export class ProgramSchoolOrgController {
    constructor(
        private programSchoolOrgService: ProgramSchoolOrgService,
    ) { }

    @Post('/read')
    async read(@Body() body: any) {

        const hands = await this.programSchoolOrgService.read(body);
        return hands;
    }

    @Post('/create')
    async create(@Body() body: any) {

        const hands = await this.programSchoolOrgService.create(body);
        return hands;
    }

    @Post('/delete')
    async delete(@Body() body: any) {

        const hands = await this.programSchoolOrgService.delete(body);
        return hands;
    }

    @Post('/update')
    async update(@Body() body: any) {

        const hands = await this.programSchoolOrgService.update(body);
        return hands;
    }

}
