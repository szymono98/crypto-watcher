import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://api.coingecko.com/api/v3/coins/markets";

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
}

interface UseTopCoinsOptions {
  page?: number;
  perPage?: number;
  vsCurrency?: string;
}

const fetchCoins = async ({
  page = 1,
  perPage = 20,
  vsCurrency = "usd",
}: UseTopCoinsOptions) => {
  const params = new URLSearchParams({
    vs_currency: vsCurrency,
    order: "market_cap_desc",
    per_page: perPage.toString(),
    page: page.toString(),
    sparkline: "false",
    price_change_percentage: "24h",
  });
  const res = await fetch(`${BASE_URL}?${params}`);
  if (!res.ok) throw new Error("Failed to fetch coins");
  return res.json();
};

export function useTopCoins(options: UseTopCoinsOptions = {}) {
  const { page = 1, perPage = 20, vsCurrency = "usd" } = options;
  const query = useQuery<Coin[], Error>({
    queryKey: ["topCoins", page, perPage, vsCurrency],
    queryFn: () => fetchCoins({ page, perPage, vsCurrency }),
    refetchInterval: 60000,
    gcTime: 5 * 60 * 1000,
  });
  return {
    coins: query.data,
    ...query,
  };
}

// ---
// Różnice SWR vs React Query:
// - SWR jest prostszy, idealny do prostych fetchy i odświeżania danych (np. panel rynkowy)
// - React Query daje więcej możliwości (mutacje, cache, paginacja, retry, obsługa błędów, optimistic updates)
// - Do paginacji, infinite scroll i rozbudowanych interakcji (np. edycja portfela) lepiej sprawdzi się React Query
