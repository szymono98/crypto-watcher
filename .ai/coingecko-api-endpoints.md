# CoinGecko API – Endpoints dla top 100 kryptowalut

## Podstawowy endpoint do pobierania listy monet

```
GET https://api.coingecko.com/api/v3/coins/markets
```

### Najważniejsze parametry:

- `vs_currency` – waluta, w której chcesz otrzymać ceny (np. usd, eur, pln)
- `order` – sortowanie, np. `market_cap_desc`
- `per_page` – liczba wyników na stronę (max 250)
- `page` – numer strony
- `sparkline` – czy dołączyć dane do wykresu (true/false)
- `price_change_percentage` – okresy zmian procentowych (np. `24h,7d,30d`)

### Przykładowe zapytanie dla top 100:

```
GET https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h
```

### Przykładowa odpowiedź (fragment):

```
[
  {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "image": "https://...",
    "current_price": 63000,
    "market_cap": 1200000000000,
    "market_cap_rank": 1,
    "total_volume": 30000000000,
    "price_change_percentage_24h": 2.5,
    ...
  },
  ...
]
```

## Dokumentacja CoinGecko

- https://www.coingecko.com/api/documentation

## Najważniejsze pola do wyświetlenia w panelu:

- `name`, `symbol`, `image`
- `current_price`
- `market_cap`
- `total_volume`
- `price_change_percentage_24h`
- `market_cap_rank`

---

Ten endpoint pozwala pobrać wszystkie kluczowe dane do panelu rynkowego i przeglądarki monet. Jeśli chcesz pobrać szczegóły konkretnej monety, użyj:

```
GET https://api.coingecko.com/api/v3/coins/{id}
```

Przykład: `GET /api/v3/coins/bitcoin`
