"use client"
import {Crypto} from "../../../functions/crypto";
import BoxComponent from "@/app/ceasar/BoxComponent";
import {useForm} from "react-hook-form";
import React, {useEffect} from "react";
export default function Playfair() {
	const {register, watch, handleSubmit, formState: {errors}} = useForm()
	const myCrypto = new Crypto()
	const [key, setKey] = React.useState('')
	const [plainText, setPlainText] = React.useState<string>('')
	const [playfairTable, setPlayfairTable] = React.useState<any[][] | undefined>(undefined)
	const [cipherText, setCipherText] = React.useState<string>('')
	const [mode, setMode] = React.useState('encrypt')
	// logic

	useEffect(() => {
		if (mode === 'encrypt') {
			myCrypto.plain = watch('text')
			myCrypto.key = key
			myCrypto.playfairEncrypt(myCrypto.key)
			setPlayfairTable(myCrypto.playfairTable)
			setCipherText(myCrypto.cipher)
			console.log(myCrypto)
		}
		else {
			myCrypto.cipher = watch('text')
			myCrypto.key = key
			myCrypto.playfairDecrypt(myCrypto.key)
			setPlayfairTable(myCrypto.playfairTable)
			setPlainText(myCrypto.plain)
			console.log(myCrypto)
		}
	}, [watch('text'), key, mode])

	return (
		<main>
			<div className={'flex justify-center text-2xl font-bold'}> Playfair </div>
			<div className={'flex justify-around'}>
				<BoxComponent title={ mode === 'encrypt' ? 'Plain Text' : 'Cipher Text' } isDisable={false} register={register}/>
				<div className={'flex flex-col justify-center'}>
					<div className={'flex justify-center text-2xl font-bold'}> Keyword </div>
					<div className={'flex flex-col justify-center mb-4'}>
							<input className={'border-2 m-2'} type={'text'} value={key} onChange={(e) => setKey(e.target.value)} />
							{playfairTable !== undefined &&
							<table className={'border-2 border-collapse'}>
								{ playfairTable.map( row =>
									(
									<tr className={'border-2 border-collapse'}>
										{
											row.map( cell => (<td className={'border-2 border-collapse p-2 uppercase'}>{cell}</td>) )
										}
									</tr>
									))
								}
							</table>}
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