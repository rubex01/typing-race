import {vi} from "vitest";
import {socketServiceInterface} from "@/services/contracts/socketServiceInterface";

export class mockSocketService implements socketServiceInterface {
    join = vi.fn();
    emit = vi.fn();
}