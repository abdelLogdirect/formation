import fs from 'fs';
import path from 'path';

const configPath = path.join(__dirname, '..', 'server.conf.json');

/** @type {{ jwtSecret: string }} */
export const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
