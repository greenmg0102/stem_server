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
import { CredentialService } from '../services/credential.service'
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('admin/credential')
export class CredentialController {
    constructor(
        private credentialService: CredentialService,
    ) { }

    @Post('/read')
    async read(@Body() body: any) {

        const hands = await this.credentialService.read(body);
        return hands;
    }

    @Post('/create')
    async create(@Body() body: any) {

        const hands = await this.credentialService.create(body);
        return hands;
    }

    @Post('/delete')
    async delete(@Body() body: any) {

        const hands = await this.credentialService.delete(body);
        return hands;
    }

    @Post('/update')
    async update(@Body() body: any) {

        const hands = await this.credentialService.update(body);
        return hands;
    }

}
