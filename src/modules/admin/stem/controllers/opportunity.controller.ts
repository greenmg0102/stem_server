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
import { OpportunityService } from '../services/Opportunity.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('admin/stem/opportunity')
export class OpportunityController {
    constructor(
        private opportunityService: OpportunityService,
    ) { }

    @Get('/')
    async read(@Query('opportunity') opportunity: string) {

        const hands = await this.opportunityService.read(opportunity);
        return hands;
    }

}
