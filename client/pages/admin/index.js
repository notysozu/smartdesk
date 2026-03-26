import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faUsers, faBook, faCheck, faHome, faBookOpen, faCalendarAlt, faMoneyBillWave, faBuilding, faComments, faBullhorn, faCog, faBell, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export async function getServerSideProps(context) {
  try {
    const cookieHeader = context.req.headers.cookie || "";
    const [statsRes, userRes] = await Promise.all([
      fetch(`${API_BASE}/api/stats/comprehensive`, {
        headers: { cookie: cookieHeader },
        credentials: "include"
      }).then(r => r.json()).catch(() => ({ stats: {} })),
      fetch(`${API_BASE}/api/auth/me`, {
        headers: { cookie: cookieHeader },
        credentials: "include"
      }).then(r => r.json()).catch(() => ({ user: null }))
    ]);

    const user = userRes.user;
    // Check if user is authenticated and has admin role
    if (!user || user.role !== 'admin') {
      return { redirect: { destination: "/login", permanent: false } };
    }

    return { props: { stats: statsRes.stats || {}, user } };
  } catch {
    return { redirect: { destination: "/login", permanent: false } };
  }
}

export default function AdminDashboard({ stats, user }) {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);

  const handleLogout = async () => {
    await fetch(`${API_BASE}/logout`, { method: "GET", credentials: "include" });
    router.push("/login");
  };

  useEffect(() => {
    fetch(`${API_BASE}/api/notifications`, { credentials: "include" })
      .then(r => r.json())
      .then(data => setNotifications(data.notifications?.filter(n => !n.isRead) || []))
      .catch(() => {});
  }, []);

  const featureModules = [
    {
      id: "analytics",
      title: "Analytics",
      icon: faChartBar,
      color: "cyan",
      description: "Comprehensive analytics and insights",
      link: "/admin/analytics"
    },
    {
      id: "users",
      title: "User Management",
      icon: faUsers,
      color: "pink",
      description: "Manage users, roles, and permissions",
      link: "/admin/users"
    },
    {
      id: "academic",
      title: "Academic",
      icon: faBook,
      color: "green",
      description: "Departments, courses, enrollments",
      link: "/admin/academic"
    },
    {
      id: "attendance",
      title: "Attendance",
      icon: faCheck,
      color: "blue",
      description: "Track and manage attendance",
      link: "/admin/attendance"
    },
    {
      id: "hostel",
      title: "Hostel",
      icon: faHome,
      color: "purple",
      description: "Room allocation and management",
      link: "/admin/hostel"
    },
    {
      id: "library",
      title: "Library",
      icon: faBookOpen,
      color: "cyan",
      description: "Book management and issues",
      link: "/admin/library"
    },
    {
      id: "events",
      title: "Events",
      icon: faCalendarAlt,
      color: "pink",
      description: "Event creation and management",
      link: "/admin/events"
    },
    {
      id: "financial",
      title: "Financial",
      icon: faMoneyBillWave,
      color: "green",
      description: "Fees, payments, scholarships",
      link: "/admin/financial"
    },
    {
      id: "infrastructure",
      title: "Infrastructure",
      icon: faBuilding,
      color: "blue",
      description: "Buildings, rooms, facilities",
      link: "/admin/infrastructure"
    },
    {
      id: "topics",
      title: "Feedback Topics",
      icon: faComments,
      color: "purple",
      description: "Manage student feedback topics",
      link: "/admin/topics"
    },
    {
      id: "announcements",
      title: "Announcements",
      icon: faBullhorn,
      color: "cyan",
      description: "Create and manage announcements",
      link: "/admin/announcements"
    },
    {
      id: "config",
      title: "Configuration",
      icon: faCog,
      color: "pink",
      description: "System settings and configuration",
      link: "/admin/config"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      cyan: "border-border text-brand",
      pink: "border-border-strong text-brand-strong",
      green: "border-success text-success",
      blue: "border-brand text-brand",
      purple: "border-accent text-accent"
    };
    return colors[color] || colors.cyan;
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard - SmartDesk</title>
      </Head>
      <div className="min-h-screen bg-background relative">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-border z-40 p-5">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-primary">SmartDesk</h1>
            <p className="text-xs text-muted mt-1">Admin Control Center</p>
          </div>

          <nav className="space-y-1">
            <Link href="/admin" className="block px-3 py-2 rounded text-sm font-medium bg-brand/10 text-brand transition-all">
              <FontAwesomeIcon icon={faHome} className="mr-2 w-4 text-center" /> Dashboard
            </Link>
            {featureModules.map((module) => (
              <Link
                key={module.id}
                href={module.link}
                className={`block px-3 py-2 rounded text-sm font-medium text-secondary hover:bg-surface-muted hover:text-primary transition-all`}
              >
                <FontAwesomeIcon icon={module.icon} className="mr-2 w-4 text-center" /> {module.title}
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={handleLogout}
              className="w-full btn-neon btn-neon-danger text-sm py-2"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 p-8">
          {/* Header */}
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-1">Admin Dashboard</h1>
              <p className="text-sm text-muted">Welcome back, {user?.username || "Admin"}</p>
            </div>
            <div className="flex items-center gap-4">
              {notifications.length > 0 && (
                <div className="relative">
                  <FontAwesomeIcon icon={faBell} className="text-2xl" />
                  <span className="absolute -top-1 -right-1 bg-brand-strong text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                </div>
              )}
            </div>
          </header>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="futuristic-card">
              <div className="flex items-center justify-between mb-4">
                <FontAwesomeIcon icon={faUsers} className="text-3xl" />
                <span className="status-online"></span>
              </div>
              <div className="text-3xl font-bold text-brand mb-1">{stats.totalStudents || 0}</div>
              <div className="text-sm text-gray-400">Total Students</div>
            </div>
            <div className="futuristic-card">
              <div className="flex items-center justify-between mb-4">
                <FontAwesomeIcon icon={faBook} className="text-3xl" />
                <span className="status-online"></span>
              </div>
              <div className="text-3xl font-bold text-brand-strong mb-1">{stats.totalCourses || 0}</div>
              <div className="text-sm text-gray-400">Total Courses</div>
            </div>
            <div className="futuristic-card">
              <div className="flex items-center justify-between mb-4">
                <FontAwesomeIcon icon={faMoneyBillWave} className="text-3xl" />
                <span className="status-online"></span>
              </div>
              <div className="text-3xl font-bold text-success mb-1">{stats.pendingFees || 0}</div>
              <div className="text-sm text-gray-400">Pending Fees</div>
            </div>
            <div className="futuristic-card">
              <div className="flex items-center justify-between mb-4">
                <FontAwesomeIcon icon={faHome} className="text-3xl" />
                <span className="status-online"></span>
              </div>
              <div className="text-3xl font-bold text-accent mb-1">{stats.hostelOccupancy || 0}</div>
              <div className="text-sm text-gray-400">Hostel Occupancy</div>
            </div>
          </div>

          {/* Feature Modules Grid */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-4">Feature Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {featureModules.map((module) => (
                <Link
                  key={module.id}
                  href={module.link}
                  className={`futuristic-card flex flex-col justify-between hover-lift group ${getColorClasses(module.color)}`}
                >
                  <div>
                    <div className="text-2xl mb-3 group-hover:scale-105 transition-transform">
                      <FontAwesomeIcon icon={module.icon} />
                    </div>
                    <h3 className="text-lg font-bold mb-1 text-primary">{module.title}</h3>
                    <p className="text-sm text-secondary">{module.description}</p>
                  </div>
                  <div className="mt-4 text-xs font-medium text-brand opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                    Click to manage <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="futuristic-card">
            <h2 className="text-xl font-bold text-primary mb-4">System Overview</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-400 mb-2">Departments</div>
                <div className="text-2xl font-bold text-brand">{stats.totalDepartments || 0}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-2">Books</div>
                <div className="text-2xl font-bold text-brand-strong">{stats.totalBooks || 0}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-2">Upcoming Events</div>
                <div className="text-2xl font-bold text-success">{stats.totalEvents || 0}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
