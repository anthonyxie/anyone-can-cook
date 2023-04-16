import ENV from '../config.env';

export async function sendMessage( userId ){

    if(!userId) throw new Error("Invalid arguments");

    console.log("uhhhhh going?");

    const { success, data } = await (await fetch(`${ENV.BASE_URL}/chatgpt/message`, {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({ userId : userId })        
    })).json();

    if(!success) throw new Error('Error sending message');
    return { success , data };
}

export async function sendTextMessage(message, number) {
    if (!message) throw new Error("Invalid args");
    console.log("sending tm");
    const { success, data } = await (await fetch(`${ENV.BASE_URL}/twilio/messageHandling`, {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({ message : message, number : number })        
    })).json();
    if(!success) throw new Error('Error sending message');
    return { success , data };
}

export async function getMessages(userId) {
    if(!userId) throw new Error("Invalid arguments");

    const { success, data } = await (await fetch(`${ENV.BASE_URL}/messages/${userId}`, {
        method : 'GET',
        headers : {
            'Content-Type': 'application/json'
        },
        //body : JSON.stringify({ userId : userId })        
    })).json();

    if(!success) throw new Error('Error sending message');
    return data;
}

export async function addNewMessage(userId, message) {
    if(!userId || !message) throw new Error("Invalid arguments");
    console.log(userId, message)

    const { success, data } = await (await fetch(`${ENV.BASE_URL}/messages`, {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({ userId : userId, message: message })        
    })).json();

    if(!success) throw new Error('Error sending message');
    return { success , data };
}

export async function createUser() {
    const { success, data } = await (await fetch(`${ENV.BASE_URL}/user`, {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },       
    })).json();   
    if(!success) throw new Error('Error creating new user');
    return { success , data };
    
}