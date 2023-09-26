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
	// 1003 1005973
	// 86083 1005973
	
	// 1510021 25566421 
	// 8522317 25566421
	console.log(RSAOctet.encrypt(BigInt('1510021'), BigInt('25566421'), "Hello kham", 3));
	// encrypted : 0e6b79a1faebb52693017a8b79016869db81ade8b526931a0a5d
	console.log(RSAOctet.decrypt(BigInt('8522317'), BigInt('25566421'), "014e4d6f01643e4000f6e08700a379f6", 3));
	return (
		<>
		</>
	)
}