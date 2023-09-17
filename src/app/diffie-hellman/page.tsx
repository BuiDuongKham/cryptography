"use client"
import {Crypto} from "../../../functions/crypto";
import React, {useEffect} from "react";
import BoxComponent from "@/app/ceasar/BoxComponent";
import {useForm} from "react-hook-form";
import {BigIntOperator} from "../../../functions/BigIntOperator";
import type {DiffieHellmanPackage} from "../../../functions/DiffieHellman";
import {DiffieHellman} from "../../../functions/DiffieHellman";
export default function CeasarPage() {
	// declaration
	const {register, watch, handleSubmit, formState: {errors}} = useForm()
	const [p, setP] = React.useState("")
	const [pCheck, setPCheck] = React.useState(true)
	const [alpha, setAlpha] = React.useState("")
	const [alphaCheck, setAlphaCheck] = React.useState(true)
	const [aPrivate, setAPrivate] = React.useState("")
	const [bPrivate, setBPrivate] = React.useState("")
	const [aPublic, setAPublic] = React.useState("")
	const [bPublic, setBPublic] = React.useState("")
	const [exchangeKey, setExchangeKey] = React.useState("")	
	const [isStart, setIsStart] = React.useState(false)
	
	const isContainOnlyDigit = (s: string) => {
		for (let i = 0; i < s.length; i++){
			if (s[i] < '0' || s[i] > '9') return false;
		}
		return true;
	}
	
	return (
		<main>
			<div className={'flex justify-center text-2xl font-bold'}> Diffie - Hellman Key Exchange </div>
			<div className={'flex justify-around'}>
				<div className={'flex flex-col justify-center p-4 m-10 border-2'}>
					<div className={'flex justify-center text-2xl font-bold'}>Side A</div>
					<div className={'flex justify-center'}>
						<textarea cols={10} rows={10} placeholder={"A's private key"} className={'w-60 h-52 border-2'} onChange={e => {setAPrivate(e.target.value)}} />
					</div>
					{ (!isContainOnlyDigit(aPrivate) || BigInt(aPrivate) > BigInt(p)) && <div className={'text-red-700'}> Invalid A's private key</div> }
				</div>
				<div className={'flex flex-col justify-center'}>
					<div className={'flex justify-center text-2xl font-bold'}> Key </div>
					<div className={'flex justify-center gap-4'}>
						<div>
							<textarea cols={10} rows={10} placeholder={"Prime Number P"} className={'w-60 h-52 border-2'} onChange={ e => {setP(e.target.value)}} />
							{ (p === "" || !isContainOnlyDigit(p) || !BigIntOperator.millerRabinTest(BigInt(p), 5)) && <div className={'text-red-700'}> Invalid P</div>  }
						</div>
						<div>
							<textarea cols={10} rows={10} placeholder={"Primitive Root of P"} className={'w-60 h-52 border-2'} onChange={e=> {setAlpha(e.target.value)}} />
							{ (alpha === "" || p === ""  || !isContainOnlyDigit(alpha) || !isContainOnlyDigit(p) || !BigIntOperator.isPrimitiveRootOfPrimeNumber(BigInt(p), BigInt(alpha))) && <div className={'text-red-700'}> Invalid Alpha</div>}
						</div>
					</div>
					<div className={'flex justify-center'}>
						<button className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500'} 
						        onClick={()=>{
											if (aPrivate === "" || p === "" || alpha === "" || !isContainOnlyDigit(aPrivate) || !alphaCheck || !pCheck || !isContainOnlyDigit(bPrivate)) return;
											const diffieHellmanPackage :DiffieHellmanPackage = DiffieHellman.generateKey(BigInt(p), BigInt(alpha), BigInt(aPrivate), BigInt(bPrivate));
											setAPublic(diffieHellmanPackage.ya.toString());
											setBPublic(diffieHellmanPackage.yb.toString());
											setExchangeKey(diffieHellmanPackage.keyExchange.toString());
											setIsStart(true);
						        }}>
							Generate Key
						</button>
					</div>
					<div className={'flex justify-center items-center'}>
						{
							isStart &&
							(
								<div className={'flex flex-col justify-center'}>
									<div>
										A's Public Key: {aPublic}
									</div>
									<div>
										B's Public Key: {bPublic}
									</div>
									<div>
										Exchanged Key: {exchangeKey}
									</div>
								</div>
							)
						}	
					</div>
				</div>
				<div className={'flex flex-col justify-center p-4 m-10 border-2'}>
					<div className={'flex justify-center text-2xl font-bold'}>Side B</div>
					<div className={'flex justify-center'}>
						<textarea cols={10} rows={10} placeholder={"B's private key"} className={'w-60 h-52 border-2'} onChange={e => {setBPrivate(e.target.value)}} />
					</div>
					{ (!isContainOnlyDigit(bPrivate) && BigInt(bPrivate) > BigInt(p)) && <div className={'text-red-700'}> Invalid B's private key</div> }
				</div>
			</div>
		</main>
	)
}