import { config } from 'dotenv'

config()

export const apiId = Number(getenv('API_ID'))
export const apiHash = getenv('API_HASH')
export const openaiApiKey = getenv('OPENAI_API_KEY')


function getenv(name: string, defaultValue?: string) {
  const value = process.env[name]

  if (defaultValue === undefined && value === undefined) {
    throw new Error(`You must specify ${name} env`)
  }

  return (value ?? defaultValue) as string
}
