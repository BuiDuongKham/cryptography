'use client'
import {useEffect, useState} from "react";
import {BigIntOperator} from "../../../functions/BigIntOperator";
import {ElGamma} from "../../../functions/ElGamma";
import {ElGammaKeyPackage} from "../../../functions/ElGamma";

export default function Home() {
	
	const [q, setQ] = useState("");
	const [alpha, setAlpha] = useState("");
	const [isQPrime, setIsQPrime] = useState(true)
	const [isAlphaValid, setIsAlphaValid] = useState(true);
	const [isStart, setIsStart] = useState(false);
	const [x, setX] = useState("");
	const [isXValid, setIsXValid] = useState(true);
	const [y, setY] = useState("");
	
	return (
		<>
			<div className={'flex justify-center items-center text-2xl font-bold'}> El Gamma Key Generating</div>
			<div className={'flex justify-center items-center'}>
				<div className={'flex flex-col justify-center items-center'}>
					<div className={'flex justify-center gap-4 mt-5'}>
						<div>
							<textarea cols={20} rows={10} placeholder={'Q'} className={'border-2'}
							          onChange={e => setQ(e.target.value)}/>
							{
								(q === "" || !BigIntOperator.isContainOnlyDigit(q) || !BigIntOperator.millerRabinTest(BigInt(q), 5))
								&&
								(
									<div className={'text-red-700'}>
										Not valid
									</div>
								)
							}
						</div>
						<div>
							<textarea cols={20} rows={10} placeholder={'Alpha'} className={'border-2'} onChange={e => {
								setAlpha(e.target.value)
							}}/>
							{
								(alpha === "" || q === "" || !BigIntOperator.isContainOnlyDigit(alpha) || !BigIntOperator.isContainOnlyDigit(q) || !BigIntOperator.isPrimitiveRootOfPrimeNumber(BigInt(q), BigInt(alpha)))
								&&
								(
									<div className={'text-red-700'}>
										Not valid
									</div>
								)
							}
						</div>
					</div>
					<div className={'flex justify-center gap-4 mt-5'}>
						<div>
							<textarea cols={20} rows={1} placeholder={'X'} className={'border-2'}
							          onChange={e => setX(e.target.value)}/>
							{
								(x === "" || !BigIntOperator.isContainOnlyDigit(x) || BigInt(x) > BigInt(q))
								&&
								(
									<div className={'text-red-700'}>
										Not valid
									</div>
								)
							}
						</div>
					</div>
				</div>
			</div>
			<div className={'flex flex-col justify-center items-center'}>
				<button className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500'}
				        onClick={() => {
					        if (!isQPrime || !isAlphaValid || !isXValid) return;
					        setIsStart(true);
									const elGammaKeyPackage: ElGammaKeyPackage|string = ElGamma.generateKey(BigInt(q), BigInt(alpha), BigInt(x));
									if ( typeof elGammaKeyPackage !== 'string' ) {
										setY(elGammaKeyPackage.y.toString());
									}
				        }}>
					Generate Key
				</button>
				{
					isStart &&
					(
						<div className={'flex flex-col justify-center items-center'}>
							<div>
								X: {x}
							</div>
							<div>
								Y: {y.toString()}
							</div>
						</div>
					)
				}
			</div>
		</>
	)
}