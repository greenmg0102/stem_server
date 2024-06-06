import {
    Controller,
    Post,
    Get,
    Body,
} from '@nestjs/common';
import { CredentialSearchService } from '../service/Credential-Search.service'

@Controller('user/credential')
export class CredentialSearchController {
    constructor(
        private credentialSearchService: CredentialSearchService,
    ) { }

    @Post('/read')
    async read(@Body() body: any) {

        const hands = await this.credentialSearchService.read(body);
        return hands;
    }

    @Get('/filter-read')
    async filterRead(@Body() body: any) {

        const hands = await this.credentialSearchService.filterRead();
        return hands;
    }

    @Post('/stem-accordingto-credential-read')
    async stemAccordingtoCredentialRead(@Body() body: any) {

        const hands = await this.credentialSearchService.stemAccordingtoCredentialRead(body);
        return hands;
    }
    


}
