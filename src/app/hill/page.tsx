"use client"
import {Crypto} from "../../../functions/crypto";
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import BoxComponent from "@/app/ceasar/BoxComponent";
import {text} from "stream/consumers";
export default function Hill(){
	// declaration
	const {register, watch, handleSubmit, formState: {errors}} = useForm()
	const [size, setSize] = useState(2)
	const myCrypto = new Crypto()
	const [key, setKey] = React.useState<any>([[0,1],[2,3]])
	const [plainText, setPlainText] = React.useState<string>('')
	const [cipherText, setCipherText] = React.useState<string>('')
	const [mode, setMode] = React.useState('encrypt')

	// logic

	useEffect(() => {
		if (watch('text') === '') return
		if (mode === 'encrypt') {
			myCrypto.plain = watch('text')
			myCrypto.key = key
			myCrypto.hillEncrypt(key)
			setCipherText(myCrypto.cipher)
		}
		else {
			myCrypto.cipher = watch('text')
			myCrypto.key = key
			myCrypto.hillDecrypt(key)
			setPlainText(myCrypto.plain)
		}
	}, [watch('text'), mode, key])
	useEffect(() => {
		let array = [...Array(size)].map((_, i) => [...Array(size)].map((_, j) => i*size+j))
		setKey(array)
	}, [size]);
	return (
		<main>
			<div className={'flex justify-center text-2xl font-bold'}> Hill </div>
			<div className={'flex justify-around'}>
				<BoxComponent title={ mode === 'encrypt' ? 'Plain Text' : 'Cipher Text' } isDisable={false} register={register}/>
				<div className={'flex flex-col justify-center'}>
					<div className={'flex justify-center text-2xl font-bold'}> Size of Key Matrix </div>
					<div className={'flex flex-col items-center justify-center gap-4 mb-8'}>
						<input className={'w-20 border-2'} type={'number'} value={size} onChange={(e) => setSize(parseInt(e.target.value))} />
						<div>{
							[...Array(size)].map((_, i) =>
								{
									return (
										<div className={'flex justify-center'} key={i}>
											{
												[...Array(size)].map( (_,j) => {
													console.log(i*size+j)
													return (
														<input key={j} className={'w-10 border-2'} onChange={ (event) => {let temp = [...key]; temp[i][j] = parseInt(event.target.value); setKey(temp); console.log(key)}}/>
													)
												})
											}
										</div>
									)
								}
								)
						}</div>
					</div>
					<div className={'flex justify-center'}>
						<button className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500'} onClick={() => setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt')}>
							{ mode === 'encrypt' ? 'Encrypt' : 'Decrypt' }
						</button>
					</div>
				</div>
				<BoxComponent title={ mode === 'encrypt' ? 'Cipher Text' : 'Plain Text' } isDisable={true} value={ mode === 'encrypt' ? cipherText : plainText } register={register}/>
			</div>
		</main>
	)
}