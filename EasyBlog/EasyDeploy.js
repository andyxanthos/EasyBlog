"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dirConfig_1 = __importDefault(require("./dirConfig"));
const configJSON = fs_1.default.readFileSync(path_1.default.join(__dirname, '../easyconfig.json'));
const config = JSON.parse(configJSON.toString());
class EasyDeploy {
    constructor() {
        this.preDeployChecks = () => {
            // Check that every post has a corresponding file in /views and /meta
            console.log('🔎 Checking files...');
            const postFiles = fs_1.default.readdirSync(dirConfig_1.default.postsDir).map(f => f.split('.')[0]);
            const viewFiles = fs_1.default.readdirSync(dirConfig_1.default.viewsDir).map(f => f.split('.')[0]);
            const metaFiles = fs_1.default.readdirSync(dirConfig_1.default.metaDir).map(f => f.split('.')[0]);
            let okay = true;
            postFiles.forEach(file => {
                if (viewFiles.includes(file) && metaFiles.includes(file)) {
                    console.log(`Post ${file} has corresponding view and meta files`);
                }
                else {
                    console.log(`❌ ERROR: Post ${file} does not have a matching view OR meta file.`);
                    okay = false;
                }
            });
            return okay;
        };
        this.createDeployment = () => {
            const deploymentPath = path_1.default.join(__dirname, '../deployment');
            // Delete any existing deployments if they exist.
            if (fs_1.default.existsSync(deploymentPath)) {
                console.log(`‼️ Current deployment found at ${deploymentPath}.`);
                console.log('Removing existing deployment...');
                fs_1.default.rmSync(deploymentPath, { recursive: true });
                if (fs_1.default.existsSync(deploymentPath))
                    return console.log('❌ ERROR: Could not delete existing deployment.');
            }
            // Create all necessary directories.
            const staticPath = path_1.default.join(deploymentPath, '/static');
            const cssPath = path_1.default.join(staticPath, '/css');
            const jsPath = path_1.default.join(staticPath, '/js');
            const directories = [deploymentPath, staticPath, cssPath, jsPath];
            directories.forEach(dir => {
                fs_1.default.mkdirSync(dir, { recursive: true });
                if (fs_1.default.existsSync(dir)) {
                    console.log(`✅ Successfully created directory ${dir}`);
                }
            });
            // There has to be a better way to do this, but this
            // works for now.
            const files = fs_1.default.readdirSync(dirConfig_1.default.viewsDir);
            const viewFiles = ['', ...files].map(f => f.split('.')[0]);
        };
    }
}
exports.default = EasyDeploy;
