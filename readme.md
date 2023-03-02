# ChamGPT 
ChamGPT is a TypeScript project that allows you to edit your sent messages by passing them through ChatGPT. This allows you to add any context or slang to your messages.

*This project was created for the purpose of testing the ChatGPT API and does not have a specific purpose beyond that.*


## Prerequisites:

Before getting started with ChamGPT, please ensure that you have the following prerequisites installed on your system:

* Node.js (version >= 14.0.0)

Installation:

1. Clone the repository to your local machine.

```bash
git clone https://github.com/VolanDeVovan/ChamGPT.git
```

2. Navigate to the project directory.

```bash
cd ChamGPT
```

3. Install the dependencies using yarn.

```bash
yarn install
```

## Getting API Credentials

Before running ChamGPT, you will need to obtain the following API credentials:

* **Telegram API_ID** and **API_HASH**: These are required to authenticate with the Telegram API. You can obtain these by creating a new application on the Telegram website (https://my.telegram.org/apps) and following the instructions provided there.

* **OpenAI API token**: This is required to authenticate with the OpenAI API. You can obtain this by signing up for an account on the OpenAI website (https://openai.com/signup/) and following the instructions provided there.

Once you have obtained these credentials, you will need to set them as environment variables in your local environment. You can do this by creating a file called .env in the root directory of the project, and adding the following lines:

```
API_ID="YOUR_TELEGRAM_API_ID"
API_HASH="YOUR_TELEGRAM_API_HASH"
OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
```

Replace `YOUR_TELEGRAM_API_ID`, `YOUR_TELEGRAM_API_HASH`, and `YOUR_OPENAI_API_KEY` with the actual values of your credentials.


## Running the application
Now that you have set up the necessary credentials, you can start the ChamGPT bot by running the following command in the project directory:

```bash
yarn start
```

When you run this command for the first time, it will prompt you to enter your Telegram phone number and login code. This is necessary to authenticate the bot with your Telegram account. Please follow the instructions provided by the bot to complete the login process.

The ChamGPT bot listens for messages sent to it in Telegram and generates a response using the OpenAI GPT-3 model. When you send a message to the telegram, it will analyze the message and generate a response based on the input and edit sent message.


