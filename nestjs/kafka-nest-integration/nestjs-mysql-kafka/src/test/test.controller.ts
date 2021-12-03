import { TestService } from './test.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller("test")
export class TestController {
    constructor(private service: TestService) {

    }

    @Get(":id") // test/:id
    acao(@Param("id") id) {
        console.log(id)
        return this.service.method1();
    }
}
