"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class EasyMetrics {
    constructor() {
        this.generateMetrics = (logFile) => {
            const fileContent = fs_1.default.readFileSync(logFile);
            const lines = fileContent.toString().split('\n');
            lines.pop(); // The last line is a blank line. Remove it.
            let totalRequests = 0;
            const requestsByPath = {};
            const requestsByIP = {};
            const statuses = {};
            const allReqs = [];
            const timestamps = [];
            lines.forEach(line => {
                let req = this.parseLine(line);
                totalRequests++;
                allReqs.push(req);
                timestamps.push(req.timestamp);
                this.updateCount(requestsByPath, req.path);
                this.updateCount(requestsByIP, req.ip);
                this.updateCount(statuses, req.resStatus);
            });
            const metrics = {
                total: { totalRequests },
                requests: { allReqs },
                requestsByPath,
                requestsByIP,
                statuses,
                timestamps
            };
            this.createFile(metrics);
        };
        this.parseLine = (line) => {
            const tokens = line.split(' ');
            return {
                timestamp: tokens[0],
                ip: tokens[5],
                method: tokens[6],
                path: tokens[7],
                resStatus: tokens[9]
            };
        };
        this.updateCount = (reqs, field) => {
            if (reqs[field]) {
                return reqs[field] += 1;
            }
            else {
                reqs[field] = 1;
            }
        };
        this.createFile = (metrics) => {
            const metricsPath = path_1.default.join(__dirname, '../metrics');
            if (!fs_1.default.existsSync(metricsPath))
                fs_1.default.mkdirSync(metricsPath);
            const metricsFile = path_1.default.join(__dirname, '../metrics/metrics.json');
            if (fs_1.default.existsSync(metricsFile)) {
                fs_1.default.rmSync(metricsFile);
            }
            const JSONMetrics = JSON.stringify(metrics);
            fs_1.default.appendFileSync(metricsFile, JSONMetrics);
        };
    }
}
exports.default = EasyMetrics;
