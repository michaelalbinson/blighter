'use strict';

import LLMService from "./types/LLMService";
import ServiceStatus from "./types/ServiceStatus";
import {execSync} from "child_process";
import path from "path";
import Logger from "../Logger";
import RunningLLMService from "./types/RunningLLMService";


export default class ServiceManager {
    private readonly activeServices: Map<string, RunningLLMService> = new Map<string, RunningLLMService>();

    async ensureServiceRunning(service: LLMService) {
        const currentService = this.activeServices.get(service.llmFile);
        if (!currentService)
            return await this.wakeUp(service);

        switch (currentService.status) {
            case ServiceStatus.ACTIVE:
                Logger.info(`Model already up, resetting snooze timer for ${service.llmFile}`);
                this.resetSnoozeTimer(service);
                return;
            case ServiceStatus.SPINNING_UP:
                Logger.info(`Service is already spinning up, let's just wait for it`);
                await this.sleep(500);
                return;
            case ServiceStatus.SPINNING_DOWN:
                Logger.info('Service is currently spinning down, waiting for it to finish...');
                await this.sleep(500);
                await this.wakeUp(service);
        }
    }

    private async wakeUp(service: LLMService) {
        Logger.info(`Waking up llama.cpp model ${service.llmFile}`);
        const newService = {
            service,
            status: ServiceStatus.SPINNING_UP
        } as RunningLLMService;
        this.activeServices.set(service.llmFile, newService);
        try {
            execSync(`./server -m ./models/${service.llmFile} -c ${service.contextLength} --port ${service.port} &`, {
                cwd: path.join(process.env.LLAMA_CPP_PATH || '.'),
                stdio: 'ignore'
            });
        } catch (e) {
            Logger.error(`Failed to start model ${service.llmFile}`);
            Logger.debug(e);
            return;
        }

        newService.status = ServiceStatus.ACTIVE;
        this.activeServices.set(service.llmFile, newService);
        Logger.info(`Model ${service.llmFile} successfully started on port ${service.port}`);
        this.setupSnoozeTimer(service);
    }

    private setupSnoozeTimer(service: LLMService) {
        const currentService = this.activeServices.get(service.llmFile);
        if (!currentService)
            return;

        const TTL = (Number(process.env.LLAMA_CPP_TTL) || 600) * 1000;
        currentService.ttlTimer = setTimeout(() => this.kill(service), TTL);
    }

    resetSnoozeTimer(service: LLMService) {
        const currentService = this.activeServices.get(service.llmFile);
        if (!currentService)
            return;

        const currentTimer = currentService.ttlTimer;
        if (currentTimer)
            clearTimeout(currentTimer);

        this.setupSnoozeTimer(service);
    }

    private async kill(service: LLMService) {
        const currentService = this.activeServices.get(service.llmFile);
        if (!currentService)
            return Logger.log(`It appears the service for ${service.llmFile} was already killed...`)

        currentService.status = ServiceStatus.SPINNING_DOWN;
        const response = execSync('ps').toString();
        let processToKill;
        const processes = response.split('\n');
        for (let line of processes) {
            if (!line.includes(`./models/${service.llmFile}`))
                continue;

            processToKill = line;
            break;
        }

        if (!processToKill)
            throw new Error(`Failed to find running model to kill with '${service.llmFile}`);

        const pidMatches = processToKill.match(/[0-9]{3,} /mg);
        if (!pidMatches)
            throw new Error(`Failed to find PID for model '${service.llmFile}'`);

        const pid = pidMatches[0].trim();
        Logger.debug(`Running 'kill ${pid}'`)
        execSync(`kill ${pid}`);
        Logger.log(`Successfully killed model process ${pid} for model '${service.llmFile}'`);
        currentService.status = ServiceStatus.STOPPED;
        this.activeServices.delete(service.llmFile);
    }

    async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async killAll() {
        Logger.warn('Killing all LLM services!');
        const allServices = this.activeServices.values();
        for (let service of allServices) {
            clearTimeout(service.ttlTimer);
            await this.kill(service.service);
        }
    }
}