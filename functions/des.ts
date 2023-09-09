export class Des {
	private _key: number[] = [];
	private _firstCompressionKeyTable: number[][] =
		[
			[56, 48, 40, 32, 24, 16, 8],
			[0, 57, 49, 41, 33, 25, 17],
			[9, 1, 58, 50, 42, 34, 26],
			[18, 10, 2, 59, 51, 43, 35],
			[62, 54, 46, 38, 30, 22, 14],
			[6, 61, 53, 45, 37, 29, 21],
			[13, 5, 60, 52, 44, 36, 28],
			[20, 12, 4, 27, 19, 11, 3]
		]
	private _secondCompressionKeyTable: number[][] =
		[
			[13, 16, 10, 23, 0, 4, 2, 27],
			[14, 5, 20, 9, 22, 18, 11, 3],
			[25, 7, 15, 6, 26, 19, 12, 1],
			[40, 51, 30, 36, 46, 54, 29, 39],
			[50, 44, 32, 47, 43, 48, 38, 55],
			[33, 52, 45, 41, 49, 35, 28, 31]
		]
	private _initialPermutationTable: number[][] =
		[
			[57, 49, 41, 33, 25, 17, 9, 1],
			[59, 51, 43, 35, 27, 19, 11, 3],
			[61, 53, 45, 37, 29, 21, 13, 5],
			[63, 55, 47, 39, 31, 23, 15, 7],
			[56, 48, 40, 32, 24, 16, 8, 0],
			[58, 50, 42, 34, 26, 18, 10, 2],
			[60, 52, 44, 36, 28, 20, 12, 4],
			[62, 54, 46, 38, 30, 22, 14, 6]
		]
	private _finalPermutationTable: number[][] =
		[
			[39, 7, 47, 15, 55, 23, 63, 31],
			[38, 6, 46, 14, 54, 22, 62, 30],
			[37, 5, 45, 13, 53, 21, 61, 29],
			[36, 4, 44, 12, 52, 20, 60, 28],
			[35, 3, 43, 11, 51, 19, 59, 27],
			[34, 2, 42, 10, 50, 18, 58, 26],
			[33, 1, 41, 9, 49, 17, 57, 25],
			[32, 0, 40, 8, 48, 16, 56, 24]
		]
	private _expansionTable: number[][] =
		[
			[31, 0, 1, 2, 3, 4],
			[3, 4, 5, 6, 7, 8],
			[7, 8, 9, 10, 11, 12],
			[11, 12, 13, 14, 15, 16],
			[15, 16, 17, 18, 19, 20],
			[19, 20, 21, 22, 23, 24],
			[23, 24, 25, 26, 27, 28],
			[27, 28, 29, 30, 31, 0]
		]
	private _sBox: number[][][] =
		[
			[
				[14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
				[0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
				[4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
				[15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
			],
			[
				[15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
				[3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
				[0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
				[13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]
			],
			[
				[10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
				[13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
				[13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
				[1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]
			],
			[
				[7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
				[13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
				[10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
				[3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]
			],
			[
				[2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
				[14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
				[4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
				[11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]
			
			],
			[
				[12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
				[10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
				[9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
				[4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]
			],
			[
				[4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
				[13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
				[1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
				[6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]
			],
			[
				[13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
				[1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
				[7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
				[2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
			]
		]
	private _pBox: number[][] =
		[
			[15, 6, 19, 20, 28, 11, 27, 16],
			[0, 14, 22, 25, 4, 17, 30, 9],
			[1, 7, 23, 13, 31, 26, 2, 8],
			[18, 12, 29, 5, 21, 10, 3, 24]
		]
	
	public convertMessageToHexChunks(message: string): number[][] {
		const messageChunks: number[][] = [];
		while (message.length % 16 !== 0) {
			message += '0';
		}
		for (let i = 0; i < message.length; i += 16) {
			const chunk: number[] = [];
			for (let j = i; j < i + 16; j++) {
				chunk.push(parseInt(message[j], 16));
			}
			messageChunks.push(chunk);
		}
		return messageChunks;
	}
	
	constructor(key: string) {
		// convert key to binary
		const keyBinary: number[] = [];
		for (let i = 0; i < key.length; i++) {
			const decBase: number = parseInt(key[i], 16);
			const binBase: string = decBase.toString(2);
			const binBasePadded: string = binBase.padStart(4, '0');
			for (let j = 0; j < binBasePadded.length; j++) {
				keyBinary.push(parseInt(binBasePadded[j]));
			}
		}
		// fuck again, it's just for testing. Damn, motherfuck the example
		this._key = keyBinary;
	}
	
	public getFirstCompressionKey(): number[] {
		let result: number[] = [];
		for (let i = 0; i < this._firstCompressionKeyTable.length; i++) {
			for (let j = 0; j < this._firstCompressionKeyTable[i].length; j++) {
				result.push(this._key[this._firstCompressionKeyTable[i][j]]);
			}
		}
		return result;
	}
	
	public getSecondCompressionKey(key: number[]): number[] {
		let result: number[] = [];
		for (let i = 0; i < this._secondCompressionKeyTable.length; i++) {
			for (let j = 0; j < this._secondCompressionKeyTable[i].length; j++) {
				result.push(key[this._secondCompressionKeyTable[i][j]]);
			}
		}
		return result;
	}
	
	public shiftLeft(key: number[], shift: number): number[] {
		let result: number[] = [];
		for (let i = 0; i < key.length; i++) {
			result.push(key[(i + shift) % key.length]);
		}
		return result;
	}
	
	public generateKey(): number[][] {
		let key: number[] = this.getFirstCompressionKey();
		const result: number[][] = [];
		
		for (let i = 0; i < 16; i++) {
			// split into two halves
			let leftHalf: number[] = key.slice(0, 28);
			let rightHalf: number[] = key.slice(28, 56);
			// shift left
			if (i === 0 || i === 1 || i === 8 || i === 15) {
				leftHalf = this.shiftLeft(leftHalf, 1);
				rightHalf = this.shiftLeft(rightHalf, 1);
			} else {
				leftHalf = this.shiftLeft(leftHalf, 2);
				rightHalf = this.shiftLeft(rightHalf, 2);
			}
			
			// combine
			key = leftHalf.concat(rightHalf);
			
			// compress
			const secondCompressionKey: number[] = this.getSecondCompressionKey(key);
			
			// add to result
			result.push(secondCompressionKey);
		}
		return result;
	}
	public generateReverseKey(): number[][] {
		let key: number[][] = this.generateKey();
		const result: number[][] = [];
		for (let i = 0; i < key.length; i++) {
			result.push(key[key.length - i - 1]);
		}
		return result;
	}
	
	public working(message: string, keys: number[][]): string {
		const messageChunks: number[][] = this.convertMessageToHexChunks(message);
		const encryptedChunks: number[][] = [];
		for (let i = 0; i < messageChunks.length; i++) {
			let chunk: number[] = messageChunks[i];
			// convert to binary
			let chunkBinary: number[] = [];
			for (let j = 0; j < chunk.length; j++) {
				const decBase: number = chunk[j];
				const binBase: string = decBase.toString(2);
				const binBasePadded: string = binBase.padStart(4, '0');
				for (let k = 0; k < binBasePadded.length; k++) {
					chunkBinary.push(parseInt(binBasePadded[k]));
				}
			}
			
			// initial permutation
			let initialPermutation: number[] = [];
			for (let j = 0; j < this._initialPermutationTable.length; j++) {
				for (let k = 0; k < this._initialPermutationTable[j].length; k++) {
					initialPermutation.push(chunkBinary[this._initialPermutationTable[j][k]]);
				}
			}
			
			// 16 rounds
			let leftHalf: number[] = initialPermutation.slice(0, 32);
			let rightHalf: number[] = initialPermutation.slice(32, 64);
			for (let j = 0; j < 16; j++) {
				const rightHalfExpanded: number[] = [];
				
				// expand right half
				
				for (let k = 0; k < this._expansionTable.length; k++) {
					for (let l = 0; l < this._expansionTable[k].length; l++) {
						rightHalfExpanded.push(rightHalf[this._expansionTable[k][l]]);
					}
				}
				const roundKey: number[] = keys[j];
				const xor: number[] = this.xor(rightHalfExpanded, roundKey);
				const sBox: number[] = [];
				
				// s-box
				for (let k = 0; k < 8; k++) {
					const row: number = xor[k * 6] * 2 + xor[k * 6 + 5];
					const col: number = xor[k * 6 + 1] * 8 + xor[k * 6 + 2] * 4 + xor[k * 6 + 3] * 2 + xor[k * 6 + 4];
					const sBoxNumber: number = this._sBox[k][row][col];
					const sBoxBinary: string = sBoxNumber.toString(2);
					const sBoxBinaryPadded: string = sBoxBinary.padStart(4, '0');
					for (let l = 0; l < sBoxBinaryPadded.length; l++) {
						sBox.push(parseInt(sBoxBinaryPadded[l]));
					}
				}
				
				const pBox: number[] = [];
				for (let k = 0; k < this._pBox.length; k++) {
					for (let l = 0; l < this._pBox[k].length; l++) {
						pBox.push(sBox[this._pBox[k][l]]);
					}
				}
				const xor2: number[] = this.xor(leftHalf, pBox);
				leftHalf = rightHalf;
				rightHalf = xor2;
			}
			
			// combine
			const combined: number[] = rightHalf.concat(leftHalf);
			
			// final permutation
			const finalPermutation: number[] = [];
			for (let j = 0; j < this._finalPermutationTable.length; j++) {
				for (let k = 0; k < this._finalPermutationTable[j].length; k++) {
					finalPermutation.push(combined[this._finalPermutationTable[j][k]]);
				}
			}
			
			// convert to number
			const finalPermutationNumber: number[] = [];
			for (let j = 0; j < 8; j++) {
				let result: number = 0;
				for (let k = 0; k < 8; k++) {
					result += finalPermutation[j * 8 + k] * Math.pow(2, 7 - k);
				}
				finalPermutationNumber.push(result);
			}
			
			encryptedChunks.push(finalPermutationNumber);
		}
		
		let finalEncrypted: string = ""
		
		for (let i = 0; i < encryptedChunks.length; i++) {
			for (let j = 0; j < encryptedChunks[i].length; j++) {
				let notPadYet : string = encryptedChunks[i][j].toString(16);
				if (notPadYet.length < 2) {
					notPadYet = "0" + notPadYet;
				}
				finalEncrypted += notPadYet;
			}
		}
		
		return finalEncrypted;
	}
	
	public encrypt(message: string): string {
		return this.working(message, this.generateKey());
	}
	public decrypt(message: string): string {
		return this.working(message, this.generateReverseKey());
	}
	
	
	get key(): number[] {
		return this._key;
	}
	
	set key(value: number[]) {
		this._key = value;
	}
	
	get firstCompressionKeyTable(): number[][] {
		return this._firstCompressionKeyTable;
	}
	
	set firstCompressionKeyTable(value: number[][]) {
		this._firstCompressionKeyTable = value;
	}
	
	get secondCompressionKeyTable(): number[][] {
		return this._secondCompressionKeyTable;
	}
	
	set secondCompressionKeyTable(value: number[][]) {
		this._secondCompressionKeyTable = value;
	}
	
	get initialPermutationTable(): number[][] {
		return this._initialPermutationTable;
	}
	
	set initialPermutationTable(value: number[][]) {
		this._initialPermutationTable = value;
	}
	
	get finalPermutationTable(): number[][] {
		return this._finalPermutationTable;
	}
	
	set finalPermutationTable(value: number[][]) {
		this._finalPermutationTable = value;
	}
	
	get expansionTable(): number[][] {
		return this._expansionTable;
	}
	
	set expansionTable(value: number[][]) {
		this._expansionTable = value;
	}
	
	get sBox(): number[][][] {
		return this._sBox;
	}
	
	set sBox(value: number[][][]) {
		this._sBox = value;
	}
	
	get pBox(): number[][] {
		return this._pBox;
	}
	
	set pBox(value: number[][]) {
		this._pBox = value;
	}
	
	public xor(a: number[], b: number[]): number[] {
		let result: number[] = [];
		for (let i = 0; i < a.length; i++) {
			result.push(a[i] ^ b[i]);
		}
		return result;
	}
	
}