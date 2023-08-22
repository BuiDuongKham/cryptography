"use client"
import {Vigenere} from "../../../functions/vigenere";
import React, {useEffect, useMemo} from "react";
import BoxComponent from "@/app/ceasar/BoxComponent";
import {useForm} from "react-hook-form";
import {ViewPortKeys} from "next/dist/lib/metadata/constants";
export default function Home() {
	// declaration
	const {register, watch, handleSubmit, formState: {errors}} = useForm()
	const [key, setKey] = React.useState('key')
	const [plainText, setPlainText] = React.useState<string>('')
	const [cipherText, setCipherText] = React.useState<string>('')
	const [mode, setMode] = React.useState('encrypt')

	// logic

	useEffect(() => {
		if (mode === 'encrypt') {
			let myVigenere: Vigenere = new Vigenere(key)
			setCipherText(myVigenere.encrypt(watch('text')))
		}
		else {
			let myVigenere: Vigenere = new Vigenere(key)
			setPlainText(myVigenere.decrypt(watch('text')))
		}
	}, [watch('text'), key, mode])

	return (
		<main>
			<div className={'flex justify-center text-2xl font-bold'}> Vigenere </div>
			<div className={'flex justify-around'}>
				<BoxComponent title={ mode === 'encrypt' ? 'Plain Text' : 'Cipher Text' } isDisable={false} register={register}/>
				<div className={'flex flex-col justify-center'}>
					<div className={'flex justify-center text-2xl font-bold'}> Key </div>
					<div className={'flex justify-center'}>
						<input className={'border-2 '} type={'text'} value={key} onChange={(e) => setKey(e.target.value)} />
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