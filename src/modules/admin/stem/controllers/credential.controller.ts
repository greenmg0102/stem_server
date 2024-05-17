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
import { CredentialService } from '../services/credential.service';
import { StemService } from '../services/stem.service';

import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('admin/stem/credential')
export class CredentialController {
    constructor(
        private credentialService: CredentialService,
        private stemService: StemService,
    ) { }

    @Get('/')
    async read(@Query('credential') credential: string) {

        const hands = await this.credentialService.read(credential);
        return hands;
    }

    @Post('/create')
    async create(@Body() body: any) {

        const hands = await this.stemService.create(body);
        return hands;
    }

}
