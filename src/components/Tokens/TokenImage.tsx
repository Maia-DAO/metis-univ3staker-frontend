import unkownToken from '@/../public/tokens/blank_token.svg'
import { getTokenUrl } from '@/config'
import Image from 'next/image'
import React, { useState } from 'react'

// Define the proxy component with looser type
const ImageProxy: any = Image

interface IProps {
	address: string
	alt?: string
	width?: number
	height?: number
	className?: string
}

const TokenImageWithoutKey: React.FC<IProps> = ({ address, alt = 'TKN', width = 32, height = 32, className }) => {
	const [imgSrc, setImgSrc] = useState(getTokenUrl(address))

	const handleError = () => {
		setImgSrc(unkownToken) // Set to fallback image source
	}

	return (
		<ImageProxy
			src={imgSrc}
			alt={alt}
			width={width}
			height={height}
			className={`${className} rounded-full bg-dark-raisin`}
			onError={handleError} // Handle error event
		/>
	)
}

const withKeyFromAddress = (Component: any) => {
	const WrappedComponent = (props: IProps) => {
		// Use the address prop to form a unique key
		const key = props.address

		// Return the original component with the key prop set
		return <Component {...props} key={key} />
	}

	// Set a display name for the wrapped component for debugging purposes
	WrappedComponent.displayName = `WithKeyFromAddress(${Component.displayName || Component.name || 'Component'})`

	return WrappedComponent
}

const TokenImage = withKeyFromAddress(TokenImageWithoutKey)

export default TokenImage
