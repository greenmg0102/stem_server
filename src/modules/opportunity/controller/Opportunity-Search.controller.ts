import {
    Controller,
    Post,
    Body,
} from '@nestjs/common';
import { OpportunitySearchService } from '../service/Opportunity-Search.service'

@Controller('user/opportunity')
export class OpportunitySearchController {
    constructor(
        private opportunitySearchService: OpportunitySearchService,
    ) { }

    @Post('/read')
    async read(@Body() body: any) {

        const hands = await this.opportunitySearchService.read(body);
        return hands;
    }


}
