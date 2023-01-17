

// select the token limit for the conversation queue based on model
export function selectConversationQueue(model: string) {

    if (model === "code-davinci-002") {
        const conversationQueue = new ConversationQueue(2000); // for code-davinci-002 model
        return conversationQueue
    } else if (model === "text-davinci-003") {
        const conversationQueue = new ConversationQueue(4000); // for text-davinci-003 model
        return conversationQueue
    } else if (model === "image-davinci-002") {
        const conversationQueue = new ConversationQueue(4000); // for image-davinci-003 model
        return conversationQueue
    } else {
        const conversationQueue = new ConversationQueue(4000); // for text-davinci-003 model
        return conversationQueue
    }
}

// create a conversation queue to store the context of the conversation
export class ConversationQueue {
    private queue: string[];
    private limit: number;

    constructor(limit: number) {
        this.queue = [];
        this.limit = limit;
    }
    // add a new item to the queue
    public push(text: string) {
        this.queue.unshift(text);
        if (this.queue.length > this.limit) {
            this.queue.pop();
        }
    }
    // get the context of the conversation
    public getContext(): string {
        return this.queue.join(' ');
    }


    // clear the conversation queue
    public clear() {
        this.queue = [];
    }

    // get the size of the conversation queue
    public size(): number {
        return this.queue.length;
    }
    // get the oldest item in the conversation queue
    public oldest(): string {
        return this.queue[this.queue.length - 1];
    }
}

//link to ui element to select the model
const choice = "code"

//select the model based on the ui element
const modelChoice = selectModel(choice)

function selectModel(choice: string) {
    switch(choice){
        case "code":
            return "code-davinci-002"
        case "text":
            return "text-davinci-003"
        case "image":
            return "image-davinci-002"
        default:
            return "text-davinci-003"
    }
}

// throw an error if the model is not defined
if (modelChoice === undefined) {
    throw new Error('Model is not defined');
}

// select the conversation queue based on the model
const conversationQueue = selectConversationQueue(modelChoice)

// throw an error if the conversation queue is not defined
if (conversationQueue === undefined) {
    throw new Error('Conversation Queue is not defined');
}

// export the model with conversation queue to the server
export const modelWithQueue = {
    prompt: conversationQueue.getContext(),
    engine: modelChoice
}
