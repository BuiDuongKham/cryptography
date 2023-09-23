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
import {useState} from "react";
import Base256 from 'base256-encoding'
import {RSAOctet} from "../../../functions/RSAOctet";
export default function Home() {
	console.log(RSAOctet.encrypt(BigInt('23'), BigInt("143"), "Hello", 2))
	console.log(RSAOctet.decrypt(BigInt('47'), BigInt('143'), '10630363667'))
	return (
		<>
		</>
	)
}