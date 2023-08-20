"use client"
import {Crypto} from "../../../functions/crypto";
import React, {useEffect} from "react";
import BoxComponent from "@/app/ceasar/BoxComponent";
import {useForm} from "react-hook-form";
export default function CeasarPage() {
	// declaration
	const {register, watch, handleSubmit, formState: {errors}} = useForm()
	const myCrypto = new Crypto()
	const [key, setKey] = React.useState(0)
	const [plainText, setPlainText] = React.useState<string>('')
	const [cipherText, setCipherText] = React.useState<string>('')
	const [mode, setMode] = React.useState('decrypt')

	// logic

	useEffect(() => {
		if (mode === 'encrypt') {
			myCrypto.plain = watch('text')
			myCrypto.key = key
			myCrypto.ceasarEncrypt()
			setCipherText(myCrypto.cipher)
			console.log(myCrypto)
		}
		else {
			myCrypto.cipher = watch('text')
			myCrypto.key = key
			myCrypto.ceasarDecrypt()
			setPlainText(myCrypto.plain)
			console.log(myCrypto)
		}
	}, [watch('text'), key, mode])

	return (
		<main>
			<div className={'flex justify-center text-2xl font-bold'}> Ceasar </div>
			<div className={'flex justify-around'}>
				<BoxComponent title={ mode === 'encrypt' ? 'Plain Text' : 'Cipher Text' } isDisable={false} register={register}/>
				<div className={'flex flex-col justify-center'}>
					<div className={'flex justify-center text-2xl font-bold'}> Key </div>
					<div className={'flex justify-center'}>
						<input type={'number'} value={key} onChange={(e) => setKey(parseInt(e.target.value)%26)} />
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