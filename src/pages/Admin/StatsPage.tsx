import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import api from '../../lib/api'; 
import { BarChart3 } from 'lucide-react';


export default function StatsPage() {
  const [data, setData] = useState<StatsData>({
  pieChartData: [],
  lineChartData: [],
});
    const [loading, setLoading] = useState(true);

    const COLORS = ['#FBBF24', '#22C55E', '#EF4444'];
interface PieData {
  [key: string]: any; 
  name: string;
  value: number;
}

interface LineData {
  date: string;
  tasks: number;
}
interface LineChartApiItem {
  _id: string;          
  tasksAssigned: number; 
}

interface StatsData {
  pieChartData: PieData[];
  lineChartData: LineData[];
}

    useEffect(() => {
       const STATUS_ORDER = ["Pending", "Completed", "Not Submitted"];
        
        const fetchStats = async (isBackgroundUpdate = false) => {
        try {
            const response = await api.get('/admin/stats');
            const result = response.data; 

           
            const formattedPieData = STATUS_ORDER.map(statusName => {
                
                const found = (result.pieChartData || []).find(
                    (item: { name: string; value: number }) => item.name.toLowerCase() === statusName.toLowerCase()
                );
                
                return {
                    name: statusName,
                    value: found ? found.value : 0 
                };
            });
            
            

            const formattedLineData = (result.lineChartData || []).map((item: LineChartApiItem) => ({
                date: item._id, 
                tasks: item.tasksAssigned
            }));

            setData({ 
                pieChartData: formattedPieData, 
                lineChartData: formattedLineData 
            });

        } catch (error) {
            console.error("Error fetching stats:", error);
        } finally {
            if (!isBackgroundUpdate) {
                setLoading(false);
            }
        }
    };
        fetchStats();
        
      

        const intervalId = setInterval(() => {

            fetchStats(true); 
        }, 5000); 

        return () => clearInterval(intervalId);
    }, []);

const normalizedPieData = data.pieChartData.map(item => {
  if (item.name === "Overdue") {
    return { ...item, name: "Not Submitted" };
  }
  return item;
});


    if (loading) return <div className="p-10 text-center">Loading Analytics...</div>;

    return (
        <DashboardLayout>
        <div className="min-h-screen p-6 bg-gray-50">
            <div className="flex items-center gap-3 mb-2">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Analytics Arena</h1>
        </div>
     <p className="text-gray-500 mb-10">Visualize student performance and task trends at a glance.</p>
            <div className="grid grid-cols-1 gap-9 md:grid-cols-2">
                
                {/* --- PIE CHART SECTION --- */}
                <div className="bg-white  w-110 h-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-gradient-to-r rounded-2xl  from-blue-500 to-blue-600 p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                
                Task Status Distribution
              </h2>
            </div>
                    <div className="w-[99%] h-[300px]">
                        {data.pieChartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%" minWidth={100} debounce={200}>
                                <PieChart>
                                    <Pie
                                        data={normalizedPieData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                      label={({ name, percent = 0 }) =>
                                                 `${name} ${(percent * 100).toFixed(0)}%`
                                         }
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                         {normalizedPieData.map((entry, index) => (
                                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                       ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36}/>
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400 border-2 border-dashed rounded">
                                No Data Available
                            </div>
                        )}
                    </div>
                </div>

                {/* --- LINE CHART SECTION --- */}
                <div className="bg-white h-100  rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-gradient-to-r  rounded-2xl from-emerald-500 to-emerald-600 p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Workload Trends
              </h2>
            </div>
                    
                    {/*  Explicit pixel height and width 99% prevents overflow/calc errors */}
                    <div className="w-[99%] pt-6 h-75">
                        {data.lineChartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%" minWidth={100} debounce={200}>
                                <LineChart data={data.lineChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36}/>
                                    <Line 
                                        type="monotone" 
                                        dataKey="tasks" 
                                        stroke="#8884d8" 
                                        activeDot={{ r: 8 }} 
                                        name="Tasks Created"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400 border-2 border-dashed rounded">
                                No activity found
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </DashboardLayout>
    );
}