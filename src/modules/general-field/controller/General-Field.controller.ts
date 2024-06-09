import {
    Controller,
    Post,
    Get,
    Body,
} from '@nestjs/common';
import { GeneralFieldService } from '../service/General-Field.service'

@Controller('user/general')
export class GeneralFieldController {
    constructor(
        private generalFieldService: GeneralFieldService,
    ) { }

    @Post('/read')
    async read(@Body() body: any) {

        const hands = await this.generalFieldService.read(body);
        return hands;
    }

    @Get('/filter-read')
    async filterRead(@Body() body: any) {

        const hands = await this.generalFieldService.filterRead();
        return hands;
    }

    @Post('/stem-accordingto-general-read')
    async stemAccordingtoGeneralFieldRead(@Body() body: any) {

        const hands = await this.generalFieldService.stemAccordingtoGeneralFieldRead(body);
        return hands;
    }
    


}
