import {Ultis} from "../../../functions/ultis";
import {Vigenere} from "../../../functions/vigenere";
export default function Home() {
	const myVigenere: Vigenere = new Vigenere('anh kham dep trai qua');
	console.log(myVigenere.decrypt('cupmvttdrvgxuueckhbuqiiqwecapecugdeaurbozjrph'));
	return(
		<></>
	)
}