export class Crypto {
	private _alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'
	private _plain: string = ''
	private _cipher: string = ''
	private _key: any
	constructor(alphabet?: string) {
		if (alphabet) this._alphabet = alphabet
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
		// create key
		const mySet: Set<string> = new Set<string>()
		let newWord: string = word.toLowerCase().trim()
		while (newWord.includes(" "))
		{
			newWord = newWord.replace(' ','')
		}
		const dict = 'abcdefghijklmnopqrstuvwxyz'
		for (let i = 0; i < newWord.length; ++i)
		{
			mySet.add(newWord[i])
		}
		let keyString: string = ""
		mySet.forEach( (key,val) => keyString+=key.toString() )
		for (let i = 0; i<dict.length; ++i)
		{
			if (!keyString.includes(dict[i]) && dict[i]!= "j")
			{
				keyString += dict[i]
			}
		}
		const matrixKey : String[][] = []
		for (let i= 0; i<5; i++)
		{
			const row : String[] = []
			for (let j=0; j<5; j++)
			{
				row[j]= keyString[5*i + j]
			}
			matrixKey.push(row)
		}
	}
}
