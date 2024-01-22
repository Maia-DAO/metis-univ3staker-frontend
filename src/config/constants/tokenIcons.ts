import { getAddress } from '@ethersproject/address'

export function getTokenUrl(address: any) {
	const checksummedAddress = isAddress(address)
	if (checksummedAddress) {
		return `https://raw.githubusercontent.com/MaiaDAO/token-list/main/${checksummedAddress}.svg`
	} else {
		return ''
	}
}

// returns the checksummed address if the address is valid, otherwise returns false
function isAddress(value: string): string | false {
	try {
		// Alphabetical letters must be made lowercase for getAddress to work.
		// See documentation here: https://docs.ethers.io/v5/api/utils/address/
		return getAddress(value.toLowerCase())
	} catch {
		return false
	}
}
