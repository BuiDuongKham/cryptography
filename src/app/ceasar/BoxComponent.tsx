export type BoxComponentProps = {
	title: string
	value?: string
	isDisable: boolean
	register?: any
}
export default function BoxComponent(props: BoxComponentProps) {
	return (
		<div className={'flex flex-col justify-center p-4 m-10 border-2'}>
			<div className={'flex justify-center text-2xl font-bold'}>{props.title}</div>
			<div className={'flex justify-center'}>
				{
					props.isDisable ? <div className={'flex justify-center text-2xl font-bold'}>
						<textarea value={props.value} disabled={props.isDisable} className={'w-60 h-52 border-2'} />
						</div> :
						<textarea {...props.register('text')} placeholder={'Enter some text here'} disabled={props.isDisable} className={'w-60 h-52 border-2'} />
				}
			</div>
		</div>
	)
}