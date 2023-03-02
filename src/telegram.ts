import storage from 'node-persist'
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { apiId, apiHash } from './config';
import { phone, code, password } from './promts';

export async function login() {
    const savedSession: string = await storage.get('telegram_session')
    const stringSession = new StringSession(savedSession ?? "")

    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
    });

    await client.start({
        phoneNumber: async () => phone(),
        phoneCode: async () => code(),
        password: async () => password(),
        onError: (err) => console.log(err),
    });

    storage.set('telegram_session', await stringSession.save()) 

    return client
}


export default {
    login
}