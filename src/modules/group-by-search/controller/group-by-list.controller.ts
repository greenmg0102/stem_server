import {
    Controller,
    Post,
    Body,
    Param,
    Get
} from '@nestjs/common';
import { GroupByListService } from '../service/group-by-list.service'

@Controller('user/group-by-search')
export class GroupByListController {
    constructor(
        private groupByListService: GroupByListService,
    ) { }

    @Get('/read')
    async read() {
        const hands = await this.groupByListService.groupByListRead();
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
