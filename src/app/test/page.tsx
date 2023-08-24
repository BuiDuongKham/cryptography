"use client"
import {Ultis} from "../../../functions/ultis";
import {Vigenere} from "../../../functions/vigenere";
import {Vernam} from "../../../functions/vernam";
import {OneTimePad} from "../../../functions/onetimepad";
import {Des} from "../../../functions/des";

export default function Home() {
	// @ts-ignore
	const myDes = new Des('133457799BBCDFF1')
	const plainText = '0123456789ABCDEF'
	const cipherText = myDes.encrypt(plainText)
	console.log(cipherText)
	console.log(myDes.decrypt(cipherText))
	return(
		<></>
	)
}