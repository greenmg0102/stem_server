import {
    Controller,
    Post,
    Body,
    Param,
    Get
} from '@nestjs/common';
import { GroupByListService } from '../service/group-by-list.service'
import { CredentialFromOpportunityService } from '../service/credential-from-opportunity.service'
import { OpportunityFromPathwayService } from '../service/opportunity-from-pathway.service'
import { PathwayFromCredentialService } from '../service/pathway-from-credential.service'


@Controller('user/group-by-search')
export class GroupByListController {
    constructor(
        private groupByListService: GroupByListService,
        private credentialFromOpportunityService: CredentialFromOpportunityService,
        private pathwayFromCredentialService: PathwayFromCredentialService,
        private opportunityFromPathwayService: OpportunityFromPathwayService,
        
    ) { }

    @Get('/read')
    async read() {
        const hands = await this.groupByListService.groupByListRead();
        return hands;
    }

    
    @Post('/opportunity-from-pathway')
    async opportunityFromPathway(@Body() body: any) {
        const hands = await this.opportunityFromPathwayService.opportunityFromPathway(body);
        return hands;
    }

    @Post('/credential-from-opportunity')
    async credentialFromOpportunity(@Body() body: any) {
        const hands = await this.credentialFromOpportunityService.credentialFromOpportunity(body);
        return hands;
    }

    @Post('/pathway-from-credential')
    async pathwayFromCredential(@Body() body: any) {
        const hands = await this.pathwayFromCredentialService.pathwayFromCredential(body);
        return hands;
    }

    


    // @Post('/real-time-read')
    // async realTimeRead(@Body() body: any) {
    //     const hands = await this.groupByListService.realTimeRead(body);
    //     return hands;
    // }


    // @Get('/readId/:id')
    // async readId(@Param('id') id: string) {
    //     const hands = await this.integrationSearchService.readId(id);
    //     return hands;
    // }


}
