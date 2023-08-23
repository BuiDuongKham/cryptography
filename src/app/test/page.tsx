"use client"
import {Ultis} from "../../../functions/ultis";
import {Vigenere} from "../../../functions/vigenere";
import {Vernam} from "../../../functions/vernam";
import {OneTimePad} from "../../../functions/onetimepad";
import {Des} from "../../../functions/des";

export default function Home() {
	const myDes: Des = new Des('0000111000110010100100100011001011101010011011010000110101110011')
	myDes.encrypt('Yourlipsaresmootherthanvaseline')
	return(
		<></>
	)
}