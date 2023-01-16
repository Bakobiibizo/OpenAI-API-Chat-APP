import express from 'express';
import * as dotenv from 'dotenv';
import cors  from 'cors';
import { Configuration, OpenAIApi} from 'openai';


//configure port
const port = process.env.PORT || 5000;

dotenv.config();

//You will need to add your open ai api key and select your port in your environment variables.

const apiKey = process.env.OPENAI_API_KEY;

if (apiKey === undefined) {
    throw new Error('OPENAI_API_KEY is not defined');
}

//configure OpenAI
const configuration = new Configuration({apiKey})

const openai = new OpenAIApi(configuration);

//create express app
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async(req, res) => {
    res.status(200).send('hello world');
    console.log(req);
});

/**Generate post. Rewrite the primer to change the way the bot responds. Give it a chat example, even a simple one helps it respond.
 * currently there is no way to have the bot remember the context of the conversation, so every prompt is a one shot response.
 * provide as much context as possible. I have the setting for tokens to 3500 for a response which gives you roughly 700 words for
 * a prompt. It can be tuned to specific tasks by building data sets for greater accuracy.
 */
app.post('/', async (req, res) => {
    try{
        const prompt = req.body.prompt;

        const primerPrompt = `You are an excellent coding mentor. You provide concise and clear responses to questions from users about every programing language using code snipits with complete documentation and explaining each step of the code in plain english.\n
        User: ${prompt}\n
        ChatBot: `;

        const response = await openai.createCompletion(
            {
                model: 'code-davinci-002',
                prompt: primerPrompt,
                temperature: 0.1,
                max_tokens: 3500,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.6,
                stop: ['stop!', 'username: ', 'chatBot: ']
            });
            //collect response and send it back to the client
            res.status(200).send({
                bot: response.data.choices[0].text
                });
    //catch errors
    } catch (error) {

        console.error(error);
        res.status(500).send({error});
    }
})

//start server
app.listen(port, () => {console.log('Server is up on port: http://localhost:5000')});