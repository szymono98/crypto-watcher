"use client";

import { useInfiniteCoins } from "@/lib/useTopCoins";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { formatNumber, formatPrice } from "@/lib/formatters";
import { Loader2 } from "lucide-react";

export function CoinsTable() {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const {
    coins,
    isLoading,
    isError,
    isRateLimit,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteCoins();

  useEffect(() => {
    if (!hasNextPage || isLoading || isFetching) return;
    const observer = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });
    const ref = loaderRef.current;
    if (ref) observer.observe(ref);
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [hasNextPage, isLoading, isFetching, fetchNextPage]);

  return (
    <div>
      <Card className="overflow-x-auto bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-black/30 shadow-xl rounded-2xl p-0.5 sm:p-2 md:p-4">
        <table
          className="w-full text-xs sm:text-sm"
          style={{ minWidth: "260px" }}
        >
          <thead>
            <tr>
              <th className="px-0.5 sm:px-2 md:px-3 py-1 sm:py-2 text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 w-5 sm:w-10 md:w-12">
                #
              </th>
              <th className="px-0.5 sm:px-2 md:px-3 py-1 sm:py-2 text-left font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 w-20 sm:w-auto">
                Coin
              </th>
              <th className="px-0.5 sm:px-2 md:px-3 py-1 sm:py-2 text-right font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 w-12 sm:w-20 md:w-24">
                Price
              </th>
              <th className="px-0.5 sm:px-2 md:px-3 py-1 sm:py-2 text-right font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 w-8 sm:w-16 md:w-20">
                24h %
              </th>
              <th className="hidden md:table-cell px-2 md:px-3 py-2 text-right font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 w-16 md:w-20">
                1M %
              </th>
              <th className="hidden lg:table-cell px-2 md:px-3 py-2 text-right font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 w-20 md:w-24">
                24h Volume
              </th>
              <th className="hidden lg:table-cell px-2 md:px-3 py-2 text-right font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 w-20 md:w-24">
                Market Cap
              </th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr
                key={coin.id}
                className="hover:bg-black/5 dark:hover:bg-black/40 transition-colors duration-200 animate-fade-in"
              >
                <td className="px-0.5 sm:px-2 md:px-3 py-1 sm:py-2 font-semibold text-center text-xs sm:text-sm">
                  {coin.market_cap_rank}
                </td>
                <td className="px-0.5 sm:px-2 md:px-3 py-1 sm:py-2">
                  <div className="flex items-center gap-0.5 sm:gap-2">
                    <span className="w-3 h-3 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full overflow-hidden shadow-md bg-white/60 dark:bg-black/60 flex items-center justify-center flex-shrink-0">
                      <Image
                        src={coin.image}
                        alt={coin.symbol}
                        width={12}
                        height={12}
                        className="sm:w-6 sm:h-6 md:w-7 md:h-7"
                      />
                    </span>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <div className="font-semibold truncate text-xs sm:text-sm max-w-16 sm:max-w-none">
                        <span className="sm:hidden">
                          {coin.symbol.toUpperCase()}
                        </span>
                        <span className="hidden sm:inline">{coin.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground uppercase opacity-60 hidden md:block">
                        {coin.symbol}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-0.5 sm:px-2 md:px-3 py-1 sm:py-2 text-right">
                  <span className="bg-white/20 dark:bg-black/20 px-0.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs sm:text-sm whitespace-nowrap">
                    ${formatPrice(coin.current_price)}
                  </span>
                </td>
                <td
                  className={`px-0.5 sm:px-2 md:px-3 py-1 sm:py-2 text-right text-xs sm:text-sm whitespace-nowrap ${
                    coin.price_change_percentage_24h > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h !== undefined
                    ? (coin.price_change_percentage_24h >= 0 ? "+" : "") +
                      coin.price_change_percentage_24h.toFixed(1) +
                      "%"
                    : "-"}
                </td>
                <td
                  className={`hidden md:table-cell px-2 md:px-3 py-2 text-right text-xs sm:text-sm ${
                    coin.price_change_percentage_30d_in_currency > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_30d_in_currency !== undefined
                    ? coin.price_change_percentage_30d_in_currency.toFixed(2) +
                      "%"
                    : "-"}
                </td>
                <td className="hidden lg:table-cell px-2 md:px-3 py-2 text-right">
                  <span className="bg-white/20 dark:bg-black/20 px-1 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs sm:text-sm">
                    ${formatNumber(coin.total_volume)}
                  </span>
                </td>
                <td className="hidden lg:table-cell px-2 md:px-3 py-2 text-right">
                  <span className="bg-white/20 dark:bg-black/20 px-1 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs sm:text-sm">
                    ${formatNumber(coin.market_cap)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(isLoading || isFetching) && hasNextPage && (
          <div className="flex justify-center p-4">
            <div className="bg-white/40 dark:bg-black/40 backdrop-blur-sm rounded-full p-2 animate-fade-in">
              <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
            </div>
          </div>
        )}
        {isRateLimit && (
          <div className="text-red-600 font-semibold p-4">
            API rate limit exceeded. Please try again later.
          </div>
        )}
        {isError && !isRateLimit && (
          <div className="text-red-600 font-semibold p-4">
            Error while fetching data.
          </div>
        )}
        <div ref={loaderRef} style={{ height: 1 }} />
      </Card>
    </div>
  );
}
