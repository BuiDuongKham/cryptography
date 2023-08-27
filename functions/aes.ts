export class Aes {
	numberOfWords: number;
	numberOfRounds: number;
	key: string;
	rcon: number[][];
	sBox: number[][] =
		[
			[99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118],
			[202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192],
			[183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21],
			[4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117],
			[9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132],
			[83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207],
			[208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168],
			[81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210],
			[205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115],
			[96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219],
			[224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121],
			[231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8],
			[186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138],
			[112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158],
			[225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223],
			[140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22]
		]
	inverseSBox: number[][] =
		[
			[82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251],
			[124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203],
			[84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78],
			[8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37],
			[114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146],
			[108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132],
			[144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6],
			[208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107],
			[58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115],
			[150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110],
			[71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27],
			[252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244],
			[31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95],
			[96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239],
			[160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97],
			[23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125]
		]
	rcon128: number[][] =
		[
			[0, 1, 0, 0, 0, 0, 0, 0],
			[0, 2, 0, 0, 0, 0, 0, 0],
			[0, 4, 0, 0, 0, 0, 0, 0],
			[0, 8, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 0],
			[2, 0, 0, 0, 0, 0, 0, 0],
			[4, 0, 0, 0, 0, 0, 0, 0],
			[8, 0, 0, 0, 0, 0, 0, 0],
			[1, 11, 0, 0, 0, 0, 0, 0],
			[3, 6, 0, 0, 0, 0, 0, 0]
		]
	rcon192: number[][] =
		[
			[0, 1, 0, 0, 0, 0, 0, 0],
			[0, 2, 0, 0, 0, 0, 0, 0],
			[0, 4, 0, 0, 0, 0, 0, 0],
			[0, 8, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 0],
			[2, 0, 0, 0, 0, 0, 0, 0],
			[4, 0, 0, 0, 0, 0, 0, 0],
			[8, 0, 0, 0, 0, 0, 0, 0],
		]
	rcon256: number[][] =
		[
			[0, 1, 0, 0, 0, 0, 0, 0],
			[0, 2, 0, 0, 0, 0, 0, 0],
			[0, 4, 0, 0, 0, 0, 0, 0],
			[0, 8, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 0],
			[2, 0, 0, 0, 0, 0, 0, 0],
			[4, 0, 0, 0, 0, 0, 0, 0],
		]
	
	mixColumnsMatrix: number[][] =
		[
			[2, 3, 1, 1],
			[1, 2, 3, 1],
			[1, 1, 2, 3],
			[3, 1, 1, 2]
		]
	inverseMixColumnsMatrix: number[][] =
		[
			[14, 11, 13, 9],
			[9, 14, 11, 13],
			[13, 9, 14, 11],
			[11, 13, 9, 14]
		]
	
	constructor(key: string) {
		let k = 0;
		if (key.length === 32) {
			this.numberOfWords = 4;
			this.numberOfRounds = 10;
			this.rcon = this.rcon128;
		} else if (key.length === 48) {
			this.numberOfWords = 6;
			this.numberOfRounds = 12;
			this.rcon = this.rcon192;
		} else if (key.length === 64) {
			this.numberOfWords = 8;
			this.numberOfRounds = 14;
			this.rcon = this.rcon256;
		} else {
			throw new Error("Invalid key size");
		}
		this.key = key
	}
	
	public g = (word: number[], rcon: number[]): number[] => {
		// rotword
		const rotWord: number[] = [...word.slice(2, 8).concat(word.slice(0, 2))]
		// subword
		const subWord: number[] = []
		
		for (let j = 0; j < 4; ++j) {
			const row: number = rotWord[j * 2]
			const column: number = rotWord[j * 2 + 1]
			subWord.push(Math.floor(this.sBox[row][column] / 16))
			subWord.push(this.sBox[row][column] % 16)
		}
		
		// rcon
		
		const result: number[] = []
		for (let i = 0; i < word.length; ++i) {
			result.push(subWord[i] ^ rcon[i])
		}
		return result
	}
	
	public preG = (word: number[]): number[] => {
		// rotword
		const rotWord: number[] = [...word]
		// subword
		const subWord: number[] = []
		
		for (let j = 0; j < 4; ++j) {
			const row: number = rotWord[j * 2]
			const column: number = rotWord[j * 2 + 1]
			subWord.push(Math.floor(this.sBox[row][column] / 16))
			subWord.push(this.sBox[row][column] % 16)
		}
		return subWord
	}
	
	public generateRoundKeys = (): number[][] => {
		
		if (this.numberOfWords === 8) {
			const keys: number[][] = []
			
			// split key word
			let keyword: string = this.key;
			while (keyword.length > 0) {
				const chunk: string = keyword.slice(0, 8)
				const chunkNumbers: number[] = []
				keyword = keyword.slice(8, keyword.length)
				for (let i = 0; i < chunk.length; ++i) {
					chunkNumbers.push(parseInt(chunk[i], 16))
				}
				keys.push(chunkNumbers)
			}
			
			// generate round keys
			for (let i = this.numberOfWords; i < (this.numberOfRounds + 1) * 4; ++i) {
				if (i % this.numberOfWords === 0) {
					let lastWord: number[] = [...keys[keys.length - 1]]
					let rconIndex: number = i / (this.numberOfWords) - 1
					
					let afterXorWithRcon: number[] = this.g(lastWord, this.rcon[rconIndex])
					let afterXorWithWord: number[] = []
					// xor with last word
					
					for (let j = 0; j < lastWord.length; ++j) {
						afterXorWithWord.push(afterXorWithRcon[j] ^ keys[i - this.numberOfWords][j])
					}
					keys.push(afterXorWithWord)
				} else if (i % this.numberOfWords === 4) {
					let lastWord: number[] = [...keys[keys.length - 1]]
					let afterXorWithWord: number[] = this.preG(lastWord)
					let result: number[] = []
					for (let j = 0; j < lastWord.length; ++j) {
						result.push(afterXorWithWord[j] ^ keys[i - this.numberOfWords][j])
					}
					keys.push(result)
				} else {
					let afterXorWithWord: number[] = []
					for (let j = 0; j < keys[i - this.numberOfWords].length; ++j) {
						afterXorWithWord.push(keys[i - this.numberOfWords][j] ^ keys[i - 1][j])
					}
					keys.push(afterXorWithWord)
				}
			}
			return keys
		}
		
		const keys: number[][] = []
		
		// split key word
		let keyword: string = this.key;
		while (keyword.length > 0) {
			const chunk: string = keyword.slice(0, 8)
			const chunkNumbers: number[] = []
			keyword = keyword.slice(8, keyword.length)
			for (let i = 0; i < chunk.length; ++i) {
				chunkNumbers.push(parseInt(chunk[i], 16))
			}
			keys.push(chunkNumbers)
		}
		
		// generate round keys
		for (let i = this.numberOfWords; i < (this.numberOfRounds + 1) * 4; ++i) {
			if (i % this.numberOfWords === 0) {
				let lastWord: number[] = [...keys[keys.length - 1]]
				let rconIndex: number = i / (this.numberOfWords) - 1
				
				let afterXorWithRcon: number[] = this.g(lastWord, this.rcon[rconIndex])
				let afterXorWithWord: number[] = []
				// xor with last word
				
				for (let j = 0; j < lastWord.length; ++j) {
					afterXorWithWord.push(afterXorWithRcon[j] ^ keys[i - this.numberOfWords][j])
				}
				keys.push(afterXorWithWord)
			} else {
				let afterXorWithWord: number[] = []
				for (let j = 0; j < keys[i - this.numberOfWords].length; ++j) {
					afterXorWithWord.push(keys[i - this.numberOfWords][j] ^ keys[i - 1][j])
				}
				keys.push(afterXorWithWord)
			}
		}
		return keys
	}
	
	public subBytes = (state: number[][]): number[][] => {
		const result: number[][] = []
		for (let i = 0; i < state.length; ++i) {
			const row: number[] = []
			for (let j = 0; j < state[i].length; ++j) {
				const rowNumber: number = Math.floor(state[i][j] / 16)
				const columnNumber: number = state[i][j] % 16
				row.push(this.sBox[rowNumber][columnNumber])
			}
			result.push(row)
		}
		return result
	}
	public shiftRows = (state: number[][]): number[][] => {
		const result: number[][] = []
		for (let i = 0; i < state.length; ++i) {
			const row: number[] = []
			for (let j = 0; j < state[i].length; ++j) {
				row.push(state[i][(j + i) % 4])
			}
			result.push(row)
		}
		return result
	}
	
	public static mod2 = (a: number) => {
		return (a + 2) % 2;
	}
	
	public static galoisAddition = (a: number, b: number): number => {
		const aInBinary: string = a.toString(2).padStart(8, '0')
		const bInBinary: string = b.toString(2).padStart(8, '0')
		const aInBinaryArray: number[] = aInBinary.split('').map((element) => parseInt(element, 2))
		const bInBinaryArray: number[] = bInBinary.split('').map((element) => parseInt(element, 2))
		const result: number[] = []
		for (let i = 0; i < 8; ++i) {
			result.push(Aes.mod2(aInBinaryArray[i] + bInBinaryArray[i]))
		}
		return parseInt(result.join(''), 2)
	}
	
	public static galoisMultiply = (a: number, b: number): number => {
		const aInBinary: string = a.toString(2).padStart(8, '0')
		const bInBinary: string = b.toString(2).padStart(8, '0')
		const aInBinaryArray: number[] = aInBinary.split('').map((element) => parseInt(element, 2))
		const bInBinaryArray: number[] = bInBinary.split('').map((element) => parseInt(element, 2))
		
		let result: number[][] = []
		for (let i = 0; i < 8; ++i) {
			const chunk: number[] = []
			let padHead: number = 8 - i
			let padTail: number = i
			while (padHead > 0) {
				chunk.push(0)
				padHead--;
			}
			if (bInBinaryArray[7 - i] === 1) {
				chunk.push(...aInBinaryArray)
			} else {
				chunk.push(...aInBinaryArray.map(() => 0))
			}
			while (padTail > 0) {
				chunk.push(0)
				padTail--;
			}
			result.push(chunk)
		}
		
		let finalResult: number[] = []
		for (let column = 0; column < 16; column++) {
			let temp: number = 0
			for (let row = 0; row < 8; row++) {
				temp = (temp + result[row][column]) % 2
			}
			finalResult.push(temp)
		}
		
		return parseInt(finalResult.join(''), 2)
	}
	
	public static compare2BinaryArray = (a: number[] | undefined, b: number[]): number => {
		if (a === undefined || a.length === 0) {
			a = [0]
		}
		const aInDecimal: number = parseInt(a.join(''))
		const bInDecimal: number = parseInt(b.join(''))
		if (aInDecimal > bInDecimal) {
			return 1
		} else if (aInDecimal === bInDecimal) {
			return 0;
		} else return -1;
	}
	public static galoisDivision = (a: number, p: number): number[] => {
		// const p: number = 283
		const pInBinary: string = p.toString(2)
		const aInBinary: string = a.toString(2)
		let pInBinaryArray: number[] = pInBinary.split('').map((element) => parseInt(element, 2))
		let aInBinaryArray: number[] = aInBinary.split('').map((element) => parseInt(element, 2))
		const firstLength: number = aInBinaryArray.length
		let result: number[] = []
		let remainder: number[] = []
		let numberOfPreviousDigit: number = 1
		while (aInBinaryArray.length >= pInBinaryArray.length) {
			let k: number = numberOfPreviousDigit;
			while (aInBinaryArray.slice(0, k).length < pInBinaryArray.length) {
				result.push(0)
				k++;
			}
			let dividedNumber: number[] = aInBinaryArray.slice(0, k)
			result.push(1)
			let temp: number[] = pInBinaryArray
			while (temp.length < dividedNumber.length) {
				temp.unshift(0)
			}
			// subtract dividedNumber with temp using galois addition
			let subtractedNumber: number[] = []
			for (let i = 0; i < dividedNumber.length; ++i) {
				if (temp[i] !== dividedNumber[i]) {
					subtractedNumber.push(1)
				} else {
					subtractedNumber.push(0)
				}
			}
			// reduce 0 in front
			while (subtractedNumber[0] === 0) {
				subtractedNumber.shift()
			}
			numberOfPreviousDigit = subtractedNumber.length + 1
			subtractedNumber = subtractedNumber.concat(aInBinaryArray.slice(k, aInBinaryArray.length))
			remainder = subtractedNumber
			aInBinaryArray = subtractedNumber
		}
		// padding 0 to tail of result
		while (result.length < firstLength) {
			result.push(0)
		}
		return [parseInt(result.join(''), 2), parseInt(remainder.join(''), 2)]
	}
	
	public mixColumns = (state: number[][]): number[][] => {
		const result: number[][] = []
		for (let i = 0; i < state.length; ++i) {
			const row: number[] = []
			for (let j = 0; j < state[i].length; ++j) {
				let temp: number = 0
				for (let k = 0; k < state[i].length; ++k) {
					let product = Aes.galoisMultiply(state[k][j], this.mixColumnsMatrix[i][k])
					if (product > 255) {
						product = Aes.galoisDivision(product, 283)[1]
					}
					temp = Aes.galoisAddition(temp, product)
				}
				row.push(temp)
			}
			result.push(row)
		}
		return result
	}
	public addRoundKey = (state: number[][], roundKey: number[][]): number[][] => {
		
		let roundKeyInDecimal: number[][] = []
		for (let i = 0; i < roundKey.length; ++i) {
			const row: number[] = []
			let temp = [...roundKey[i]]
			while (temp.length > 0) {
				row.push( temp[0] * 16 + temp[1])
				temp = temp.slice(2, temp.length)
			}
			roundKeyInDecimal.push(row)
		}
		
		// arrange round key
		roundKey = []
		for (let i = 0; i < roundKeyInDecimal.length; ++i) {
			const row: number[] = []
			for (let j = 0; j < roundKeyInDecimal[i].length; ++j) {
				row.push(roundKeyInDecimal[j][i])
			}
			roundKey.push(row)
		}
		
		
		const result: number[][] = []
		for (let i = 0; i < state.length; ++i) {
			const row: number[] = []
			for (let j = 0; j < state[i].length; ++j) {
				row.push(state[i][j] ^ roundKey[i][j])
			}
			result.push(row)
		}
		return result
	}
	
	public encrypt = (plainText: string): string => {
		let result: string = ''
		// padding 0 to plain text till it is multiple of 32
		while (plainText.length % 32 !== 0) {
			plainText += '0'
		}
		// covert plain text to state
		const states: number[][][] = []
		while (plainText.length > 0) {
			const state: number[][] = []
			const chunk: string = plainText.slice(0, 32)
			plainText = plainText.slice(32, plainText.length)
			for (let i = 0; i < 4; ++i) {
				const row: number[] = []
				for (let j = 0; j < 4; ++j) {
					row.push(parseInt(chunk[i * 8 + j * 2] + chunk[i * 8 + j * 2 + 1], 16))
				}
				state.push(row)
			}
			states.push(state)
		}
		
		// transpose state
		for (let i = 0; i < states.length; ++i) {
			const state: number[][] = []
			for (let j = 0; j < states[i].length; ++j) {
				const row: number[] = []
				for (let k = 0; k < states[i][j].length; ++k) {
					row.push(states[i][k][j])
				}
				state.push(row)
			}
			states[i] = state
		}
		
		// generate round keys
		const roundKeys: number[][] = this.generateRoundKeys()
		
		for (let i = 0; i <states.length; ++i)
		{
			// add round key round 0
			states[i] = this.addRoundKey(states[i], roundKeys.slice(0, 4))
			for (let j = 1; j < this.numberOfRounds; ++j) {
				//  sub bytes
				states[i] = this.subBytes(states[i])
				// shift rows
				states[i] = this.shiftRows(states[i])
				// mix columns
				states[i] = this.mixColumns(states[i])
				// add round key
				states[i] = this.addRoundKey(states[i], roundKeys.slice(j * 4, j * 4 + 4))
			}
			// final round
			// sub bytes
			states[i] = this.subBytes(states[i])
			// shift rows
			states[i] = this.shiftRows(states[i])
			// add round key
			states[i] = this.addRoundKey(states[i], roundKeys.slice(this.numberOfRounds * 4, this.numberOfRounds * 4 + 4))
			
			// transpose state i
			const newStateI: number[][] = []
			for (let j = 0; j < states[i].length; ++j) {
				const row: number[] = []
				for (let k = 0; k < states[i][j].length; ++k) {
					row.push(states[i][k][j])
				}
				newStateI.push(row)
			}
			
			for (let j = 0; j < newStateI.length; j++) {
				for (let k = 0; k < newStateI[0].length; k++) {
					result += newStateI[j][k].toString(16).padStart(2, '0')
				}
			}
		}
		return result
	}
	
	public inverseShiftRows = (state: number[][]): number[][] => {
		const result: number[][] = []
		for (let i = 0; i < state.length; ++i) {
			const row: number[] = []
			for (let j = 0; j < state[i].length; ++j) {
				row.push(state[i][(j - i + 4) % 4])
			}
			result.push(row)
		}
		return result
	}
	
	public inverseSubBytes = (state: number[][]): number[][] => {
		const result: number[][] = []
		for (let i = 0; i < state.length; ++i) {
			const row: number[] = []
			for (let j = 0; j < state[i].length; ++j) {
				const rowNumber: number = Math.floor(state[i][j] / 16)
				const columnNumber: number = state[i][j] % 16
				row.push(this.inverseSBox[rowNumber][columnNumber])
			}
			result.push(row)
		}
		return result
	}
	
	public inverseMixColumns = (state: number[][]): number[][] => {
		const result: number[][] = []
		for (let i = 0; i < state.length; ++i) {
			const row: number[] = []
			for (let j = 0; j < state[i].length; ++j) {
				let temp: number = 0
				for (let k = 0; k < state[i].length; ++k) {
					let product = Aes.galoisMultiply(state[k][j], this.inverseMixColumnsMatrix[i][k])
					if (product > 255) {
						product = Aes.galoisDivision(product, 283)[1]
					}
					temp = Aes.galoisAddition(temp, product)
				}
				row.push(temp)
			}
			result.push(row)
		}
		return result
	}
	
	public decrypt = (cipherText: string): string => {
		let result: string = ''
		// padding 0 to plain text till it is multiple of 32
		while (cipherText.length % 32 !== 0) {
			cipherText += '0'
		}
		
		// covert plain text to state
		const states: number[][][] = []
		while (cipherText.length > 0) {
			const state: number[][] = []
			const chunk: string = cipherText.slice(0, 32)
			cipherText = cipherText.slice(32, cipherText.length)
			for (let i = 0; i < 4; ++i) {
				const row: number[] = []
				for (let j = 0; j < 4; ++j) {
					row.push(parseInt(chunk[i * 8 + j * 2] + chunk[i * 8 + j * 2 + 1], 16))
				}
				state.push(row)
			}
			states.push(state)
		}
		
		// transpose state
		for (let i = 0; i < states.length; ++i) {
			const state: number[][] = []
			for (let j = 0; j < states[i].length; ++j) {
				const row: number[] = []
				for (let k = 0; k < states[i][j].length; ++k) {
					row.push(states[i][k][j])
				}
				state.push(row)
			}
			states[i] = state
		}
		
		// generate round keys
		const roundKeys: number[][] = this.generateRoundKeys()
		
		for (let i = 0; i <states.length; ++i)
		{
			// add round key round 0 (final round of encryption)
			states[i] = this.addRoundKey(states[i], roundKeys.slice(this.numberOfRounds * 4, this.numberOfRounds * 4 + 4))
			
			for (let j = this.numberOfRounds - 1; j > 0; --j) {
				// inverse shift rows
				states[i] = this.inverseShiftRows(states[i])
				// inverse sub bytes
				states[i] = this.inverseSubBytes(states[i])
				// add round key
				states[i] = this.addRoundKey(states[i], roundKeys.slice(j * 4, j * 4 + 4))
				// inverse mix columns
				states[i] = this.inverseMixColumns(states[i])
			}
			// final round
			// inverse shift rows
			states[i] = this.inverseShiftRows(states[i])
			// inverse sub bytes
			states[i] = this.inverseSubBytes(states[i])
			// add round key
			states[i] = this.addRoundKey(states[i], roundKeys.slice(0, 4))
			
			// transpose state i
			const newStateI: number[][] = []
			for (let j = 0; j < states[i].length; ++j) {
				const row: number[] = []
				for (let k = 0; k < states[i][j].length; ++k) {
					row.push(states[i][k][j])
				}
				newStateI.push(row)
			}
			
			for (let j = 0; j < newStateI.length; j++) {
				for (let k = 0; k < newStateI[0].length; k++) {
					result += newStateI[j][k].toString(16).padStart(2, '0')
				}
			}
		}
		return result
	}
}