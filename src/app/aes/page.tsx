"use client"
import React, {useEffect} from "react";
import BoxComponent from "@/app/ceasar/BoxComponent";
import {useForm} from "react-hook-form";
import {Aes} from "../../../functions/aes";

export default function AESPage() {
	// declaration
	const {register, watch, handleSubmit, formState: {errors}} = useForm()
	const [key, setKey] = React.useState('')
	const [plainText, setPlainText] = React.useState<string>('')
	const [cipherText, setCipherText] = React.useState<string>('')
	const [mode, setMode] = React.useState('encrypt')
	
	const processing = () => {
		if (key.length !== 32 && key.length !== 48 && key.length !== 64) {
			alert('Key must be 32, 48 or 64 hexadecimal digits')
			return
		}
		const myAes : Aes = new Aes(key)
		if (mode === 'encrypt') {
			setCipherText(
				myAes.encrypt(watch('text'))
			)
		} else {
			setPlainText(
				myAes.decrypt(watch('text'))
			)
		}
	}
	
	return (
		<main>
			<div className={'flex justify-center text-2xl font-bold'}> AES </div>
			<div className={'flex justify-around'}>
				<BoxComponent title={ mode === 'encrypt' ? 'Plain Text' : 'Cipher Text' } isDisable={false} register={register}/>
				<div className={'flex flex-col justify-center'}>
					<div className={'flex justify-center text-2xl font-bold'}> Key </div>
					<div className={'flex justify-center mb-4'}>
						<input className={'border-2'} placeholder={'32, 48, 64 hexadecimal digits'} type={'text'} value={key} onChange={(e) => setKey(e.target.value)} />
					</div>
					<div className={'flex flex-col justify-center'}>
						<button className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500'} onClick={() => setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt')}>
							{ mode === 'encrypt' ? 'Encrypt' : 'Decrypt' }
						</button>
						<button className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500 mt-4'} onClick={()=>{processing()}}>
							OK
						</button>
					</div>
				</div>
				<BoxComponent title={ mode === 'encrypt' ? 'Cipher Text' : 'Plain Text' } isDisable={true} value={ mode === 'encrypt' ? cipherText : plainText } register={register}/>
			</div>
		</main>
	)
}