import {Vigenere} from "./vigenere";
import {AtRule} from "csstype";
import Viewport = AtRule.Viewport;
export class OneTimePad{
	public static generateRandomKey(message: string): string {
		const alphabet: string = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"
		let result: string = ""
		for (let i= 0; i<message.length; ++i)
		{
			result += alphabet.charAt(Math.trunc(Math.random() * message.length))
		}
		return result
	}

	public static encrypt(message: string): string[] {
		let key: string = this.generateRandomKey(message)
		const myVigenere: Vigenere = new Vigenere(key)
		return [myVigenere.encrypt(message), key]
	}

	public static decrypt(cipherText: string, key: string): string{
		const myVigenere: Vigenere = new Vigenere(key)
		return myVigenere.decrypt(cipherText)
	}
}