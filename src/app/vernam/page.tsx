"use client"
import {useForm} from "react-hook-form";
import {Crypto} from "../../../functions/crypto";
import React, {useEffect} from "react";
import BoxComponent from "@/app/ceasar/BoxComponent";
import {Vernam} from "../../../functions/vernam";

export default function Home() {
	const {register, watch, handleSubmit, formState: {errors}} = useForm()
	const [key, setKey] = React.useState('key')
	const [plainText, setPlainText] = React.useState<string>('')
	const [cipherText, setCipherText] = React.useState<string>('')
	const [mode, setMode] = React.useState('encrypt')

	// logic

	useEffect(() => {
		if (mode === 'encrypt') {
			setCipherText(Vernam.encrypt(watch('text'), key))
		}
		else {
			setPlainText(Vernam.decrypt(watch('text'), key))
		}
	}, [watch('text'), key, mode])

	return (
		<main>
			<div className={'flex justify-center text-2xl font-bold'}> Vernam </div>
			<div className={'flex justify-around'}>
				<BoxComponent title={ mode === 'encrypt' ? 'Plain Text' : 'Cipher Text' } isDisable={false} register={register}/>
				<div className={'flex flex-col justify-center'}>
					<div className={'flex justify-center text-2xl font-bold'}> Key </div>
					<div className={'flex justify-center'}>
						<input type={'text'} value={key} onChange={(e) => setKey(e.target.value)} />
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