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
import { ProgramSchoolOrgTypeService } from '../services/programSchoolOrgType.service'
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('admin/stem/program-school-org-type')
export class ProgramSchoolOrgTypeController {
    constructor(
        private programSchoolOrgTypeService: ProgramSchoolOrgTypeService,
    ) { }

    @Get('/')
    async read(@Query('type') type: string) {

        const hands = await this.programSchoolOrgTypeService.read(type);
        return hands;
    }

}
