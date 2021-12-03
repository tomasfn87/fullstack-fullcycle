import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
    method1() {
        return "Test service is running.";
    }
}