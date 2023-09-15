import {debug} from "util";

export class BigIntOperator 
{
	// public static milerRabinTest(n: bigint, k: number): boolean
	// {
	// 	if (n === 2n || n === 3n) return true;
	// 	if (n < 2n || n % 2n === 0n) return false;
	//
	// 	let s = 0n;
	// 	let d = n - 1n;
	// 	while (d % 2n === 0n) 
	// 	{
	// 		d /= 2n;
	// 		s++;
	// 	}
	//
	// 	loop: for (let i = 0; i < k; i++) 
	// 	{
	// 		const a = BigIntOperator.getRandomBigInt(2n, n - 2n);
	// 		let x = BigIntOperator.modPow(a, d, n);
	//
	// 		if (x === 1n || x === n - 1n) continue;
	//
	// 		for (let r = 1n; r < s; r++) 
	// 		{
	// 			x = BigIntOperator.modPow(x, 2n, n);
	// 			if (x === 1n) return false;
	// 			if (x === n - 1n) continue loop;
	// 		}
	//
	// 		return false;
	// 	}
	//
	// 	return true;
	// }
	
	public static MIN_BIGINT = 1234567890123456789012345678901234567890n;
	public static MAX_BIGINT = 9876543210987654321098765432109876543210n;
	public static getRandomBigInt(min: bigint , max: bigint ): bigint
	{
		if (min === undefined) min = BigIntOperator.MIN_BIGINT;
		if (max === undefined) max = BigIntOperator.MAX_BIGINT;
		const range = max - min;
		const bits = range.toString(2).length;
		
		let result = 0n;
		do
		{
			result = 0n;
			for (let i = 0; i < bits; i++)
			{
				result = result * 2n + BigInt(Math.random() > 0.5 ? 1 : 0);
			}
		}
		while (result > range);
		
		return result + min;
	}
	
	
	public static modPow(base: bigint, exponent: bigint, n: bigint): bigint {
		if (exponent === 0n) return 1n;
		if (exponent === 1n) return BigInt(base) % BigInt(n);
		if (exponent % 2n === 0n){
			const root = BigIntOperator.modPow(base, exponent / 2n, n);
			return root * root % n;
		}
		const root = BigIntOperator.modPow(base, (exponent - 1n) / 2n, n);
		return root * root * base % n;
	}
	
	public static littleFermat(n: bigint, k: number): boolean
	{
		// debugger;
		if (n === 2n || n === 3n) return true;
		if (n < 2n || n % 2n === 0n) return false;
		
		for (let i = 0; i < k; i++)
		{
			const a = BigIntOperator.getRandomBigInt(2n, n - 2n);
			if (BigIntOperator.modPow(a, n - 1n, n) !== 1n) return false;
		}
		
		return true;
	}
}