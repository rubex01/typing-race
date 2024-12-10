import '@/server';
import container from "@/container";
import {socketServiceInterface} from "@/services/contracts/socketServiceInterface";
import symbols from "@/symbols";
import {mockSocketService} from "@/tests/mocks/socketService";

container.registerSingleton<socketServiceInterface>(symbols.socketServiceInterface, mockSocketService);