<template>
  <div>
    <div class="row">
      <div style="width: 600px; height: 400px;" class="col">
        <Doughnut :data="doughnutChartData" :options="doughnutChartOptions" />
      </div>
      <div style="width: 600px; height: 400px; margin-bottom: 40px;" class="col">
        <Bar :data="barChartData" :options="barChartOptions" />
      </div>
    </div>
    <div class="stats mt-6">
      <p><strong>Total Registered Users:</strong> {{ totalUsers }}</p>
      <p><strong>Active Requests:</strong> {{ activeRequests }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Bar, Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const users = [
  { id: 1, name: "User 1", active: true }, 
  { id: 2, name: "User 2", active: false },
  { id: 3, name: "User 3", active: true },
  { id: 4, name: "User 4", active: false },
  { id: 5, name: "User 5", active: true },
  { id: 6, name: "User 6", active: false },
  { id: 7, name: "User 7", active: true },
  { id: 8, name: "User 8", active: false },
  { id: 9, name: "User 9", active: true },
  { id: 10, name: "User 10", active: false },
];

const requests = [
  { id: 1, userId: 1, status: "active" },
  { id: 2, userId: 2, status: "inactive" },
  { id: 3, userId: 3, status: "active" },
  { id: 4, userId: 4, status: "inactive" },
  { id: 5, userId: 5, status: "active" },
  { id: 6, userId: 6, status: "inactive" },
  { id: 7, userId: 7, status: "active" },
  { id: 8, userId: 8, status: "inactive" },
  { id: 9, userId: 9, status: "active" },
  { id: 10, userId: 10, status: "inactive" },
];

const totalUsers = ref(users.length);
const activeRequests = ref(requests.filter(req => req.status === 'active').length);

const barChartData = ref({
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'User Growth',
      data: [10, 20, 30, 40, 50],
      backgroundColor: '#42A5F5',
      borderColor: '#1E88E5',
      borderWidth: 1,
    },
    {
      label: 'Active Users',
      data: calculateActiveUsers(),
      backgroundColor: '#32CD32',
      borderColor: '#32CD32',
      borderWidth: 1,
    },
    {
      label: 'Inactive Users',
      data: calculateInactiveUsers(),
      backgroundColor: '#FF6347',
      borderColor: '#FF6347',
      borderWidth: 1,
    },
  ],
});

const barChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
  },
});

const doughnutChartData = ref({
  labels: ['Active Users', 'Inactive Users'],
  datasets: [
    {
      data: [100, 50],
      backgroundColor: ['#32CD32', '#FF6347'],
      hoverOffset: 4,
    },
  ],
});

const doughnutChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
  },
});

function calculateActiveUsers() {
  const activeUsersByMonth = [0, 0, 0, 0, 0];
  users.forEach((user, index) => {
    const month = index % 5;
    if (user.active) {
      activeUsersByMonth[month] += 1;
    }
  });
  return activeUsersByMonth;
}

function calculateInactiveUsers() {
  const inactiveUsersByMonth = [0, 0, 0, 0, 0];
  users.forEach((user, index) => {
    const month = index % 5;
    if (!user.active) {
      inactiveUsersByMonth[month] += 1;
    }
  });
  return inactiveUsersByMonth;
}

onMounted(() => {
  updateChartsData();
});

function updateChartsData() {
  const activeUserCount = users.filter(user => user.active).length;
  const inactiveUserCount = users.filter(user => !user.active).length;
  doughnutChartData.value.datasets[0].data = [activeUserCount, inactiveUserCount];

  barChartData.value.datasets[1].data = calculateActiveUsers();
  barChartData.value.datasets[2].data = calculateInactiveUsers();
}
</script>

<style scoped>
</style>
