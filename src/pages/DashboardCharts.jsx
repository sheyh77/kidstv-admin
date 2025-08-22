import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function DashboardChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Foydalanuvchilarni olish
        const foydalanuvchilarRes = await axios.get("https://ceed8a646c7fba8b.mokky.dev/foydalanuvchi");
        const multfilmlarRes = await axios.get("https://ceed8a646c7fba8b.mokky.dev/multcard");

        // Sana bo‘yicha guruhlash (misol uchun createdAt maydonidan foydalanamiz)
        const foydalanuvchilar = foydalanuvchilarRes.data.map(item => ({
          date: new Date(item.createdAt).toLocaleDateString("uz-UZ"), // sana format
          foydalanuvchi: 1,
        }));

        const multfilmlar = multfilmlarRes.data.map(item => ({
          date: new Date(item.createdAt).toLocaleDateString("uz-UZ"),
          multfilm: 1,
        }));

        // Sana bo‘yicha bitta massivga qo‘shib chiqamiz
        const allDates = [...foydalanuvchilar, ...multfilmlar];

        // Sana bo‘yicha yig‘ib olish
        const grouped = allDates.reduce((acc, item) => {
          const found = acc.find(d => d.date === item.date);
          if (found) {
            found.foydalanuvchi = (found.foydalanuvchi || 0) + (item.foydalanuvchi || 0);
            found.multfilm = (found.multfilm || 0) + (item.multfilm || 0);
          } else {
            acc.push({
              date: item.date,
              foydalanuvchi: item.foydalanuvchi || 0,
              multfilm: item.multfilm || 0
            });
          }
          return acc;
        }, []);

        setData(grouped);
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', height: 300, background: '#fff', borderRadius: '10px', padding: '15px' }}>
      <h3>Statistika</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="foydalanuvchi" stroke="#2196f3" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="multfilm" stroke="#4caf50" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardChart;