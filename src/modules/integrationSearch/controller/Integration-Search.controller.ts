import {
    Controller,
    Post,
    Body,
    Param,
    Get
} from '@nestjs/common';
import { IntegrationSearchService } from '../service/Integration-Search.service'

@Controller('user/integration-search')
export class IntegrationSearchController {
    constructor(
        private integrationSearchService: IntegrationSearchService,
    ) { }

    @Post('/read')
    async read(@Body() body: any) {
        const hands = await this.integrationSearchService.read(body);
        return hands;
    }

    
    @Get('/readId/:id')
    async readId(@Param('id') id: string) {
        const hands = await this.integrationSearchService.readId(id);
        return hands;
    }


}
