"use client"
import {Ultis} from "../../../functions/ultis";
import {Vigenere} from "../../../functions/vigenere";
import {Vernam} from "../../../functions/vernam";
import {OneTimePad} from "../../../functions/onetimepad";
import {Des} from "../../../functions/des";
import {Aes} from "../../../functions/aes";

export default function Home() {
	const myAES = new Aes('0f1571c947d9e8590cb7add6af7f6798');
	console.log(myAES.decrypt('ff0b844a0853bf7c6934ab4364148fb9'))
	// b1f334b26fdbf79ae06796fbc9468607
	// b1f334b26fdbf79ae06796fbc9468607
	return (
		<></>
	)
}