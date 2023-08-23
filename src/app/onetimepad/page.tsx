"use client"
import {useForm} from "react-hook-form";
import React, {useEffect} from "react";
import BoxComponent from "@/app/ceasar/BoxComponent";
import {OneTimePad} from "../../../functions/onetimepad";

export default function () {
	// declaration
	const {register, watch, handleSubmit, formState: {errors}} = useForm()
	const [key, setKey] = React.useState('key')
	const [plainText, setPlainText] = React.useState<string>('')
	const [cipherText, setCipherText] = React.useState<string>('')
	const [mode, setMode] = React.useState('encrypt')

	// logic

	useEffect(() => {
		if (mode === 'encrypt') {
			const [cipher, key] = OneTimePad.encrypt(watch('text'))
			setCipherText(cipher)
			setKey(key)
		} else {
			const text: string = watch('text')
			setPlainText(OneTimePad.decrypt(text, key))
		}
	}, [watch('text'), mode])

	return (
		<main>
			<div className={'flex justify-center text-2xl font-bold'}>One Time Pad</div>
			<div className={'flex items-center justify-around'}>
				{mode === 'encrypt' ?
					<BoxComponent title={'Plain Text'} isDisable={false} register={register}/> :
					<div className={'flex flex-col justify-center'}>
						<div className={'flex justify-center'}>
							<label htmlFor={'key'} className={'flex justify-center text-2xl font-bold'}>Key</label>
							<input type={'text'} value={key} id={'key'} className={'w-60 h-10 border-2'} onChange={(e) => setKey(e.target.value)}/>
						</div>
						<BoxComponent title={"Cipher Text"} isDisable={false} register={register}/>
					</div>
				}
				<div className={'flex flex-col justify-center'}>
					<div className={'flex justify-center'}>
						<button
							className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500'}
							onClick={() => setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt')}>
							{mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
						</button>
					</div>
				</div>
				{
					mode === 'encrypt' ?
						<div className={'flex flex-col justify-center'}>
							<div className={'flex justify-center'}>
								<label htmlFor={'key'} className={'flex justify-center text-2xl font-bold'}>Key</label>
								<input type={'text'} value={key} id={'key'} className={'w-60 h-10 border-2'} onChange={(e) => setKey(e.target.value)}/>
							</div>
							<BoxComponent title={"Cipher Text"} isDisable={true} register={register} value={cipherText}/>
						</div> :
						<BoxComponent value={plainText} title={'Plain Text'} isDisable={true} register={register}/>
				}
			</div>
		</main>
	)
}