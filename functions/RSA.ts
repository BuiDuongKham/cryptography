import {BigIntOperator} from "./BigIntOperator";

export class RSA{
	public static  ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
	public static encrypt(e: bigint, n: bigint, message: string, sizeOfChunk: number){
		// debugger;
		
		// remove all non-alphabet characters
		// message = message.replace(/[^a-zA-Z0-9]/g, '');
		
		// padding till mess length divide to chunk-digit without any remain
		while (message.length % sizeOfChunk !== 0)
		{
			message = message + 'x';	
		}
		
		let result = [];
		for (let i = 0; i < message.length; i += sizeOfChunk)
		{
			const chunk = message.substring(i, i + sizeOfChunk);
			const chunkNum = RSA.convertStringToNumber(chunk);
			const encryptedChunk = BigIntOperator.modPow(chunkNum, e, n);
			result.push(encryptedChunk);
		}
		return result;	
	}
	
	public static decrypt(d: bigint, n: bigint, encryptedMessage: bigint[], sizeOfChunk: number) {
		
		let result = "";
		for (let i = 0; i < encryptedMessage.length; i++)
		{
			const encryptedChunk = encryptedMessage[i];
			let decryptedChunk = BigIntOperator.modPow(encryptedChunk, d, n);
			const decryptedChunkString = RSA.convertNumberToString(decryptedChunk, sizeOfChunk);
			result += decryptedChunkString;
		}
		return result;
	}
	
	private static convertStringToNumber(chunk: string) {
		let stringResult = ""
		for (let i = 0; i< chunk.length; i++)
		{
			const index = RSA.ALPHABET.indexOf(chunk[i]);
			stringResult += index.toString(10).padStart(2, '0');
		}
		return BigInt(stringResult);
	}
	
	private static convertNumberToString(encryptedChunk: bigint, sizeOfChunk: number) {
		let stringResult = "";
		const encryptedChunkString = encryptedChunk.toString(10).padStart(sizeOfChunk * 2, '0');
		for (let i = 0; i < encryptedChunkString.length; i += 2)
		{
			const index = parseInt(encryptedChunkString.substring(i, i + 2));
			stringResult += RSA.ALPHABET[index];
		}
		return stringResult;
	}
}