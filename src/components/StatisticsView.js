import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

export default function StatisticsView({ key, title, data }) {

  ChartJS.register(ArcElement, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins:{
      legend:{
        position: 'right',
        align: 'center',
        display: true,
        labels:{
          usePointStyle: true,
          pointStyle: 'circle',
          padding:20,
          textAlign: 'center',
        }
      }
    }
  }

  return (
    <div key={key}>
      <h3 className="text-center font-medium py-2 capitalize">{title} Statistics</h3>
      <Pie data={data} height={200} width={200} options={options}/>
    </div>
  );
}
