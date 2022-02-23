import fs from 'fs';
import path from 'path';

type Counter = {
    [path: string]: number
};

type Metrics = {
    [key: string]: {}
};

type ReqInfo = {
    timestamp: string,
    ip: string,
    method: string,
    path: string,
    resStatus: string
};

export default class EasyMetrics {

    generateMetrics = (logFile: string) => {
        const fileContent = fs.readFileSync(logFile);
        const lines: string[] = fileContent.toString().split('\n');
        lines.pop(); // The last line is a blank line. Remove it.

        let totalRequests = 0;

        const requestsByPath: Counter = {};
        const requestsByIP: Counter = {};
        const statuses: Counter = {};

        const allReqs: ReqInfo[] = [];
        const timestamps: string[] = [];

        lines.forEach(line => {
            let req = this.parseLine(line);
            totalRequests++;
            allReqs.push(req);
            timestamps.push(req.timestamp);
            this.updateCount(requestsByPath, req.path);
            this.updateCount(requestsByIP, req.ip);
            this.updateCount(statuses, req.resStatus);
        });

        const metrics: Metrics = {
            total: { totalRequests },
            requests: { allReqs },
            requestsByPath,
            requestsByIP,
            statuses,
            timestamps
        }
        this.createFile(metrics);
    }

    parseLine = (line: string): ReqInfo => {
        const tokens: string[] = line.split(' ');
        return {
            timestamp: tokens[0],
            ip: tokens[5],
            method: tokens[6],
            path: tokens[7],
            resStatus: tokens[9]
        }
    }

    updateCount = (reqs: Counter, field: string) => {
        if (reqs[field]) {
            return reqs[field] += 1;
        } else {
            reqs[field] = 1;
        }
    }

    createFile = (metrics: Metrics) => {
        const metricsPath = path.join(__dirname, '../metrics');
        if (!fs.existsSync(metricsPath)) fs.mkdirSync(metricsPath);

        const metricsFile = path.join(__dirname, '../metrics/metrics.json');
        if (fs.existsSync(metricsFile)) fs.rmSync(metricsFile);

        const JSONMetrics = JSON.stringify(metrics);
        fs.appendFileSync(metricsFile, JSONMetrics);
    }

}