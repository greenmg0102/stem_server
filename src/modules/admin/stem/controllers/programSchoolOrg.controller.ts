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
import { ProgramSchoolOrgService } from '../services/programSchoolOrg.service'
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('admin/stem/program-school-org')
export class ProgramSchoolOrgController {
    constructor(
        private programSchoolOrgService: ProgramSchoolOrgService,
    ) { }

    @Get('/')
    async read(@Query('name') name: string) {       

        const hands = await this.programSchoolOrgService.read(name);
        return hands;
    }

}
