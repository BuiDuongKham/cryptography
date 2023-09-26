import {BigIntOperator} from "./BigIntOperator";
import {RSA} from "./RSA";
import {remove} from "next/dist/build/webpack/loaders/resolve-url-loader/lib/file-protocol";

export class RSAOctet{
	public static I2OSP = (x: bigint, xLen: number): string =>
	{
		let result = '';
		while (x > BigInt('0'))
		{
			const byte = Number(x % BigInt('256'));
			const hex = byte.toString(16).padStart(2, '0');
			result = hex + result;
			x = x / BigInt('256');
		}
		while (result.length < xLen)
		{
			result = '0' + result;
		}
		return result;
	}
	public static OS2IP = (x: string): bigint =>
	{
		let result = BigInt('0');
		while (x[0] === '0') {
			x = x.substring(1);
		}
		for (let i = 0; i <x.length ; ++i)
		{
			result = result * BigInt('16') + BigInt('0x' + x[i]);
		}
		return result;
	}
	public static encodeMessage = (message: string): string =>
	{
		let result = "";
		for (let i = 0; i < message.length; i++)
		{
			const char = message[i];
			const charCode = char.charCodeAt(0);
			const hex = charCode.toString(16).padStart(2, '0');
			result += hex;
		}
		return result;	
	}
	public static decodeMessage = (hex: string): string =>
	{
		let result = "";
		for (let i = 0; i < hex.length; i += 2)
		{
			const byte = hex.substring(i, i + 2);
			const charCode = parseInt(byte, 16);
			const char = String.fromCharCode(charCode);
			result += char;
		}
		return result;
	}
	
	public static encrypt = (e: bigint, n: bigint, message: string, numberOfChar: number): string =>
	{
		while (message.length % numberOfChar !== 0)
		{
			message += 'x';
		}
		// check n is valid
		if (n > BigIntOperator.exponentiation(BigInt('2'), BigInt(numberOfChar * 8 + 1))) throw new Error('n is too large');
		if (n < BigIntOperator.exponentiation(BigInt('2'), BigInt(numberOfChar * 8 ))) throw new Error('n is too small');
		
		// encode message
		const encodedMessage = RSAOctet.encodeMessage(message);
		
		let result = '';
		
		for ( let i = 0; i < encodedMessage.length; i += numberOfChar*2 )
		{
			const block = encodedMessage.substring(i, i + numberOfChar*2);
			const m = RSAOctet.OS2IP(block);
			const c = BigIntOperator.modPow(m, e, n);
			const cStr = RSAOctet.I2OSP(c, numberOfChar * 2 + 2);
			result += cStr;
		}
		return result;
	}
	
	public static decrypt = (d: bigint, n: bigint, encryptedMessage: string, numberOfChar: number): string =>
	{
		let result = '';
		for ( let i = 0; i < encryptedMessage.length; i += numberOfChar*2 + 2 )
		{
			const block = encryptedMessage.substring(i, i + numberOfChar*2 + 2);
			const c = RSAOctet.OS2IP(block);
			const m = BigIntOperator.modPow(c, d, n);
			const mStr = RSAOctet.I2OSP(m, numberOfChar * 2);
			result += mStr;
		}
		return RSAOctet.decodeMessage(result);
	}
}