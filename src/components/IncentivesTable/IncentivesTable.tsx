// @ts-nocheck
import { TICK_WIDTH, YEAR } from "@/config/constants/const";
import { IIncentive } from "@/types";
import { formatBigInt, formatDateTime, formatUSD } from "@/utils";
import Link from "next/link";
import { Button } from "../Button";
import { Table } from "../Table";
import Image from "next/image";
import usdc from "../../../public/tokens/usdc.svg";
import eth from "../../../public/tokens/eth.svg";

interface IProps {
  data?: IIncentive[];
}

const columns = [
  {
    Header: () => {
      return <p className="text-md text-white text-left">Pool</p>;
    },
    accessor: "pool",
    Cell: ({ value: pool, row: { original } }) => (
      <Link href={`/${original.id}`} className="flex flex-row gap-6 w-full items-center">
        <div className="relative flex flex-col w-12 shrink-0 items-start">
          <Image src={usdc} alt="Token icon" width={30} height={30} className="w-8 h-8 z-10" />
          <Image src={eth} alt="Token icon" width={30} height={30} className="w-8 h-8 absolute top-0 left-6" />
        </div>
        <p className="text-md">
          {pool.token0.symbol} / {pool.token1.symbol}
        </p>
      </Link>
    ),
  },
  // {
  //   Header: "Duration",
  //   accessor: "duration",
  //   Cell: ({ row: { original: row } }) => (
  //     <>
  //       <p>{formatDateTime(row.startTime * 1000)}</p>
  //       <p>{formatDateTime(row.endTime * 1000)}</p>
  //     </>
  //   ),
  // },
  {
    Header: "Min. range",
    accessor: "minWidth",
    Cell: ({ row: { original: row } }) => (
      <div className="text-center">
        <p className="text-md">±{row.minWidth * TICK_WIDTH}%</p>
        <p className="text-md">
          {row.minWidth} {row.minWidth == 1 ? "Tick" : "Ticks"}
        </p>
      </div>
    ),
  },
  {
    Header: "TVL",
    accessor: "tvl",
    Cell: ({ row: { original: row } }) => <p className="text-center text-md">{formatUSD(row.pool.totalValueLockedUSD)}</p>,
  },
  // {
  //   Header: "Total Rewards And Fees",
  //   accessor: "totalRewards",
  //   Cell: ({ row: { original: row } }) => (
  //     <>
  //       <p>
  //         {formatBigInt(row.reward, {
  //           decimals: row.rewardToken.decimals,
  //           precision: 2,
  //         })}{" "}
  //         {row.rewardToken.symbol}
  //       </p>
  //       <p>{formatUSD(row.poolDayData.feesUSD * 0.9)} fees previous 24H</p>
  //     </>
  //   ),
  // },
  {
    Header: "Reward APR",
    accessor: "rewardapr",
    Cell: ({ row: { original: row } }) => (
      <>
        <p className="text-center text-md">
          {(row.tokenPriceUSD > 0 &&
            row.fullRangeLiquidityUSD > 0 &&
            (
              ((formatBigInt(row.reward) * row.tokenPriceUSD) /
                row.fullRangeLiquidityUSD) *
              (YEAR / (row.endTime - row.startTime)) *
              100
            ).toFixed(2)) ||
            0}
          % -{" "}
          {(row.tokenPriceUSD > 0 &&
            row.activeLiqudityUSD > 0 &&
            (
              ((formatBigInt(row.reward) * row.tokenPriceUSD) /
                row.activeLiqudityUSD) *
              (YEAR / (row.endTime - row.startTime)) *
              100
            ).toFixed(2)) ||
            0}
          %
        </p>
      </>
    ),
  },
  {
    Header: "Fee APR",
    accessor: "feeapr",
    Cell: ({ row: { original: row } }) => (
      <>
        <p className="text-center text-md">
          {(row.poolDayData.feesUSD > 0 &&
            row.fullRangeLiquidityUSD > 0 &&
            (
              ((row.poolDayData.feesUSD * 0.9 * 365) /
                row.fullRangeLiquidityUSD) *
              100
            ).toFixed(2)) ||
            0}
          % -{" "}
          {(row.poolDayData.feesUSD > 0 &&
            row.activeLiqudityUSD > 0 &&
            (
              ((row.poolDayData.feesUSD * 0.9 * 365) / row.activeLiqudityUSD) *
              100
            ).toFixed(2)) ||
            0}
          %
        </p>
      </>
    ),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row: { original: row } }) => {
      const now = Date.now();
      if (now < row.startTime * 1000) {
        return <p className="text-center text-md">Upcoming</p>;
      }
      if (now > row.endTime * 1000) {
        return <p className="text-center text-md">Ended</p>;
      }
      return <p className="text-center text-md">Active</p>;
    },
  },
  {
    Header: "",
    accessor: "link",
    Cell: ({ row: { original } }) => (
      <Link href={`/${original.id}`}>
        <Button>Stake</Button>
      </Link>
    ),
  },
];

export const IncentivesTable: React.FC<IProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 justify-center text-white w-full">
      <h5 className="text-2xl text-white text-left">Incentives</h5>
      <Table columns={columns} data={data || []} />
    </div>
  );
};

export default IncentivesTable;
