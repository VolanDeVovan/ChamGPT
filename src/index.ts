import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt'
import storage from 'node-persist'
import { Api } from 'telegram'
import dedent from 'ts-dedent'
import { openaiApiKey } from './config'
import telegram from './telegram'

async function main() {
    await storage.init({
        dir: './data'
    })

    const openaiApi = new ChatGPTAPI({
        apiKey: openaiApiKey
    })

    let context = await openaiApi.sendMessage(dedent`
        I want you to act as an Russian prison jargon translator, slurs adder. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in Russian. I want you to replace my simplified A0-level words and sentences with more slurs and prison jargon's words and sentences. Keep the meaning same, but make them more slurs. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is "привет"
    `)

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