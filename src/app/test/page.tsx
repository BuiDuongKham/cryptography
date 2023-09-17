"use client"
import {Ultis} from "../../../functions/ultis";
import {Vigenere} from "../../../functions/vigenere";
import {Vernam} from "../../../functions/vernam";
import {OneTimePad} from "../../../functions/onetimepad";
import {Des} from "../../../functions/des";
import {Aes} from "../../../functions/aes";
import {Crypto} from "../../../functions/crypto";
import {BigIntOperator} from "../../../functions/BigIntOperator";
import {RSA} from "../../../functions/RSA";
import {ElGamma} from "../../../functions/ElGamma";

export default function Home() {
	// console.log(ElGamma.generateKey(BigInt('19'), BigInt('10'), BigInt('5')))
	console.log(ElGamma.encrypt(BigInt('17'), BigInt('6'), {q: BigInt('19'), alpha: BigInt('10'), y: BigInt('5')}));
	// console.log(ElGamma.decrypt( {c1: BigInt('11'), c2: BigInt(5)}, {q: BigInt('19'), alpha: BigInt('10'), y: BigInt('5')}, BigInt('5')))
	return (
		<></>
	)
}