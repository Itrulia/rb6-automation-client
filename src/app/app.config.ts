import {environment} from "../environments/environment";
import {Injectable} from "@angular/core";

@Injectable()
export class AppConfig {
    public get baseUrl() {
        if (environment.production) {
            return "https://rb6-temporary.grenn.io";
        }

        return "https://rb6-temporary.grenn.io";
        // return "http://localhost:8080";
    }
}
