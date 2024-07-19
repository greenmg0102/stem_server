import {
    Controller,
    Post,
    Body,
    Param,
    Get
} from '@nestjs/common';
import { GroupByListService } from '../service/group-by-list.service'
import { CredentialFromOpportunityService } from '../service/credential-from-opportunity.service'
import { OpportunityFromPathwayService } from '../service/opportunity-from-pathway.service copy'
import { OccupationFromPathwayService } from '../service/occupation-from-pathway.service'
import { CredentialFromOccupationService } from '../service/credential-from-occupation.service'

import { PathwayFromCredentialService } from '../service/pathway-from-credential.service'


@Controller('user/group-by-search')
export class GroupByListController {
    constructor(
        private groupByListService: GroupByListService,
        private credentialFromOpportunityService: CredentialFromOpportunityService,
        private pathwayFromCredentialService: PathwayFromCredentialService,
        private opportunityFromPathwayService: OpportunityFromPathwayService,
        private occupationFromPathwayService: OccupationFromPathwayService,
        private credentialFromOccupationService: CredentialFromOccupationService,

    ) { }

    @Get('/read')
    async read() {
        const hands = await this.groupByListService.groupByListRead();
        return hands;
    }
    
    @Post('/occupation-from-credential')
    async credentialFromOccupation(@Body() body: any) {
        const hands = await this.credentialFromOccupationService.credentialFromOccupation(body);
        return hands;
    }

    @Post('/occupation-from-pathway')
    async occupationFromPathway(@Body() body: any) {
        const hands = await this.occupationFromPathwayService.occupationFromPathway(body);
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
