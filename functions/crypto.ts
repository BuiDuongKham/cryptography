import {Vector, Matrix} from "ts-matrix";
import {relativizeURL} from "next/dist/shared/lib/router/utils/relativize-url";
import {length} from "postcss";
import {undefined} from "zod";

export class Crypto {
	private _alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'
	private _plain: string = ''
	private _cipher: string = ''
	private _key: any
	private _playfairTable: any;
	private _isPlayfairPadding: boolean = false;
	constructor(alphabet?: string) {
		if (alphabet) this._alphabet = alphabet
		this._isPlayfairPadding = false;
	}

	createRandomString = (length: number) => {
		let result = ''
		for (let i = 0; i < length; i++) {
			result += this._alphabet.charAt(Math.floor(Math.random() * this._alphabet.length))
		}
		return result
	}

	get alphabet(): string {
		return this._alphabet;
	}

	set alphabet(value: string) {
		this._alphabet = value;
	}

	get plain(): string {
		return this._plain;
	}

	set plain(value: string) {
		this._plain = value;
	}

	get cipher(): string {
		return this._cipher;
	}

	set cipher(value: string) {
		this._cipher = value;
	}

	get key(): any {
		return this._key;
	}

	set key(value: any) {
		this._key = value;
	}

	get playfairTable(): any {
		return this._playfairTable;
	}

	set playfairTable(value: any) {
		this._playfairTable = value;
	}

	ceasarEncrypt = () => {
		const key = this._key
		const plain = this._plain
		let cipher = ''
		for (let i = 0; i < plain.length; i++) {
			if (plain.charAt(i) === ' ') {
				cipher += ' '
				continue
			}
			else if (plain.charAt(i)>='0' && plain.charAt(i)<='9') {
				cipher += plain.charAt(i)
				continue
			}
			let c = plain.charAt(i)
			let index = this._alphabet.indexOf(c)
			let newIndex = (index + key) % this._alphabet.length
			cipher += this._alphabet.charAt(newIndex)
		}
		this._cipher = cipher
	}

	ceasarDecrypt = () => {
		const key = this._key
		const cipher = this._cipher
		let plain = ''
		for (let i = 0; i < cipher.length; i++) {
			if (cipher.charAt(i) === ' ') {
				plain += ' '
				continue
			}
			else if (cipher.charAt(i)>='0' && cipher.charAt(i)<='9') {
				plain += cipher.charAt(i)
				continue
			}
			let c = cipher.charAt(i)
			let index = this._alphabet.lastIndexOf(c)
			let newIndex = (index - key) % this._alphabet.length
			if (newIndex < 0) newIndex += this._alphabet.length
			plain += this._alphabet.charAt(newIndex)
		}
		this._plain = plain
	}

	playfairEncrypt = (word: string) => {
		this.key = word
		// creating matrix key from keyword
		const mySet: Set<string> = new Set<string>()
		let newWord: string = word.toLowerCase().trim()
		while (newWord.includes(" ") || newWord.includes("j"))
		{
			newWord = newWord.replace(' ','')
			newWord = newWord.replace('j','i')
		}
		while (this.plain.includes(" ") || this.plain.includes("j"))
		{
			this.plain = this.plain.replace(' ','')
			this.plain = this.plain.replace('j','i')
		}
		const dict = 'abcdefghiklmnopqrstuvwxyz'
		for (let i = 0; i < newWord.length; ++i)
		{
			mySet.add(newWord[i])
		}
		let keyString: string = ""
		mySet.forEach( (key,val) => keyString+=key.toString() )
		for (let i = 0; i<dict.length; ++i)
		{
			if (!keyString.includes(dict[i]))
			{
				keyString += dict[i]
			}
		}
		const matrixKey : string[][] = []
		for (let i= 0; i<5; i++)
		{
			const row : string[] = []
			for (let j=0; j<5; j++)
			{
				row[j]= keyString[5*i + j]
			}
			matrixKey.push(row)
		}
		this.playfairTable = matrixKey
		// spliting plaintext into an array contains only 2-char elements
		const plaintext: string = this._plain
		newWord = plaintext.toLowerCase().trim()
		while (newWord.includes(" "))
		{
			newWord = newWord.replace(' ','')
		}
		let temporaryWord: string =  newWord
		let saveClusters: string[] = []
		while (temporaryWord.length > 0 )
		{
			// case 1: only have 1 char
			if (temporaryWord.length === 1)
			{
				let cluster: string = temporaryWord + "x"
				saveClusters.push(cluster)
				temporaryWord = ""
			} else
			{
				if (temporaryWord[0] != temporaryWord[1])
				{
					let cluster: string = temporaryWord[0] + temporaryWord[1]
					saveClusters.push(cluster)
					temporaryWord = temporaryWord.slice(2)
				} else
				{
					let cluster: string = temporaryWord[0] + "x"
					this._isPlayfairPadding = true;
					saveClusters.push(cluster)
					temporaryWord = temporaryWord.slice(1)
				}
			}
		}


		// encrypt
		const lookupTable: string[][] = matrixKey
		const plain: string[] = saveClusters
		const findIndex: any = (array: any[], value: any) => {
			if (!Array.isArray(array)) return;
			let i = array.indexOf(value), temp;
			if (i !== -1) return [i];
			i = array.findIndex(v => temp = findIndex(v, value));
			if (i !== -1) return [i, ...temp];
		}

		const cipher: string[] = []

		for (let i= 0; i < plain.length; ++i)
		{
			// console.log(plain[i][0], plain[i][1])
			const firstIndexes: any = findIndex(lookupTable, plain[i][0])
			const secondIndexes: any = findIndex(lookupTable, plain[i][1])
			let result: any;
			// in the same row
			if (firstIndexes[0] === secondIndexes[0])
			{
				let firstResult: string = lookupTable[firstIndexes[0]][(firstIndexes[1]+1)%5]
				let secondResult: string = lookupTable[secondIndexes[0]][(secondIndexes[1]+1)%5]
				result = [firstResult, secondResult]
			}

			// in the same column
			else if (firstIndexes[1] === secondIndexes[1])
			{
				let firstResult: string = lookupTable[(firstIndexes[0]+1)%5][firstIndexes[1]]
				let secondResult: string = lookupTable[(secondIndexes[0]+1)%5][secondIndexes[1]]
				result = [firstResult, secondResult]
			}

			// sole
			else
			{
				let firstResult: string = lookupTable[firstIndexes[0]][secondIndexes[1]]
				let secondResult: string = lookupTable[secondIndexes[0]][firstIndexes[1]]
				result = [firstResult, secondResult]
			}
			cipher.push(result[0]+result[1])
		}
		this._cipher = cipher.reduce((x, y, i) => y = x+ cipher[i], "")
	}

	playfairDecrypt = (word: string) => {
		this.key = word
		// creating matrix key from keyword
		const mySet: Set<string> = new Set<string>()
		let newWord: string = word.toLowerCase().trim()
		while (newWord.includes(" ") || newWord.includes("j"))
		{
			newWord = newWord.replace(' ','')
			newWord = newWord.replace('j','i')
		}
		while (this.cipher.includes(" ") || this.cipher.includes("j"))
		{
			this.cipher = this.cipher.replace(' ','')
			this.cipher = this.cipher.replace('j','i')
		}
		const dict = 'abcdefghiklmnopqrstuvwxyz'
		for (let i = 0; i < newWord.length; ++i)
		{
			mySet.add(newWord[i])
		}
		let keyString: string = ""
		mySet.forEach( (key,val) => keyString+=key.toString() )
		for (let i = 0; i<dict.length; ++i)
		{
			if (!keyString.includes(dict[i]))
			{
				keyString += dict[i]
			}
		}
		const matrixKey : string[][] = []
		for (let i= 0; i<5; i++)
		{
			const row : string[] = []
			for (let j=0; j<5; j++)
			{
				row[j]= keyString[5*i + j]
			}
			matrixKey.push(row)
		}
		this.playfairTable = matrixKey
		// spliting plaintext into an array contains only 2-char elements
		const ciphertext: string = this.cipher
		newWord = ciphertext.toLowerCase().trim()
		while (newWord.includes(" "))
		{
			newWord = newWord.replace(' ','')
		}
		let temporaryWord: string =  newWord
		let saveClusters: string[] = []
		while (temporaryWord.length > 0 )
		{
			// case 1: only have 1 char
			if (temporaryWord.length === 1)
			{
				let cluster: string = temporaryWord + "x"
				saveClusters.push(cluster)
				temporaryWord = ""
			} else
			{
				if (temporaryWord[0] != temporaryWord[1])
				{
					let cluster: string = temporaryWord[0] + temporaryWord[1]
					saveClusters.push(cluster)
					temporaryWord = temporaryWord.slice(2)
				} else
				{
					let cluster: string = temporaryWord[0] + "x"
					saveClusters.push(cluster)
					temporaryWord = temporaryWord.slice(1)
				}
			}
		}


		// decrypt
		const lookupTable: string[][] = matrixKey
		const cipher: string[] = saveClusters
		const findIndex: any = (array: any[], value: any) => {
			if (!Array.isArray(array)) return;
			let i = array.indexOf(value), temp;
			if (i !== -1) return [i];
			i = array.findIndex(v => temp = findIndex(v, value));
			if (i !== -1) return [i, ...temp];
		}

		const plain: string[] = []

		for (let i= 0; i < cipher.length; ++i)
		{
			// console.log(plain[i][0], plain[i][1])
			const firstIndexes: any = findIndex(lookupTable, cipher[i][0])
			const secondIndexes: any = findIndex(lookupTable, cipher[i][1])
			let result: any;
			// in the same row
			if (firstIndexes[0] === secondIndexes[0])
			{
				let firstResult: string = lookupTable[firstIndexes[0]][(firstIndexes[1]-1+5)%5]
				let secondResult: string = lookupTable[secondIndexes[0]][(secondIndexes[1]-1+5)%5]
				result = [firstResult, secondResult]
			}

			// in the same column
			else if (firstIndexes[1] === secondIndexes[1])
			{
				let firstResult: string = lookupTable[(firstIndexes[0]-1+5)%5][firstIndexes[1]]
				let secondResult: string = lookupTable[(secondIndexes[0]-1+5)%5][secondIndexes[1]]
				result = [firstResult, secondResult]
			}

			// sole
			else
			{
				let firstResult: string = lookupTable[firstIndexes[0]][secondIndexes[1]]
				let secondResult: string = lookupTable[secondIndexes[0]][firstIndexes[1]]
				result = [firstResult, secondResult]
			}
			plain.push(result[0]+result[1])
		}
		this._plain = plain.reduce((x, y, i) => y = x+ plain[i], "")
		if (this.isPlayfairPadding)
		{
			let newPlain: string = "";
			for (let i = 0; i < this._plain.length; ++i)
			{
				if (this._plain[i] === 'x' && this._plain[i+1] === this._plain[i-1])
				{
					newPlain += this._plain[i+1]
					i+=1
				} else
				{
					newPlain += this._plain[i]
				}
			}
			this._plain = newPlain
		}
	}

	hillEncrypt = (keyMatrix: number[][] | undefined) => {
		let plainText: string = this._plain
		if (!keyMatrix) return;
		const matrix = new Matrix(keyMatrix.length, keyMatrix[0].length, keyMatrix)
		if (matrix.determinant() === 0) {this.cipher='Ma trận không khả nghịch';return;}

		const n: number = keyMatrix.length

		plainText = plainText.toLowerCase().trim()

		while (plainText.includes(" "))
		{
			plainText = plainText.replace(" ",'')
		}

		let plainNumber = []

		for (let i = 0 ; i < plainText.length ; ++i)
		{
			plainNumber.push(plainText.charCodeAt(i)-97)
		}

		let preprocessArray: number[][] = []
		let k = 0


		while (k+n <= plainNumber.length)
		{
			let slice: number[] = plainNumber.slice(k, k+n)
			preprocessArray.push(slice)
			k += n
		}

		if (k < plainNumber.length)
		{
			let slice: number[] = plainNumber.slice(k, plainNumber.length)
			while (slice.length < n)
			{
				slice.push(23)
			}
			preprocessArray.push(slice)
		}



		const preprocessMatrix = new Matrix(preprocessArray.length,preprocessArray[0].length,preprocessArray)

		console.log('pre matrix', preprocessMatrix)

		const postprocessMatrix: Matrix = preprocessMatrix.multiply(matrix)

		console.log('post matrix before mod', postprocessMatrix)

		for (let i = 0; i < postprocessMatrix.rows; i++) {
			for (let j = 0; j < postprocessMatrix.columns; j++) {
				postprocessMatrix.values[i][j] = postprocessMatrix.at(i,j) % 26
			}
		}

		console.log('post matrix after mod', postprocessMatrix)

		let cipher: string = ""

		for (let i = 0; i < postprocessMatrix.rows; i++) {
			for (let j = 0; j < postprocessMatrix.columns; j++) {
				cipher += String.fromCharCode(postprocessMatrix.at(i,j)+97)
			}
		}

		console.log('cipher text',cipher)
		this.cipher = cipher
	}
	hillDecrypt = (keyMatrix: number[][] | undefined) => {
		const alternativeRemainder: any = (x:number) =>
		{
			return (x - Math.floor(x/26)*26) % 26
		}
		const extendedEuclid: any =  (x: number, y: number) =>
		{
			let u: number[] =  [1, 0 , x]
			let v: number[] =  [0, 1, y]
			while (u[2] !== 1)
			{
				let q = Math.floor(u[2] / v[2])
				let t = [ u[0] - q*v[0], u[1] - q*v[1], u[2] - q*v[2] ]
				u = [...v]
				v = [...t]
			}
			return u
		}
		if (keyMatrix === undefined) return;
		let matrix = new Matrix(keyMatrix.length, keyMatrix[0].length, keyMatrix)
		if (matrix.determinant() === 0) {this.plain = 'Ma trận không khả nghịch'; return;}

		const determinantOfMatrix = matrix.determinant()
		const reminder = alternativeRemainder(determinantOfMatrix)
		const inverseReminder = alternativeRemainder(extendedEuclid(reminder, 26)[0])

		console.log('reminder', reminder)
		console.log('Inverse Reminded', inverseReminder)

		let cipherText = this.cipher

		const n: number = keyMatrix.length

		cipherText = cipherText.toLowerCase().trim()

		while (cipherText.includes(" "))
		{
			cipherText = cipherText.replace(" ",'')
		}

		let cipherNumber = []

		for (let i = 0 ; i < cipherText.length ; ++i)
		{
			cipherNumber.push(cipherText.charCodeAt(i)-97)
		}

		let preprocessArray: number[][] = []
		let k = 0

		while (k+n <= cipherNumber.length)
		{
			let slice: number[] = cipherNumber.slice(k, k+n)
			preprocessArray.push(slice)
			k += n
		}

		if (k < cipherNumber.length)
		{
			let slice: number[] = cipherNumber.slice(k, cipherNumber.length)
			while (slice.length < n)
			{
				slice.push(23)
			}
			preprocessArray.push(slice)
		}

		const preprocessMatrix = new Matrix(preprocessArray.length,preprocessArray[0].length,preprocessArray)

		console.log('preprocess matrix', preprocessMatrix)
		let cofactorMatrix: number[][] | any =[]

		for (let i = 0; i < matrix.rows; i++) {
			const dummy: number[] = []
			for (let j = 0; j < matrix.columns; j++) {
				dummy.push(alternativeRemainder(Math.pow(-1, i+j )* matrix.getCofactor(i,j).determinant() * inverseReminder ) )
			}
			cofactorMatrix.push(dummy)
		}

		cofactorMatrix = new Matrix(cofactorMatrix.length, cofactorMatrix[0].length, cofactorMatrix).transpose()
		console.log(cofactorMatrix)

		const postprocessMatrix: Matrix = preprocessMatrix.multiply(cofactorMatrix)

		console.log('post matrix before mod', postprocessMatrix)

		for (let i = 0; i < postprocessMatrix.rows; i++) {
			for (let j = 0; j < postprocessMatrix.columns; j++) {
				postprocessMatrix.values[i][j] = postprocessMatrix.at(i,j) % 26
			}
		}

		console.log('post matrix after mod', postprocessMatrix)

		let plain: string = ""

		for (let i = 0; i < postprocessMatrix.rows; i++) {
			for (let j = 0; j < postprocessMatrix.columns; j++) {
				plain += String.fromCharCode(postprocessMatrix.at(i,j)+97)
			}
		}

		console.log('plaintext',plain)
		this.plain = plain
	}
	
	get isPlayfairPadding(): boolean {
		return this._isPlayfairPadding;
	}
	
	set isPlayfairPadding(value: boolean) {
		this._isPlayfairPadding = value;
	}
}
