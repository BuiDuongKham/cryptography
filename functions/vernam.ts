export class Vernam{
	public static encrypt(message: string, key: string): string{
		// preprocess message
		let processedMessage = message;
		processedMessage= processedMessage.replace(/ /g, '');
		processedMessage= processedMessage.toLowerCase();
		// preprocess key
		let processedKey = key;
		processedKey= processedKey.replace(/ /g, '');
		processedKey= processedKey.toLowerCase();
		// widen key
		let widenedKey = processedKey;
		while(widenedKey.length < processedMessage.length){
			widenedKey += processedKey;
		}
		// encrypt here
		let encryptedMessage = '';
		for(let i = 0; i < processedMessage.length; i++){
			let messageCharCode = processedMessage.charCodeAt(i);
			let keyCharCode = widenedKey.charCodeAt(i);
			let encryptedCharCode = messageCharCode ^ keyCharCode;
			// convert char code to 8 bit binary
			encryptedMessage += encryptedCharCode.toString(2).padStart(8, '0');
		}
		return encryptedMessage;
	}
	public static decrypt(message: string, key: string): string{
		// preprocess key
		let processedKey = key;
		processedKey= processedKey.replace(/ /g, '');
		processedKey= processedKey.toLowerCase();

		let widenKeyLength: number = message.length / 8;

		while (processedKey.length < widenKeyLength){
			processedKey += processedKey;
		}

		// split message into 8 bit chunks
		let messageChunks: string[] = [];
		for(let i = 0; i < message.length; i += 8){
			messageChunks.push(message.substring(i, i + 8));
		}
		// decrypt here
		let decryptedMessage = '';
		for(let i = 0; i < messageChunks.length; i++){
			let messageCharCode = parseInt(messageChunks[i], 2);
			let keyCharCode = processedKey.charCodeAt(i);
			let decryptedCharCode = messageCharCode ^ keyCharCode;
			decryptedMessage += String.fromCharCode(decryptedCharCode);
		}
		return decryptedMessage;
	}
}