export class Ultis{
	public static charToAlphabetIndex(char: string): number {
		return char.charCodeAt(0) - 97;
	}
	public static alphabetIndexToChar(index: number): string {
		return String.fromCharCode(index + 97);
	}

	public static charTo8BitAsciiBinary(char: string): string {
		let ascii = char.charCodeAt(0);
		let binary = ascii.toString(2);
		while (binary.length < 8) {
			binary = "0" + binary;
		}
		return binary;
	}
}