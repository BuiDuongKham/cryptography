import {BigIntOperator} from "./BigIntOperator";
import {checkIsNodeDebugging} from "next/dist/server/lib/is-node-debugging";

export class RSAOctet{
	public static encrypt(e: bigint, n: bigint, message: string, sizeOfChunk: number){
		// padding till mess length divide to chunk-digit without any remain
		while (message.length*2 % sizeOfChunk !== 0)
		{
			message = message + 'x';
		}
		
		let result = '';
		for (let i = 0; i < message.length; i += sizeOfChunk/2)
		{
			const chunk = message.substring(i, i + sizeOfChunk/2);
      let chunkOctet = RSAOctet.convertStringToOctet(chunk);      
      let chunkNum = RSAOctet.convertOctetToNumber(chunkOctet);
			const encryptedChunk = BigIntOperator.modPow(chunkNum, e, n);
			result.push(encryptedChunk);
		}
		return result;
	}
	
	public static decrypt(d: bigint, n: bigint, encryptedMessage: string, sizeOfChunk: number) {
		let result = "";
		for (let i = 0; i < encryptedMessage.length; i+= sizeOfChunk/2)
		{
			const encryptedChunk = encryptedMessage.substring(i, i + sizeOfChunk/2);
			const encryptedChunkNum = RSAOctet.convertOctetToDigits(encryptedChunk);
			let decryptedChunk = BigIntOperator.modPow(BigInt(encryptedChunkNum.toString()), d, n);
			result += parseInt(RSAOctet.convertDigitsToString(decryptedChunk);	
		}
		return result;
	}
	
	public static convertStringToOctet(chunk: string) {
		return BigIntOperator.S2OS(chunk);
	}
	
	public static convertOctetToNumber(chunk: string) {
		return BigIntOperator.OS2IP(chunk);
	}
	
	public static convertOctetToDigits(chunk: string)
	{
		if (chunk.length % 2 !== 0) throw new Error("Octet length must be even");
		let result = "";
		for (let i = 0; i < chunk.length; i+=2)
		{
			const byte = chunk.substring(i, i+2);
			result += String.fromCharCode(parseInt(byte, 16));
		}
		return result;
	}
	
	
	public static convertDigitsToString(encryptedChunk: BigInt) {
		return String.fromCharCode(Number(encryptedChunk));
	}
}