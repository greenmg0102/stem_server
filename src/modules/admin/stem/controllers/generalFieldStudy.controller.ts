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
import { GeneralFieldStudyService } from '../services/generalFieldStudy.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('admin/stem/field')
export class GeneralFieldStudyController {
    constructor(
        private generalFieldStudyService: GeneralFieldStudyService,
    ) { }

    @Get('/')
    async read(@Query('field') field: string) {

        const hands = await this.generalFieldStudyService.read(field);
        return hands;
    }

}
