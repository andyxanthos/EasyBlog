import path from "path";

export type DirConfigMap = {
    viewsDir: string,
    postsDir: string,
    metaDir: string,
    logDir: string,
    staticFiles: string[]
}

const dirConfig: DirConfigMap = {
    // DIRECTORY CONFIG
    viewsDir: path.join(__dirname, '../views'),
    postsDir: path.join(__dirname, '../posts'),
    metaDir: path.join(__dirname, '../meta'),
    logDir: path.join(__dirname, '../logs'),
    staticFiles: ['index.hbs', 'layout.hbs']
};


export default dirConfig;