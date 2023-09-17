import {BigIntOperator} from "./BigIntOperator";
export type DiffieHellmanPackage = {
	"ya": bigint;
	"yb": bigint;
	"keyExchange": bigint;
}
export class DiffieHellman{
	public static generateKey(q: bigint, alpha: bigint, xa: bigint, xb: bigint): DiffieHellmanPackage
	{
		const ya = BigIntOperator.modPow(alpha, xa, q);
		const yb = BigIntOperator.modPow(alpha, xb, q);
		const k = BigIntOperator.modPow(ya, xb, q);
		const diffieHellmanPackage: DiffieHellmanPackage = {
			"ya": ya,
			"yb": yb,
			"keyExchange": k
		};
		return diffieHellmanPackage;
	}
}