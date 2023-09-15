"use client"
import {Ultis} from "../../../functions/ultis";
import {Vigenere} from "../../../functions/vigenere";
import {Vernam} from "../../../functions/vernam";
import {OneTimePad} from "../../../functions/onetimepad";
import {Des} from "../../../functions/des";
import {Aes} from "../../../functions/aes";
import {Crypto} from "../../../functions/crypto";
import {BigIntOperator} from "../../../functions/BigIntOperator";

export default function Home() {
	// console.log(BigNumber.divide("10020121234567890123456789023456789", "70002345678923456789"))
	console.log(BigIntOperator.littleFermat(1000000000000000000000000000000000000000000000000000000000000000000000000000000084878086452295590311n, 3));
	return (
		<></>
	)
}