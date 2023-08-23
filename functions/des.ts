import Error from "next/error";
export class Des {
	private _initPermutationTable: number[][] = [
		[57, 49, 41, 33, 25, 17, 9, 1],
		[59, 51, 43, 35, 27, 19, 11, 3],
		[61, 53, 45, 37, 29, 21, 13, 5],
		[63, 55, 47, 39, 31, 23, 15, 7],
		[56, 48, 40, 32, 24, 16, 8, 0],
		[58, 50, 42, 34, 26, 18, 10, 2],
		[60, 52, 44, 36, 28, 20, 12, 4],
		[62, 54, 46, 38, 30, 22, 14, 6]
	]
	private _finalPermutationTable: number[][] = [
		[39, 7, 47, 15, 55, 23, 63, 31],
		[38, 6, 46, 14, 54, 22, 62, 30],
		[37, 5, 45, 13, 53, 21, 61, 29],
		[36, 4, 44, 12, 52, 20, 60, 28],
		[35, 3, 43, 11, 51, 19, 59, 27],
		[34, 2, 42, 10, 50, 18, 58, 26],
		[33, 1, 41, 9, 49, 17, 57, 25],
		[32, 0, 40, 8, 48, 16, 56, 24]
	]
	private _key: number[];
	private _keyCompressionTable: number[][] =
		[
			[56, 48, 40, 32, 24, 16, 8],
			[0, 57, 49, 41, 33, 25, 17],
			[9, 1, 58, 50, 42, 34, 26],
			[18, 10, 2, 59, 51, 43, 35],
			[62, 54, 46, 38, 30, 22, 14],
			[6, 61, 53, 45, 37, 29, 21],
			[13, 5, 60, 52, 44, 36, 28],
			[20, 12, 4, 27, 19, 11, 3]
		];
	private keyCompressionAfterShiftTable: number[][] =
		[
			[13, 16, 10, 23, 0, 4, 2, 27],
			[14, 5, 20, 9, 22, 18, 11, 3],
			[25, 7, 15, 6, 26, 19, 12, 1],
			[40, 51, 30, 36, 46, 54, 29, 39],
			[50, 44, 32, 47, 43, 48, 38, 55],
			[33, 52, 45, 41, 49, 35, 28, 31]
		]
	private _expansionTable: number[][] = [
		[31, 0, 1, 2, 3, 4],
		[3, 4, 5, 6, 7, 8],
		[7, 8, 9, 10, 11, 12],
		[11, 12, 13, 14, 15, 16],
		[15, 16, 17, 18, 19, 20],
		[19, 20, 21, 22, 23, 24],
		[23, 24, 25, 26, 27, 28],
		[27, 28, 29, 30, 31, 0]
	];
	private _sBox: number[][] =
		[
			[0b1110, 0b0100, 0b1101, 0b0001, 0b0010, 0b1111, 0b1011, 0b1000, 0b0011, 0b1010, 0b0110, 0b1100, 0b0101, 0b1001, 0b0000, 0b0111],
			[0b0000, 0b1111, 0b0111, 0b0100, 0b1110, 0b0010, 0b1101, 0b0001, 0b1010, 0b0110, 0b1100, 0b1011, 0b1001, 0b0101, 0b0011, 0b1000],
			[0b0100, 0b0001, 0b1110, 0b1000, 0b1101, 0b0110, 0b0010, 0b1011, 0b1111, 0b1100, 0b1001, 0b0111, 0b0011, 0b1010, 0b0101, 0b0000],
			[0b1111, 0b1100, 0b1000, 0b0010, 0b0100, 0b1001, 0b0001, 0b0111, 0b0101, 0b1011, 0b0011, 0b1110, 0b1010, 0b0000, 0b0110, 0b1101],
		];
	private _pBox: number[][] =
		[
			[15, 6, 19, 20, 28, 11, 27, 16],
			[0, 14, 22, 25, 4, 17, 30, 9],
			[1, 7, 23, 13, 31, 26, 2, 8],
			[18, 12, 29, 5, 21, 10, 3, 24]
		];
	
	
	get initPermutationTable(): number[][] {
		return this._initPermutationTable;
	}
	
	set initPermutationTable(value: number[][]) {
		this._initPermutationTable = value;
	}
	
	get finalPermutationTable(): number[][] {
		return this._finalPermutationTable;
	}
	
	set finalPermutationTable(value: number[][]) {
		this._finalPermutationTable = value;
	}
	
	get key(): number[] {
		return this._key;
	}
	
	set key(value: number[]) {
		this._key = value;
	}
	
	get keyCompressionTable(): number[][] {
		return this._keyCompressionTable;
	}
	
	set keyCompressionTable(value: number[][]) {
		this._keyCompressionTable = value;
	}
	
	get expansionTable(): number[][] {
		return this._expansionTable;
	}
	
	set expansionTable(value: number[][]) {
		this._expansionTable = value;
	}
	
	get sBox(): number[][] {
		return this._sBox;
	}
	
	set sBox(value: number[][]) {
		this._sBox = value;
	}
	
	get pBox(): number[][] {
		return this._pBox;
	}
	
	set pBox(value: number[][]) {
		this._pBox = value;
	}
	
	constructor(key: string, keyCompressionTable?: number[][], expansionTable?: number[][], sBox?: number[][], pBox?: number[][], initPermutationTable?: number[][], finalPermutationTable?: number[][]) {
		if (initPermutationTable) {
			this._initPermutationTable = initPermutationTable;
		}
		if (finalPermutationTable) {
			this._finalPermutationTable = finalPermutationTable;
		}
		if (key.length != 64) {
			throw new Error({title: 'error', statusCode:202})
		} else {
			this._key = [];
			for (let i = 0; i < key.length; ++i) {
				this._key.push(parseInt(key[i]));
			}
		}
		if (keyCompressionTable) this._keyCompressionTable = keyCompressionTable;
		if (expansionTable) this._expansionTable = expansionTable;
		if (sBox) this._sBox = sBox;
		if (pBox) this._pBox = pBox;
	}
	
	public getCompressedKey(): number[] {
		let result: number[] = [];
		for (let i = 0; i < this._keyCompressionTable.length; ++i) {
			for (let j = 0; j < this._keyCompressionTable[0].length; j++) {
				result.push(this._key[this._keyCompressionTable[i][j]]);
			}
		}
		return result;
	}
	
	public leftShift(bits: number, data: number[]): number[] {
		let result: number[] = [];
		for (let i = bits; i < data.length; ++i) {
			result.push(data[i]);
		}
		for (let i = 0; i < bits; ++i) {
			result.push(data[i]);
		}
		return result;
	}
	
	public getExpandedData(data: number[]): number[] {
		let result: number[] = [];
		for (let i = 0; i < this.expansionTable.length; i++) {
			for (let j = 0; j < this.expansionTable[0].length; j++) {
				result.push(data[this.expansionTable[i][j]]);
			}
		}
		return result;
	}
	
	public xor(data1: number[], data2: number[]): number[] {
		let result: number[] = [];
		for (let i = 0; i < data1.length; ++i) {
			result.push(data1[i] ^ data2[i]);
		}
		return result;
	}
	
	public getSubstitutedData(data: number[]): number[] {
		let result: number[] = [];
		for (let i = 0; i < data.length; i += 6) {
			let row: number = data[i] * 2 + data[i + 5];
			let col: number = data[i + 1] * 8 + data[i + 2] * 4 + data[i + 3] * 2 + data[i + 4];
			let sBoxValue: number = this._sBox[row][col];
			let binary: string = sBoxValue.toString(2);
			while (binary.length < 4) {
				binary = "0" + binary;
			}
			for (let j = 0; j < binary.length; ++j) {
				result.push(parseInt(binary[j]));
			}
		}
		return result;
	}
	
	public getPermutedData(data: number[]): number[] {
		let result: number[] = [];
		for (let i = 0; i < this._pBox.length; ++i) {
			let row: number = this._pBox[i][0];
			let col: number = this._pBox[i][1];
			result.push(data[row * 8 + col]);
		}
		return result;
	}
	
	
	public encrypt(data: string): string | any {
		//preprocess data
		data = data.replace(/\s/g, "");
		
		// split data into 64-bit blocks
		
		const chunks: string[] = [];
		
		// padding data
		
		if (data.length % 8 != 0) {
			data += "x".repeat(8 - data.length % 8);
		}
		
		// convert data to binary
		for (let i = 0; i < data.length; i += 8) {
			let chunk: string = "";
			for (let j = 0; j < 8; ++j) {
				let binary: string = data.charCodeAt(i + j).toString(2);
				while (binary.length < 8) {
					binary = "0" + binary;
				}
				chunk += binary;
			}
			chunks.push(chunk);
		}
		
		const newChunks: string[] = [];
		
		for (let i = 0; i < chunks.length; ++i) {
			
			let compressedKey: number[] = this.getCompressedKey();
			let chunk: string = chunks[i];
			
			// initial permutation
			let newChunk: string = "";
			for (let j = 0; j < this._initPermutationTable.length; ++j) {
				for (let k = 0; k < this._initPermutationTable[0].length; ++k) {
					newChunk += chunk[this._initPermutationTable[j][k]];
				}
			}
			
			chunk = newChunk;
			
			
			for (let j = 1; j <= 16; ++j) {
				
				// split chunk into left and right
				
				let left: string = chunk.slice(0, 32);
				let right: string = chunk.slice(32, 64);
				// generate key
				let leftKey = [...compressedKey.slice(0, 28)]
				let rightKey = [...compressedKey.slice(28, 56)]
				let numberBits = 0;
				if (j === 1 || j === 2 || j === 9 || j === 16) {
					numberBits = 1
				} else {
					numberBits = 2
				}
				leftKey = this.leftShift(numberBits, leftKey)
				rightKey = this.leftShift(numberBits, rightKey)
				let newKey: number[] = leftKey.concat(rightKey)
				// compress key
				let newCompressedKey: number[] = [];
				for (let k = 0; k < this.keyCompressionAfterShiftTable.length; ++k) {
					for (let l = 0; l < this.keyCompressionAfterShiftTable[0].length; ++l) {
						newCompressedKey.push(newKey[this.keyCompressionAfterShiftTable[k][l]]);
					}
				}
				// done generate key
				console.log('key in round ' + j + ' is: ' + newCompressedKey.join(''))
				compressedKey = newKey
				// expand right
				let expandedRight: number[] = this.getExpandedData(right.split("").map(x => parseInt(x)));
				// xor expanded right with key
				let xoredRight: number[] = this.xor(expandedRight, newCompressedKey);
				// substitute
				let substitutedRight: number[] = this.getSubstitutedData(xoredRight);
				// permute
				let permutedRight: number[] = this.getPermutedData(substitutedRight);
				// xor left with permuted right
				let xoredLeft: number[] = this.xor(left.split("").map(x => parseInt(x)), permutedRight);
				// update left and right
				left = right;
				right = xoredLeft.join("");
				chunk = left + right;
			}
			// after 16 rounds, swap left and right
			let left: string = chunk.slice(0, 32);
			let right: string = chunk.slice(32, 64);
			chunk = right + left;
			// final permutation
			let result: string = "";
			for (let j = 0; j < this._finalPermutationTable.length; ++j) {
				for (let k = 0; k < this._finalPermutationTable[0].length; ++k) {
					result += chunk[this._finalPermutationTable[j][k]];
				}
			}
			newChunks.push(result);
		}
		
		// convert binary to string
		let result: string = "";
		let resultBinary: string = "";
		for (let i = 0; i < newChunks.length; ++i) {
			let chunk: string = newChunks[i];
			for (let j = 0; j < chunk.length; j += 8) {
				let binary: string = chunk.slice(j, j + 8);
				let char: string = String.fromCharCode(parseInt(binary, 2));
				result += char;
			}
		}
		
		console.log(newChunks)
		
		return result;
	}
	
	public static decrypt(data: string): string {
		return data;
	}
}