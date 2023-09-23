import {League_Gothic} from "next/dist/compiled/@next/font/dist/google";

export class BigIntOperator 
{
	public static millerRabinTest(n: bigint, k: number): boolean
	{
		if (n === BigInt('2') || n === BigInt('3')) return true;
		if (n < BigInt('2') || n % BigInt('2') === BigInt('0')) return false;
		// debugger;
		for (let i = 0; i < k; i++) {
			const a = BigIntOperator.getRandomBigInt(BigInt('2'), n - BigInt('2'));
			if (!BigIntOperator.millerRabinTestHelper(n, a)) return false;
		}
		return true;
	}
	private static millerRabinTestHelper(n: bigint, a: bigint) {
		const k = BigIntOperator.getTwoPower(n - BigInt('1'));
		const s = BigIntOperator.exponentiation(BigInt('2'), k)
		let d = n / s;
		let x = BigIntOperator.modPow(a, d, n);
		if (x === BigInt('1') || x === n - BigInt('1')) return true;
		for (let i = BigInt('1'); i <= k; i++) {
			let z1 = BigIntOperator.modPow(x, BigIntOperator.exponentiation(BigInt('2'),i)*d, n) === BigInt('1');
			let z2 = BigIntOperator.modPow(x, BigIntOperator.exponentiation(BigInt('2'),i-BigInt('1'))*d, n) === n - BigInt('1');
			if ( z1 && z2) return true;
		}
		return false;
	}
	public static getTwoPower(n: bigint): bigint {
		let result = BigInt('1');
		let k = BigInt('0');
		while (result * BigInt('2') < n && n % (result * BigInt('2')) === BigInt('0')) {
			result *= BigInt('2');
			k++;
		}
		return k;
	}
	
	public static exponentiation(base: bigint, exponent: bigint): bigint
	{
		let result = BigInt('1');
		for (let i = BigInt('0'); i < exponent; i++)
		{
			result *= base;
		}
		return result;
	}
	
	public static MIN_BIGINT = BigInt('1234567890123456789012345678901234567890');
	public static MAX_BIGINT = BigInt('9876543210987654321098765432109876543210');
	public static getRandomBigInt(min: bigint , max: bigint ): bigint
	{
		if (min === undefined) min = BigIntOperator.MIN_BIGINT;
		if (max === undefined) max = BigIntOperator.MAX_BIGINT;
		const range = max - min;
		const bits = range.toString(2).length;
		
		let result = BigInt('0');
		do
		{
			result = BigInt('0');
			for (let i = 0; i < bits; i++)
			{
				result = result * BigInt('2') + BigInt(Math.random() > 0.5 ? 1 : 0);
			}
		}
		while (result > range);
		
		return result + min;
	}
	
	
	public static modPow(base: bigint, exponent: bigint, n: bigint): bigint {
		if (exponent === BigInt('0')) return BigInt('1');
		if (exponent === BigInt('1')) return BigInt(base) % BigInt(n);
		if (exponent % BigInt('2') === BigInt('0')){
			const root = BigIntOperator.modPow(base, exponent / BigInt('2'), n);
			return root * root % n;
		}
		const root = BigIntOperator.modPow(base, (exponent - BigInt('1')) / BigInt('2'), n);
		return root * root * base % n;
	}
	
	public static littleFermat(n: bigint, k: number): boolean
	{
		// debugger;
		if (n === BigInt('2') || n === BigInt('3')) return true;
		if (n < BigInt('2') || n % BigInt('2') === BigInt('0')) return false;
		
		for (let i = 0; i < k; i++)
		{
			const a = BigIntOperator.getRandomBigInt(BigInt('2'), n - BigInt('2'));
			if (BigIntOperator.modPow(a, n - BigInt('1'), n) !== BigInt('1')) return false;
		}
		
		return true;
	}
	
	public static genN(p: bigint, q: bigint): bigint
	{
		return p * q;
	}
	
	public static genD(p: bigint, q: bigint, e: bigint): bigint
	{
		const phi = (p - BigInt('1')) * (q - BigInt('1'));
		return BigIntOperator.getInverseModulo(e, phi);
	}

	public static getInverseModulo(a: bigint, n: bigint)
	{
		// debugger;
		let u =  [BigInt('1'), BigInt('0'), a];
		let v = [BigInt('0'), BigInt('1'), n];
		
		while (u[2] != BigInt('1'))
		{
				let q = u[2]/v[2];
				let cloneU = [...u];
				u = [...v];
				v = [ cloneU[0] - q*v[0], cloneU[1] - q*v[1], cloneU[2] - q*v[2] ];
		}
		return (u[0] + n)%n;
	}
	public static getGCD(a: bigint, b: bigint): bigint
	{
		if (b === BigInt('0')) return a;
		if (a === BigInt('0')) return b;
		return BigIntOperator.getGCD(b, a%b);
	}
	
	public static checkEValid(p: bigint, q: bigint, e: bigint):boolean
	{
		const phi = (p - BigInt('1')) * (q - BigInt('1'))
		return BigIntOperator.getGCD(e, phi) === BigInt('1');
		
	}
	
	
	// Utilities for Diffie-Hellman key exchange
	
	public static getPrimitiveRootOfPrimeNumber(p: bigint): bigint
	{
		const primitiveRoots :bigint[] = [];
		for (let i = BigInt('2'); i < p; i++)
		{
			if (BigIntOperator.isPrimitiveRootOfPrimeNumber(p, i))  primitiveRoots.push(i);
		}
		return primitiveRoots[Math.floor(Math.random() * primitiveRoots.length)];
	}
	
	public static isPrimitiveRootOfPrimeNumber(p: bigint, i: bigint) {
		if (BigIntOperator.getGCD(i, p) !== BigInt('1')) return false;
		const phi = p - BigInt('1');
		const factors = BigIntOperator.getFactors(phi);
		const array = Array.from(factors);
		for (let j = 0; j < array.length; j++) {
			if (BigIntOperator.modPow(i, phi / array[j], p) === BigInt('1')) return false;
		}
		return true;
	}
	
	private static getFactors(phi: bigint) {
		const result = new Set<bigint>();
		let divisor = BigInt('2');
		while (phi > BigInt('1')) {
			if (phi % divisor === BigInt('0')) {
				result.add(divisor);
				phi /= divisor;
			} else {
				divisor++;
			}
		}
		return result;
	}
	
	public static isContainOnlyDigit = (s: string) => {
	for (let i = 0; i < s.length; i++){
		if (s[i] < '0' || s[i] > '9') return false;
	}
	return true;
	}
	
	
	public static I2OSP(x: bigint, xLen: number): string
	{
		if (x > BigIntOperator.exponentiation(BigInt('128'), BigInt(xLen))) throw new Error('integer too large');
		let result = '';
		while (x > BigInt('0'))
		{
			const byte = (x % BigInt('256')).toString(16).padStart(2, '0');
			result = byte + result;
			x /= BigInt('256');
		}
		return result;
	}
	
	public static OS2IP(x: string): bigint
	{
		let result = BigInt('0');
		for (let i = 0; i <x.length ; ++i)
		{
			result = result * BigInt('16') + BigInt('0x' + x[i]);
		}
		return result;
	}
	
	public static S2OS(x: string): string
	{
		let result = "";
		let cloneX = x;
		while (cloneX.length >0)
		{
			const byte = cloneX.substring(0, 1);
			result = result + byte.charCodeAt(0).toString(16).padStart(2, '0');
			cloneX = cloneX.substring(1);
		}
		return result;
	}
}