import axios from 'axios';

export default async function handler(req, res) {
  const { naira } = req.query;
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/NGN');
    const rate = response.data.rates.USD;
    const usd = (naira * rate).toFixed(2);
    res.status(200).json({ usd });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching conversion data' });
  }
}
