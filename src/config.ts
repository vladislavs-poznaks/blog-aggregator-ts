import os from 'os';
import path from 'path';
import fs from 'fs';

export type Config = {
    dbUrl: string;
    currentUserName: string;
}

export const setUser = (user: string): void => {
    const config = readConfig()

    config.currentUserName = user

    writeConfig(config)
}

export const readConfig = (): Config => {
    const filePath = getConfigFilePath()

    return validateConfig(fs.readFileSync(filePath, 'utf8'))
}

const getConfigFilePath = (): string => {
    return path.join(os.homedir(), '.gatorconfig.json')
}

const validateConfig = (config: any): Config => {
    const parsed = JSON.parse(config)

    if (!parsed.db_url || typeof parsed.db_url !== 'string') {
        throw new Error('db_url is required and must be a string')
    }

    if (!parsed.current_user_name || typeof parsed.current_user_name !== 'string') {
        throw new Error('current_user_name is required and must be a string')
    }

    return {
        dbUrl: parsed.db_url,
        currentUserName: parsed.current_user_name,
    } as Config
}

const writeConfig = (config: Config): void => {
    const filePath = getConfigFilePath()

    fs.writeFileSync(filePath, JSON.stringify({
        db_url: config.dbUrl,
        current_user_name: config.currentUserName,
    }))
}