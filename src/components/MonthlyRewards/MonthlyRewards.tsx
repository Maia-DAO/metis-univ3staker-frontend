import Image from "next/image";

import metisToken from "../../../public/tokens/metis.svg";
import usdcToken from "../../../public/tokens/usdc.svg";
import wethToken from "../../../public/tokens/eth.svg";

const MonthlyRewards = () => {
  const data = [
    {
      1: 1,
    },
    {
      1: 1,
    },
    {
      1: 1,
    },
    {
      1: 1,
    }
  ]
  return (
    <div className="flex flex-col mb-8 gap-14 items-start">
      <div className="text-2xl text-white">
        Monthly Rewards And Fees
      </div>
      <div className="self-stretch flex flex-row justify-between items-center mb-5">
        {data.map((item, idx) => (
          <div key={idx} className="relative flex flex-col items-start w-full max-w-[300px] h-[90px]">
            <div className="w-full shadow-[0px_6px_14px_-3px_rgba(0,_0,_0,_0.25)] py-4 h-full bg-dark-gunmetal relative flex flex-col justify-center gap-3 items-start px-5 rounded-lg">
              <div className="text-lg text-white ml-px leading-[1]">
                m.USDC / WETH
              </div>
              <div className="self-stretch flex flex-row mr-1 gap-1 items-center">
                <div className="text-sm text-blue-tiffany mr-1">
                  Rewards
                </div>
                <div className="whitespace-nowrap text-sm text-white">
                  2500
                </div>
                <Image alt="Metis token image" src={metisToken} width={25} height={25} />
                <div className="text-sm text-blue-tiffany ml-auto mr-1">
                  Fees <div className="text-xs contents">(24h)</div>
                </div>
                <div className="whitespace-nowrap text-sm text-white">
                  $300
                </div>
              </div>
            </div>
            <Image alt="Token image" src={usdcToken} width={38} height={38} className="w-[38px] h-[38px] absolute -top-[30px] left-[28px]"/>
            <Image alt="Token image" width={38} height={38} src={wethToken} className="w-[38px] h-[38px] absolute -top-[30px] left-[56px]"/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MonthlyRewards