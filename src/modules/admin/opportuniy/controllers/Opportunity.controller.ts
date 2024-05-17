import {
    Controller,
    Post,
    Body,
} from '@nestjs/common';
import { OpportunityService } from '../services/opportunity.service'

@Controller('admin/opportunity')
export class OpportunityController {
    constructor(
        private opportunityService: OpportunityService,
    ) { }

    @Post('/read')
    async read(@Body() body: any) {

        const hands = await this.opportunityService.read(body);
        return hands;
    }

    @Post('/create')
    async create(@Body() body: any) {

        const hands = await this.opportunityService.create(body);
        return hands;
    }

    @Post('/delete')
    async delete(@Body() body: any) {

        const hands = await this.opportunityService.delete(body);
        return hands;
    }

    @Post('/update')
    async update(@Body() body: any) {

        const hands = await this.opportunityService.update(body);
        return hands;
    }

}
