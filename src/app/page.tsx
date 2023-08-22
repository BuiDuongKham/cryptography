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
				</div>
				<div className={'min-h-full px-20 mx-10 bg-teal-500'}>
					Placeholder
				</div>
			</div>
		</main>
  )
}
