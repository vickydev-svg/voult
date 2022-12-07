export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

  export const ChangingPrice = (currency) => `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
  // 24hr volume
  export const ChangingVolume = (id,currency) => `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=${currency}&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true&precision=3`

  export const Money = () => `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`

  export const Pools = () => `https://api.pecunovus.net/hootdex/all-project-token`
  export const MoreTokens = () => `https://api.pecunovus.net/wallet/get_all_tokens_wrap_new`
  export const FetchProject = () => `https://api.pecunovus.net/hootdex/all-project-token`