import {BigIntOperator} from "./BigIntOperator";

export type ElGammaKeyPackage = {
	q: bigint;
	alpha: bigint;
	y: bigint;
}
export type EncryptedMessage = {
	c1: bigint;
	c2: bigint;
}
export type DecryptedMessage = {
	message: bigint;
	oneTimeK: bigint;
};
export class ElGamma{
	public static generateKey(q: bigint, alpha: bigint, x: bigint): ElGammaKeyPackage|string
	{
		if ( BigIntOperator.getGCD(alpha, q) !== BigInt(1) )
			return "alpha and q are not coprime";
		if ( !BigIntOperator.millerRabinTest(q, 5))
			return "q is not prime";
		if ( !BigIntOperator.isPrimitiveRootOfPrimeNumber(q, alpha))
			return "alpha is not a primitive root of q";
		
		const y = BigIntOperator.modPow(alpha, x, q);
		return {
			q: q,
			alpha: alpha,
			y: y
		};
	}
	
	public static encrypt(message: bigint, k: bigint, key: ElGammaKeyPackage): EncryptedMessage
	{
		const oneTimeK = BigIntOperator.modPow( key.y, k, key.q);
		const c1 = BigIntOperator.modPow(key.alpha, k, key.q);
		const c2 = (message % key.q) * (oneTimeK % key.q) % key.q;
		return {
			c1: c1,
			c2: c2
		};
	}
	
	public static decrypt(encryptedMessage: EncryptedMessage, key: ElGammaKeyPackage, privateKey: bigint): DecryptedMessage
	{
		const oneTimeK = BigIntOperator.modPow(encryptedMessage.c1, privateKey, key.q);
		const message = (encryptedMessage.c2 % key.q) * (BigIntOperator.getInverseModulo(oneTimeK, key.q) % key.q) % key.q;
		return {
			message: message,
			oneTimeK: oneTimeK
		};
	}
	
}