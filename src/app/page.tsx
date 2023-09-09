import Image from 'next/image'
import styles from './styles.module.css'
export default function Home() {
  return (
		<main className={styles.screen}>
			<div className={'flex min-h-screen justify-between'}>
				<div className={'min-h-full mx-10 px-4 bg-teal-500 flex flex-col justify-around'}>
					<a href={'/ceasar'} className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500'}>
						Ceasar
					</a>
					<a href={'/playfair'} className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500'}>
						Playfair
					</a>
					<a href={'/hill'} className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500'}>
						Hill
					</a>
					<a href={'/vigenere'} className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500'}>
						Vigerne
					</a>
					<a href={'/vernam'} className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500'}>
						Vernam
					</a>
					<a href={'/onetimepad'} className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500'}>
						One time pad
					</a>
				</div>
				<div className={'flex flex-col justify-around items-center min-h-full px-20 mx-10 bg-teal-500'}>
					<a href={'/des'} className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500'}>
						DES
					</a>
					<a href={'/aes'} className={'px-20 py-2 bg-blue-300 hover:text-white hover:bg-emerald-600 transition-all duration-500'}>
						AES
					</a>
				</div>
			</div>
		</main>
  )
}
