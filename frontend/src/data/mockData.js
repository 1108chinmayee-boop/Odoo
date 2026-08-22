export const dashboardStats = {
  employees: {
    title: "Total Employees",
    value: "124",
    subtitle: "Active employees",
    trend: "+8%",
  },

  presentToday: {
    title: "Present Today",
    value: "112",
    subtitle: "Out of 124 employees",
    trend: "+4%",
  },

  pendingLeaves: {
    title: "Pending Leaves",
    value: "8",
    subtitle: "Awaiting approval",
    trend: "-2%",
  },

  attendance: {
    title: "Attendance Rate",
    value: "92%",
    subtitle: "This month",
    trend: "+3%",
  },
};


/* -------------------------------- */
/* Attendance Analytics             */
/* -------------------------------- */

export const attendanceData = [
  {
    day: "Mon",
    present: 108,
    absent: 8,
    leave: 8,
  },
  {
    day: "Tue",
    present: 114,
    absent: 5,
    leave: 5,
  },
  {
    day: "Wed",
    present: 110,
    absent: 7,
    leave: 7,
  },
  {
    day: "Thu",
    present: 116,
    absent: 4,
    leave: 4,
  },
  {
    day: "Fri",
    present: 112,
    absent: 6,
    leave: 6,
  },
];


/* -------------------------------- */
/* Leave Requests                   */
/* -------------------------------- */

export const leaveRequests = [
  {
    id: 1,
    employee: "Abdul Razakh",
    department: "Engineering",
    type: "Sick Leave",
    dates: "Aug 25 - Aug 26",
    status: "Pending",
    avatar: "AR",
  },

  {
    id: 2,
    employee: "Sara Khan",
    department: "HR",
    type: "Paid Leave",
    dates: "Aug 27 - Aug 29",
    status: "Pending",
    avatar: "SK",
  },

  {
    id: 3,
    employee: "Rahul Kumar",
    department: "Engineering",
    type: "Unpaid Leave",
    dates: "Aug 28",
    status: "Pending",
    avatar: "RK",
  },

  {
    id: 4,
    employee: "Priya Sharma",
    department: "Finance",
    type: "Paid Leave",
    dates: "Sep 01 - Sep 02",
    status: "Pending",
    avatar: "PS",
  },
];


/* -------------------------------- */
/* Recent Attendance                */
/* -------------------------------- */

export const recentAttendance = [
  {
    employee: "Abdul Razakh",
    department: "Engineering",
    time: "09:02 AM",
    status: "Present",
    avatar: "AR",
  },

  {
    employee: "Sara Khan",
    department: "HR",
    time: "08:57 AM",
    status: "Present",
    avatar: "SK",
  },

  {
    employee: "Rahul Kumar",
    department: "Engineering",
    time: "10:21 AM",
    status: "Half Day",
    avatar: "RK",
  },

  {
    employee: "Priya Sharma",
    department: "Finance",
    time: "09:14 AM",
    status: "Present",
    avatar: "PS",
  },
];


/* -------------------------------- */
/* Workforce Health                 */
/* -------------------------------- */

export const workforceHealth = {
  score: 87,
  attendance: 92,
  leaveTrend: 84,
  activity: 85,
};


/* -------------------------------- */
/* Workforce Intelligence           */
/* -------------------------------- */

export const workforceInsight = {
  title: "Attendance Insight",

  message:
    "Engineering attendance has decreased this month.",

  action:
    "Review recurring absence patterns.",

  severity: "medium",

  department: "Engineering",

  confidence: 87,
};


/* -------------------------------- */
/* Department Analytics             */
/* -------------------------------- */

export const departmentAnalytics = [
  {
    department: "Engineering",
    employees: 52,
    attendance: 89,
    productivity: 86,
    leaveRate: 11,
    risk: "Medium",
  },

  {
    department: "HR",
    employees: 18,
    attendance: 96,
    productivity: 94,
    leaveRate: 5,
    risk: "Low",
  },

  {
    department: "Finance",
    employees: 24,
    attendance: 94,
    productivity: 91,
    leaveRate: 6,
    risk: "Low",
  },

  {
    department: "Marketing",
    employees: 16,
    attendance: 91,
    productivity: 88,
    leaveRate: 8,
    risk: "Low",
  },

  {
    department: "Operations",
    employees: 14,
    attendance: 87,
    productivity: 82,
    leaveRate: 13,
    risk: "High",
  },
];


/* -------------------------------- */
/* Employee Risk Indicators         */
/* -------------------------------- */

export const employeeRisk = [
  {
    employee: "Rahul Kumar",
    department: "Engineering",
    attendance: 78,
    leaveDays: 5,
    lateDays: 4,
    risk: "High",
    reason: "Frequent late arrivals and absences",
  },

  {
    employee: "Arjun Mehta",
    department: "Operations",
    attendance: 82,
    leaveDays: 4,
    lateDays: 3,
    risk: "Medium",
    reason: "Attendance below department average",
  },

  {
    employee: "Sara Khan",
    department: "HR",
    attendance: 97,
    leaveDays: 1,
    lateDays: 0,
    risk: "Low",
    reason: "Consistent attendance",
  },
];


/* -------------------------------- */
/* HR Recommendations               */
/* -------------------------------- */

export const hrRecommendations = [
  {
    id: 1,

    title: "Review Engineering Attendance",

    description:
      "Engineering attendance is below the organization average.",

    action:
      "Analyze recurring absence patterns.",

    priority: "High",
  },

  {
    id: 2,

    title: "Monitor Operations",

    description:
      "Operations has the highest leave rate among departments.",

    action:
      "Review workload and employee availability.",

    priority: "Medium",
  },

  {
    id: 3,

    title: "Recognize Consistent Attendance",

    description:
      "Several employees maintain consistently high attendance.",

    action:
      "Consider recognition or employee appreciation.",

    priority: "Low",
  },
];


/* -------------------------------- */
/* Notifications                    */
/* -------------------------------- */

export const notifications = [
  {
    id: 1,
    title: "New leave request",
    message:
      "Abdul Razakh submitted a sick leave request.",
    time: "10 min ago",
    unread: true,
  },

  {
    id: 2,
    title: "Attendance alert",
    message:
      "3 employees have not checked in today.",
    time: "32 min ago",
    unread: true,
  },

  {
    id: 3,
    title: "Payroll updated",
    message:
      "Salary information was updated successfully.",
    time: "1 hour ago",
    unread: false,
  },

  {
    id: 4,
    title: "Workforce insight",
    message:
      "Engineering attendance is below the organization average.",
    time: "2 hours ago",
    unread: false,
  },

  {
    id: 5,
    title: "Risk detected",
    message:
      "Operations has a higher-than-normal leave rate.",
    time: "3 hours ago",
    unread: false,
  },
];