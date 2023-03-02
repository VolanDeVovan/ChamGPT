import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt'
import storage from 'node-persist'
import { Api } from 'telegram'
import { openaiApiKey } from './config'
import { russianPrisoner } from './presets'
import telegram from './telegram'

async function main() {
    await storage.init({
        dir: './data'
    })

    const openaiApi = new ChatGPTAPI({
        apiKey: openaiApiKey
    })

    let context = await openaiApi.sendMessage(russianPrisoner)

    const client = await telegram.login()
    const me: any = await client.getMe();

    client.addEventHandler(async rawEvent => {
        const { className } = rawEvent

        let text: string | null = null
        let chatId = null
        let messageId = null

        if (className === 'UpdateNewChannelMessage') {
            const event = rawEvent as Api.UpdateNewChannelMessage
            const message = event.message as Api.Message

            if (!message.out) return

            text = message.message
            chatId = message.chatId
            messageId = message.id
        } else if (className === 'UpdateShortMessage') {
            const event = rawEvent as Api.UpdateShortMessage

            if (!event.out) return

            text = event.message
            chatId = me.id
            messageId = event.id
        } else if (className === 'UpdateShortChatMessage') {
            const event = rawEvent as Api.UpdateShortChatMessage

            if (!event.out) return

            text = event.message
            chatId = me.id
            messageId = event.id
        }

        if (!text || !chatId || !messageId) return

        context = await openaiApi.sendMessage(text, {
            parentMessageId: context.id
        })

        await client.editMessage(chatId, {
            message: messageId,
            text: context.text,
        })
    })
}

main().catch(console.error)