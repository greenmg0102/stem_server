import {
    Controller,
    Post,
    Get,
    Body,
} from '@nestjs/common';
import { OpportunitySearchService } from '../service/Opportunity-Search.service'

@Controller('/user/opportunity')
export class OpportunitySearchController {
    constructor(
        private opportunitySearchService: OpportunitySearchService,
    ) { }

    @Post('/read')
    async read(@Body() body: any) {

        const hands = await this.opportunitySearchService.read(body);
        return hands;
    }

    @Get('/filter-read')
    async filterRead(@Body() body: any) {

        const hands = await this.opportunitySearchService.filterRead();
        return hands;
    }

    @Post('/stem-accordingto-opportunity-read')
    async stemAccordingtoOpportunityRead(@Body() body: any) {


        let hands = []
        if (!body.isUnique) {
            hands = await this.opportunitySearchService.stemAccordingtoOpportunityRead(body);
        } else {
            hands = await this.opportunitySearchService.stemAccordingtoOpportunityUniqueSchoolRead(body);
        }


        return hands;
    }



}
