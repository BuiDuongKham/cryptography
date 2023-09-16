'use client'
import {useEffect, useState} from "react";
import {BigIntOperator} from "../../../functions/BigIntOperator";

export default function Home() {
  
	const [p, setP] = useState("");
	const [q, setQ] = useState("");
	const [e, setE]  = useState("");
	const [isPPrime, setIsPPrime] = useState(true);
	const [isQPrime, setIsQPrime] = useState(true)
	const [isEValid, setIsEValid] = useState(true);	
	const [isStart, setIsStart] = useState(false);
	const [d, setD] = useState("");
	const [n, setN] = useState("");
	const checkIsValid = (s: string) =>
	{
		if (s.length ===0 ) return;
		// check if all chars are digits
		for (let i = 0; i < s.length; i++){
			if (s[i] < '0' || s[i] > '9') return false;
		}
		return true;
	}
	
	useEffect(() => {
		if (checkIsValid(p) && BigIntOperator.millerRabinTest(BigInt(p), 5))
		{
			setIsPPrime(true);
		} else {setIsPPrime(false)};
		if (checkIsValid(q) && BigIntOperator.millerRabinTest(BigInt(q), 5))
		{
			setIsQPrime(true);
		} else {setIsQPrime(false)}
		if (checkIsValid(e) && BigIntOperator.checkEValid(BigInt(p), BigInt(q), BigInt(e)))
		{
			setIsEValid(true);
		} else {setIsEValid(false)}
	}, [p, q, e]);
	
	return (
		<div className={'flex justify-center items-center'}>
			<div className={'flex flex-col justify-center items-center'}>
				<div className={'flex justify-center text-2xl font-bold'}> Generate Key </div>
				<div className={'flex justify-center gap-4 mt-5'}>
					<div>
						<textarea cols={20} rows={10} className={'border-2'} placeholder={'P'} onChange={e=>{
							setP(e.target.value)}} />
						{
							!isPPrime &&
							(
								<div>
									Not valid
								</div>
							)
						} 
					</div>
					<div>
						<textarea cols={20} rows={10} className={'border-2'} placeholder={'Q'} onChange={e=>{
							setQ(e.target.value)}} />
						{
							!isQPrime &&
							(
								<div>
									Not valid
								</div>
							)
						}
					</div>	
				</div>
				<div className={'flex justify-center gap-4 mt-5'}>
					<textarea cols={20} rows={1} className={'border-2'} placeholder={'E'} onChange={e=>{
						setE(e.target.value)}
					} />
					{
						!isEValid &&
						(
							<div>
								Not valid
							</div>
						)
					}
				</div>
				<div className={'flex justify-center mt-5'}>
					<button className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500'} 
					        onClick={()=>{
								if (isPPrime && isQPrime && isEValid)
								{
									setIsStart(true);
									setD(BigIntOperator.genD(BigInt(p), BigInt(q), BigInt(e)).toString());
									setN(BigIntOperator.genN(BigInt(p), BigInt(q)).toString());
								}
					      }}>  
						Start
					</button>
				</div>
				{
					isStart &&
					(
						<div className={'flex justify-center gap-4 mt-5'}>
							<div className={'flex items-center'}>
								<label htmlFor={'D'}>D</label>
								<textarea id={'D'} cols={20} rows={10} className={'border-2'} placeholder={'D'} value={d} />
							</div>
							<div className={'flex items-center'}>
								<label htmlFor={'N'}>N</label>
								<textarea id={'N'} cols={20} rows={10} className={'border-2'} placeholder={'N'} value={n} />
							</div>
						</div>
					)
				}
			</div>
		</div>
	)
}