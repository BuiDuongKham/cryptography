"use client"
import {Crypto} from "../../../functions/crypto";
import React, {useEffect, useState} from "react";
import BoxComponent from "@/app/ceasar/BoxComponent";
import {useForm} from "react-hook-form";
import {DecryptedMessage, ElGamma, ElGammaKeyPackage, EncryptedMessage} from "../../../functions/ElGamma";
import {BigIntOperator} from "../../../functions/BigIntOperator";
export default function CeasarPage() {
	// declaration
	const {register, watch, handleSubmit, formState: {errors}} = useForm()
	const [plainText, setPlainText] = React.useState<string>('')
	const [cipherText, setCipherText] = React.useState<string>('')
	const [mode, setMode] = React.useState('encrypt')
	const [q, setQ] = React.useState('')
	const [alpha, setAlpha] = React.useState('')
	const [key, setKey] = React.useState('')
	const [encryptedKey, setEncryptedKey] = React.useState<EncryptedMessage|undefined>()	
	const [isStart, setIsStart] = React.useState(false)
	const [c1, setC1] = React.useState('')
	const [c2, setC2] = React.useState('')
	const [oneTimeKey, setOneTimeKey] = useState('')
	const [decryptedMessage, setDecryptedMessage] = useState<DecryptedMessage|undefined>(undefined)
	const [k, setK] = useState('')
	
	return (
		<main>
			<div className={'flex justify-center text-2xl font-bold'}> EL Gamma </div>
			<div className={'flex justify-around'}>
				<div>
					{
						mode === 'encrypt' ?
							(
								<div>
									<div className={'flex justify-center text-2xl font-bold'}> Message </div>
									<textarea className={'border-2'} cols={20} rows={10} placeholder={'Message'} onChange={ e => {setPlainText(e.target.value)}}/>
								</div>
							) :
							(
								<div>
									<div>
										<div className={'flex justify-center text-2xl font-bold'}> Encrypted Message </div>
									</div>
									<div className={'mt-5'}>
										<input id={'c1'} className={'border-2'} type={'text'} placeholder={'C1'} onChange={e => setC1(e.target.value)}/>	
									</div>
									<div className={'mt-5'}>
										<input id={'c2'} className={'border-2'} type={'text'} placeholder={'C2'} onChange={e => setC2(e.target.value)}/>	
									</div>
								</div>
							)
					}
					
				</div>
				<div className={'flex flex-col justify-center'}>
					<div className={'flex justify-center text-2xl font-bold'}> Key </div>
					<div className={'flex flex-col justify-center gap-4'}>
						<input className={'border-2'} type={'text'} placeholder={'Q'} onChange={e => {setQ(e.target.value)}}/>
						<input className={'border-2'} type={'text'} placeholder={'Alpha'} onChange={e => {setAlpha(e.target.value)}}/>
						<input className={'border-2'} type={'text'} placeholder={mode === 'encrypt'? 'Y': 'X'} onChange={e => {setKey(e.target.value)}}/>
						{
							mode === 'encrypt' &&
							(
								<input className={'border-2'} type={"text"} placeholder={'K'} onChange={e => setK(e.target.value)}/> 
							)
						}
					</div>
					<div className={'flex justify-center mt-5'}>
						<button className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500'} onClick={() => setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt')}>
							{ mode === 'encrypt' ? 'Encrypt' : 'Decrypt' }
						</button>
					</div>
					<div className={'flex justify-center mt-5'}>
						<button className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500'} onClick={() => {
							if (mode === 'encrypt') {
								if (!BigIntOperator.isContainOnlyDigit(plainText)) return
								const encryptedKeyPackage: EncryptedMessage = ElGamma.encrypt(BigInt(plainText), BigInt(k), {q: BigInt(q), alpha: BigInt(alpha), y: BigInt(key)})
								setEncryptedKey(encryptedKeyPackage)
							}
							else {
								if (!BigIntOperator.isContainOnlyDigit(c1) || !BigIntOperator.isContainOnlyDigit(c2)) return
								// console.log({c1: BigInt(c1), c2: BigInt(c2)}, {y: BigInt(key), q: BigInt(q), alpha: BigInt(alpha)}, BigInt(key))
								const decryptedMessage = ElGamma.decrypt({c1: BigInt(c1), c2: BigInt(c2)}, {y: BigInt(key), q: BigInt(q), alpha: BigInt(alpha)}, BigInt(key))
								setDecryptedMessage(decryptedMessage)
							}
						}}>
							OK
						</button>
					</div>
					<div className={'mt-5'}>
						<a href={'el-gamma-gen-key'} className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500'} onClick={() => {}}>
							Click here to go to El-Gamma Gen Key
						</a>
					</div>
				</div>
				<div>
					{
						mode === 'encrypt' ?
							(
								<div>
									<div className={'flex justify-center text-2xl font-bold'}> Encrypted Keys </div>
									<div>
										C1: { encryptedKey ? encryptedKey.c1.toString() : '' }
									</div>
									<div>
										C2: { encryptedKey ? encryptedKey.c2.toString() : '' }
									</div>	
								</div>
							):
							(
								<>
									<div className={'flex justify-center text-2xl font-bold'}> Decrypted Message </div>
									<div>
										 Decrypted Message: { decryptedMessage?.message.toString() }
									</div>
									<div>
										One Time Key: { decryptedMessage?.oneTimeK.toString() }
									</div>
								</>
							)
								
					}
					
				</div>
			</div>
		</main>
	)
}