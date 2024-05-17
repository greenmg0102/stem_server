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
import { CredentialSchoolService } from '../services/CredentialSchool.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('admin/stem/crendential-school')
export class SchoolController {
    constructor(
        private credentialSchoolService: CredentialSchoolService,
    ) { }

    @Get('/')
    async read(@Query('school') school: string) {

        const hands = await this.credentialSchoolService.read(school);
        return hands;
    }

}
