"use client"
import {Crypto} from "../../../functions/crypto";
import React, {useEffect} from "react";
import BoxComponent from "@/app/ceasar/BoxComponent";
import {useForm} from "react-hook-form";
import {RSA} from "../../../functions/RSA";
export default function AES() {
	// declaration
	const {register, watch, handleSubmit, formState: {errors}} = useForm()
	const [plainText, setPlainText] = React.useState<string>('')
	const [cipherText, setCipherText] = React.useState<string>('')
	const [mode, setMode] = React.useState('encrypt')
	const [key, setKey] = React.useState("");
	const [n, setN] = React.useState("");
	
	// logic
	
	useEffect(() => {
		if (mode === 'encrypt') {
			
		}
		else {
		}
	}, [watch('text'), key, mode])
	
	return (
		<main>
			<div className={'flex justify-center text-2xl font-bold'}> RSA </div>
			<div className={'flex justify-around'}>
				<BoxComponent title={ mode === 'encrypt' ? 'Plain Text' : 'Cipher Text' } isDisable={false} register={register}/>
				<div className={'flex flex-col justify-center'}>
					<div className={'flex justify-center text-2xl font-bold'}> Key </div>
					<div className={'flex justify-center gap-4'}>
						<textarea cols={20} rows={10} className={'border-2'} onChange={(e) => setKey(e.target.value)} placeholder={mode === 'encrypt' ? 'E' : 'D'} />
						<textarea cols={20} rows={10} className={'border-2'} onChange={(e) => setN(e.target.value)} placeholder={'N'} />
					</div>
					<div className={'flex justify-center mt-5'}>
						<button className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500'} onClick={() => setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt')}>
							{ mode === 'encrypt' ? 'Encrypt' : 'Decrypt' }
						</button>
					</div>
					<div className={'flex justify-center mt-5'}>
						<button className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500'} onClick={()=>{
							if (mode === 'encrypt') {
								setCipherText(RSA.encrypt(BigInt(key), BigInt(n), watch('text'), 2).toString())
							} else {
								// split cipher text separated by comma
								let cipherTexts = watch('text').split(',').map((item: string | number | bigint | boolean) => BigInt(item))
								setPlainText(RSA.decrypt(BigInt(key), BigInt(n), cipherTexts, 2))
							}
						}}>
							Start
						</button>
					</div>
					<div className={'flex justify-center mt-5'}>
						<a href={"gen-key"} className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500'} onClick={()=>{}}>
							Click here to generate key  	
						</a>
					</div>
				</div>
				<BoxComponent title={ mode === 'encrypt' ? 'Cipher Text' : 'Plain Text' } isDisable={true} value={ mode === 'encrypt' ? cipherText : plainText } register={register}/>
			</div>
		</main>
	)
}