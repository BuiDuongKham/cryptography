"use client"
import {Ultis} from "../../../functions/ultis";
import {Vigenere} from "../../../functions/vigenere";
import {Vernam} from "../../../functions/vernam";
import {OneTimePad} from "../../../functions/onetimepad";
import {Des} from "../../../functions/des";
import {Aes} from "../../../functions/aes";
import {Crypto} from "../../../functions/crypto";

export default function Home() {
	const myPlayfair : Crypto = new Crypto();
	myPlayfair.plain = "Communicate"
	myPlayfair.playfairEncrypt("computer")
	console.log(myPlayfair.cipher)
	return (
		<></>
	)
}