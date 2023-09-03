import LLMService from "./LLMService";
import ServiceStatus from "./ServiceStatus";

export default interface RunningLLMService {
    service: LLMService,
    status: ServiceStatus,
    ttlTimer: NodeJS.Timer
}