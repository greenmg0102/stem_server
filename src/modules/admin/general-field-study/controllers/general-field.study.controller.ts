import {
    Controller,
    Post,
    Body,
} from '@nestjs/common';
import { GeneralFieldStudyService } from '../services/general-field-study.service'

@Controller('admin/general-study-field')
export class GeneralFieldStudyController {
    constructor(
        private generalFieldStudyService: GeneralFieldStudyService,
    ) { }

    @Post('/read')
    async read(@Body() body: any) {

        const hands = await this.generalFieldStudyService.read(body);
        return hands;
    }

    @Post('/create')
    async create(@Body() body: any) {

        const hands = await this.generalFieldStudyService.create(body);
        return hands;
    }

    @Post('/delete')
    async delete(@Body() body: any) {

        const hands = await this.generalFieldStudyService.delete(body);
        return hands;
    }

    @Post('/update')
    async update(@Body() body: any) {

        const hands = await this.generalFieldStudyService.update(body);
        return hands;
    }

}
