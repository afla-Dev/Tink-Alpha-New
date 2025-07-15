import {Link, useNavigate} from "react-router-dom";
import {
    Trophy,
    Users,
    Award,
    Home,
    ChevronRight,
    User,
    FileText,
    MessageSquare,
    LogOut,
    Bell,
    Search,
    Volume2,
    VolumeX,
    Bot,
    Target,
    HelpCircle,
    BookOpen,
    ShoppingCart
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell} from "recharts";
import Footer from "@/components/Footer";
import {useState} from "react";

const Dashboard = () => {
    const navigate = useNavigate();
    const [isSoundEnabled, setIsSoundEnabled] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userName = currentUser.userName || 'User'; // Fallback to 'User' if userName is not available
    const isTeacher = currentUser.role === 'TEACHER'; // Check if user is a teacher

    const toggleSound = () => {
        setIsSoundEnabled(!isSoundEnabled);
    };

    const studentProgress = [
        {activity: "Simple Electric Circuit", progress: 100, completed: true},
        {activity: "Building a Simple Motor", progress: 75, completed: false},
        {activity: "Traffic Light Automation", progress: 30, completed: false},
        {activity: "Building a Simple Robot", progress: 0, completed: false}
    ];

    const chartData = [
        {activity: "Activity 1", performance: 850, hours: 12},
        {activity: "Activity 2", performance: 750, hours: 8},
        {activity: "Activity 3", performance: 300, hours: 4},
        {activity: "Activity 4", performance: 0, hours: 0},
    ];

    const performanceData = [
        {name: "Completed", value: 25, color: "#22c55e"},
        {name: "In Progress", value: 50, color: "#3b82f6"},
        {name: "Not Started", value: 25, color: "#e5e7eb"}
    ];

    const sidebarItems = [
        {name: "Overview", icon: Home, active: true},
        {name: "Reports", icon: FileText, path: "/reports"},
        {name: "Inbox", icon: MessageSquare, path: "/inbox"},
        {name: "My Status", icon: User},
        {name: "Certificates", icon: Award, path: "/certificates"},
        {name: "Feedback", icon: MessageSquare},
        ...(isTeacher ? [{name: "Add New Activity", icon: MessageSquare, path: "/add-activity"}] : [])
    ];

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        sessionStorage.clear();
        navigate('/signin');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex flex-col">
            <div className="flex flex-1">
                {/* Sidebar */}
                <div className="w-80 bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400 p-6 flex flex-col">
                    {/* Profile Section */}
                    <div className="text-center mb-8">
                        <div
                            className="w-24 h-24 bg-pink-300 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white">
                            <img src="/lovable-uploads/00d4cb2f-56bd-4d1f-955b-70e4a28236e0.png" alt="Student"
                                 className="w-20 h-20 rounded-full object-cover"/>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Hello {userName}! 👋</h2>
                        <p className="text-sm text-gray-600">Let's check your progress</p>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="flex-1 space-y-2">
                        {sidebarItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path || "#"}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                    item.active
                                        ? 'bg-white text-gray-800 shadow-md'
                                        : 'text-gray-700 hover:bg-yellow-300'
                                }`}
                            >
                                <item.icon className="h-5 w-5"/>
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Logout Section */}
                    <div className="mt-10">
                        <div
                            className="w-20 h-20 bg-blue-300 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white">
                            <img src="/lovable-uploads/00d4cb2f-56bd-4d1f-955b-70e4a28236e0.png" alt="Student"
                                 className="w-20 h-20 rounded-full object-cover border-white"/>
                            <User className="w-12 h-12 text-blue-600"/>
                        </div>
                        <Button
                            onClick={handleLogout}
                            className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center"
                        >
                            <LogOut className="w-4 h-4 mr-2"/>
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                    {/* Top Navigation */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-6">
                            <Link to="/" className="group relative flex items-center space-x-2">
                                <Home className="h-5 w-5"/>
                                <span
                                    className="text-blue-600 hover:text-purple-600 font-bold text-lg transition-all duration-300 group-hover:scale-110">
                  Home
                </span>
                                <div
                                    className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
                            </Link>
                            <Link to="/subjects" className="group relative flex items-center space-x-2">
                                <BookOpen className="h-5 w-5"/>
                                <span
                                    className="text-blue-600 hover:text-purple-600 font-bold text-lg transition-all duration-300 group-hover:scale-110">
                  Subjects
                </span>
                            </Link>
                            <Link to="/activities" className="group relative flex items-center space-x-2">
                                <Target className="h-5 w-5"/>
                                <span
                                    className="text-blue-600 hover:text-purple-600 font-bold text-lg transition-all duration-300 group-hover:scale-110">
                  Activities
                </span>
                                <div
                                    className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
                            </Link>
                            <Link to="/dashboard" className="group relative flex items-center space-x-2">
                                <BookOpen className="h-5 w-5"/>
                                <span
                                    className="text-blue-600 hover:text-purple-600 font-bold text-lg transition-all duration-300 group-hover:scale-110">
                  Dashboard
                </span>
                                <div
                                    className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
                            </Link>
                            <Link to="/certificates" className="group relative flex items-center space-x-2">
                                <Award className="h-5 w-5"/>
                                <span
                                    className="text-blue-600 hover:text-purple-600 font-bold text-lg transition-all duration-300 group-hover:scale-110">
                  Certificates
                </span>
                                <div
                                    className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
                            </Link>
                            <Link to="/help" className="group relative flex items-center space-x-2">
                                <HelpCircle className="h-5 w-5"/>
                                <span
                                    className="text-blue-600 hover:text-purple-600 font-bold text-lg transition-all duration-300 group-hover:scale-110">
                  Help
                </span>
                                <div
                                    className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/cart">
                                <Button
                                    className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold">
                                    <ShoppingCart className="mr-1 h-4 w-4"/>
                                    Cart
                                </Button>
                            </Link>
                            <div className="relative">
                                <Bell className="w-6 h-6 text-blue-600 cursor-pointer hover:text-blue-800"/>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                            </div>
                            <div className="w-10 h-10 bg-pink-300 rounded-full flex items-center justify-center">
                                <img src="/lovable-uploads/00d4cb2f-56bd-4d1f-955b-70e4a28236e0.png" alt="Student"
                                     className="w-8 h-8 rounded-full object-cover"/>
                            </div>
                        </div>
                    </div>

                    {/* Welcome Card */}
                    <Card className="bg-gradient-to-r from-pink-100 to-pink-200 mb-8 border-pink-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-pink-800 mb-2">Check your child's
                                        progress</h3>
                                    <p className="text-pink-600">Welcome back! We're here to support your child on their
                                        learning journey. Check the classes and keep progressing towards your goals.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Activity Cards */}
                    <div className="grid md:grid-cols-4 gap-3 mb-8">
                        <Card className="bg-gradient-to-b from-blue-100 to-blue-200">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-blue-800">Circuit</div>
                                <div className="text-sm text-blue-600"> 💡 1h ⭐ 4★</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-b from-orange-100 to-orange-200">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-orange-800">Energy</div>
                                <div className="text-sm text-orange-600">⚡ 1h ⭐ 3★</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-b from-green-100 to-green-200">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-green-800">Traffic</div>
                                <div className="text-sm text-green-600">🚦 1h ⭐ 2★</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-b from-pink-100 to-pink-200">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-pink-800">Robot</div>
                                <div className="text-sm text-pink-600">🤖 1h ⭐ 2★</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts Section */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-8">
                        {/* Hours Spent Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-blue-800">Hours Spent</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        hours: {label: "Hours", color: "#3b82f6"},
                                    }}
                                    className="h-64"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData}>
                                            <XAxis dataKey="activity"/>
                                            <YAxis/>
                                            <ChartTooltip content={<ChartTooltipContent/>}/>
                                            <Bar dataKey="hours" fill="#3b82f6" radius={4}/>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        {/* Performance Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-blue-800">Performance</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-center h-64">
                                    <div className="relative">
                                        <ChartContainer
                                            config={{
                                                performance: {label: "Performance", color: "#10b981"},
                                            }}
                                            className="h-48 w-48"
                                        >
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={performanceData}
                                                        dataKey="value"
                                                        nameKey="name"
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={40}
                                                        outerRadius={80}
                                                    >
                                                        {performanceData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color}/>
                                                        ))}
                                                    </Pie>
                                                    <ChartTooltip content={<ChartTooltipContent/>}/>
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </ChartContainer>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-green-600">89.4%</div>
                                                <div className="text-sm text-gray-500">Your Score</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Performance Summary Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-blue-800">Total summary of Activity Performance</CardTitle>
                            <div className="flex space-x-2">
                                <Button size="sm" variant="outline">Daily</Button>
                                <Button size="sm" className="bg-purple-500 text-white">Weekly</Button>
                                <Button size="sm" variant="outline">Monthly</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{
                                    performance: {label: "Performance", color: "#8b5cf6"},
                                }}
                                className="h-80"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <XAxis dataKey="activity"/>
                                        <YAxis/>
                                        <ChartTooltip content={<ChartTooltipContent/>}/>
                                        <Bar dataKey="performance" fill="#8b5cf6" radius={4}/>
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    {/* Back to Home */}
                    <div className="text-center">
                        <Link to="/">
                            <Button
                                className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                <Home className="mr-3 h-5 w-5"/>
                                🏠 Back to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Dashboard;