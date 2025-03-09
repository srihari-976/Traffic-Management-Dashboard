// SIDEBAR TOGGLE AND NAVIGATION

let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');
const mainContainer = document.querySelector('.main-container');

// Store section content
const sectionContent = {
  dashboard: null, // Will be populated with initial dashboard content
  'control-centres': `
    <div class="main-title">
      <div class="title-section">
        <h2>Control Centres</h2>
        <p>Manage and monitor traffic control centers</p>
      </div>
    </div>
    <div class="control-centres-grid">
      <div class="control-centre-card">
        <h3>Main Control Room</h3>
        <p>Status: <span class="status-active">Active</span></p>
        <div class="centre-stats">
          <div class="stat-item">
            <span class="label">Operators</span>
            <span class="value">12</span>
          </div>
          <div class="stat-item">
            <span class="label">Signals</span>
            <span class="value">48</span>
          </div>
          <div class="stat-item">
            <span class="label">Cameras</span>
            <span class="value">124</span>
          </div>
        </div>
      </div>
      <div class="control-centre-card">
        <h3>Emergency Response Center</h3>
        <p>Status: <span class="status-active">Active</span></p>
        <div class="centre-stats">
          <div class="stat-item">
            <span class="label">Teams</span>
            <span class="value">8</span>
          </div>
          <div class="stat-item">
            <span class="label">Vehicles</span>
            <span class="value">16</span>
          </div>
          <div class="stat-item">
            <span class="label">Response Time</span>
            <span class="value">4.2m</span>
          </div>
        </div>
      </div>
    </div>
  `,
  categories: `
    <div class="main-title">
      <div class="title-section">
        <h2>Traffic Categories</h2>
        <p>Analysis by vehicle type and time</p>
      </div>
    </div>
    <div class="categories-grid">
      <div class="category-card">
        <h3>Vehicle Types</h3>
        <div id="vehicle-types-chart"></div>
      </div>
      <div class="category-card">
        <h3>Peak Hours</h3>
        <div id="peak-hours-chart"></div>
      </div>
    </div>
  `,
  junctions: `
    <div class="main-title">
      <div class="title-section">
        <h2>Traffic Junctions</h2>
        <p>Junction status and controls</p>
      </div>
    </div>
    <div class="junctions-grid">
      <div class="junction-card">
        <h3>Jalahalli Cross</h3>
        <div class="junction-status">Active</div>
        <div class="junction-controls">
          <button class="btn">View Details</button>
          <button class="btn">Configure</button>
        </div>
      </div>
      <div class="junction-card">
        <h3>Peenya Junction</h3>
        <div class="junction-status">Active</div>
        <div class="junction-controls">
          <button class="btn">View Details</button>
          <button class="btn">Configure</button>
        </div>
      </div>
    </div>
  `,
  inventory: `
    <div class="main-title">
      <div class="title-section">
        <h2>Equipment Inventory</h2>
        <p>Track and manage traffic equipment</p>
      </div>
    </div>
    <div class="inventory-grid">
      <div class="inventory-card">
        <h3>Traffic Signals</h3>
        <div class="inventory-stats">
          <div class="stat">
            <span class="label">Total Units</span>
            <span class="value">248</span>
          </div>
          <div class="stat">
            <span class="label">Active</span>
            <span class="value">236</span>
          </div>
          <div class="stat">
            <span class="label">Maintenance</span>
            <span class="value">12</span>
          </div>
        </div>
      </div>
      <div class="inventory-card">
        <h3>Cameras</h3>
        <div class="inventory-stats">
          <div class="stat">
            <span class="label">Total Units</span>
            <span class="value">186</span>
          </div>
          <div class="stat">
            <span class="label">Active</span>
            <span class="value">178</span>
          </div>
          <div class="stat">
            <span class="label">Maintenance</span>
            <span class="value">8</span>
          </div>
        </div>
      </div>
    </div>
  `,
  reports: `
    <div class="main-title">
      <div class="title-section">
        <h2>Traffic Reports</h2>
        <p>Analytics and insights</p>
      </div>
    </div>
    <div class="reports-grid">
      <div class="report-card">
        <h3>Daily Summary</h3>
        <div class="report-actions">
          <button class="btn">View Report</button>
          <button class="btn">Download PDF</button>
        </div>
      </div>
      <div class="report-card">
        <h3>Weekly Analysis</h3>
        <div class="report-actions">
          <button class="btn">View Report</button>
          <button class="btn">Download PDF</button>
        </div>
      </div>
    </div>
  `,
  settings: `
    <div class="main-title">
      <div class="title-section">
        <h2>System Settings</h2>
        <p>Configure system parameters</p>
      </div>
    </div>
    <div class="settings-grid">
      <div class="settings-card">
        <h3>General Settings</h3>
        <div class="settings-form">
          <div class="form-group">
            <label>System Theme</label>
            <select class="form-control">
              <option>Light</option>
              <option>Dark</option>
              <option>Auto</option>
            </select>
          </div>
          <div class="form-group">
            <label>Refresh Rate</label>
            <select class="form-control">
              <option>5 seconds</option>
              <option>10 seconds</option>
              <option>30 seconds</option>
            </select>
          </div>
          <button class="btn">Save Changes</button>
        </div>
      </div>
      <div class="settings-card">
        <h3>Notification Settings</h3>
        <div class="settings-form">
          <div class="form-group">
            <label>Email Alerts</label>
            <input type="checkbox" checked>
          </div>
          <div class="form-group">
            <label>SMS Alerts</label>
            <input type="checkbox" checked>
          </div>
          <button class="btn">Update Preferences</button>
        </div>
      </div>
    </div>
  `
};

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}

// Real-time clock update
function updateDateTime() {
  const now = new Date();
  
  // Update time
  const timeElement = document.getElementById('current-time');
  timeElement.textContent = now.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  // Update date
  const dateElement = document.getElementById('current-date');
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  dateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Initialize charts
function initializeCharts() {
  // Area Chart
  const areaChart = new ApexCharts(
    document.querySelector("#area-chart"),
    areaChartOptions
  );
  areaChart.render();

  // Bar Chart
  const barChart = new ApexCharts(
    document.querySelector("#bar-chart"),
    barChartOptions
  );
  barChart.render();
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
  // Store the original dashboard content
  sectionContent.dashboard = mainContainer.innerHTML;

  // Initialize real-time clock
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // Initialize charts
  initializeCharts();

  // Initialize traffic light system
  initializeTrafficLightSystem();
  startAutoMode();

  // Initialize chart period selections
  initializeChartPeriodSelections();

  // Add click handlers to sidebar items
  document.querySelectorAll('.sidebar-list-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all items
      document.querySelectorAll('.sidebar-list-item').forEach(i => {
        i.classList.remove('active');
      });
      
      // Add active class to clicked item
      this.classList.add('active');
      
      // Get the section id from the href
      const sectionId = this.querySelector('a').getAttribute('href').substring(1);
      
      // Clear any existing intervals
      if (window.autoInterval) {
        clearInterval(window.autoInterval);
      }

      // Update main container content
      if (sectionId === 'dashboard') {
        // Force reload dashboard content
        mainContainer.innerHTML = sectionContent.dashboard;
        
        // Reinitialize dashboard components
        initializeCharts();
        initializeTrafficLightSystem();
        startAutoMode();
        initializeChartPeriodSelections();
        
        // Restart real-time clock
        updateDateTime();
      } else if (sectionContent[sectionId]) {
        mainContainer.innerHTML = sectionContent[sectionId];
        
        // Initialize specific section features
        if (sectionId === 'categories') {
          initializeCategoryCharts();
        }
      }
      
      // Close sidebar on mobile
      if (window.innerWidth <= 992) {
        closeSidebar();
      }
    });
  });
});

// ---------- CHARTS ----------

// BAR CHART
const barChartOptions = {
  series: [{
    name: 'Vehicle Count',
    data: [850, 420, 780, 240],
    color: '#4361ee'
  }],
  chart: {
    type: 'bar',
    background: 'transparent',
    height: 350,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: '40%',
      distributed: false
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val + ' vehicles';
    },
    style: {
      fontSize: '12px'
    }
  },
  grid: {
    borderColor: '#e2e8f0',
    strokeDashArray: 4
  },
  xaxis: {
    categories: ['Morning Peak', 'Afternoon', 'Evening Peak', 'Night'],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    title: {
      text: 'Vehicle Count',
      style: {
        fontSize: '14px',
        fontWeight: 500
      }
    },
    labels: {
      style: {
        colors: '#64748b'
      },
      formatter: function (val) {
        return Math.round(val);
      }
    }
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + ' vehicles';
      }
    }
  }
};

// AREA CHART
const areaChartOptions = {
  series: [{
    name: 'North-South Traffic',
    data: [3100, 3400, 3200, 3600, 3800, 4100],
    color: '#4361ee'
  }, {
    name: 'East-West Traffic',
    data: [2800, 3000, 2900, 3200, 3400, 3600],
    color: '#7209b7'
  }],
  chart: {
    type: 'area',
    background: 'transparent',
    height: 350,
    stacked: false,
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  fill: {
    type: 'gradient',
    gradient: {
      opacityFrom: 0.4,
      opacityTo: 0.1,
      shadeIntensity: 1,
      stops: [0, 100]
    }
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    title: {
      text: 'Vehicle Count',
      style: {
        fontSize: '14px',
        fontWeight: 500
      }
    },
    labels: {
      style: {
        colors: '#64748b'
      },
      formatter: function (val) {
        return Math.round(val);
      }
    }
  },
  grid: {
    borderColor: '#e2e8f0',
    strokeDashArray: 4
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right'
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + ' vehicles';
      }
    }
  }
};

// Initialize traffic light system
function initializeTrafficLightSystem() {
  const trafficLightControls = document.querySelector('.traffic-status-card .chart-actions');
  const trafficLights = document.querySelectorAll('.traffic-light .sig');
  const countdownDisplay = document.querySelector('#countdown');
  const lightStatusDisplay = document.querySelector('#light-status');

  if (!trafficLightControls || !trafficLights.length || !countdownDisplay || !lightStatusDisplay) {
    return;
  }

  window.currentLightIndex = 0;
  const trafficLightSequence = ['red', 'green', 'yellow'];

  function updateTrafficLight(index) {
    trafficLights.forEach(light => light.classList.remove('active'));
    trafficLights[index].classList.add('active');
    lightStatusDisplay.textContent = trafficLightSequence[index].charAt(0).toUpperCase() + 
      trafficLightSequence[index].slice(1);
  }

  // Initialize traffic light controls
  trafficLightControls.querySelectorAll('.chart-period').forEach(mode => {
    mode.addEventListener('click', function() {
      const selectedMode = this.textContent.toLowerCase();
      
      trafficLightControls.querySelectorAll('.chart-period').forEach(m => {
        m.classList.remove('active');
      });
      this.classList.add('active');

      if (selectedMode === 'auto') {
        startAutoMode();
        trafficLights.forEach(light => {
          light.style.cursor = 'default';
          light.onclick = null;
        });
      } else {
        if (window.autoInterval) {
          clearInterval(window.autoInterval);
        }
        countdownDisplay.textContent = '--';
        
        trafficLights.forEach((light, index) => {
          light.style.cursor = 'pointer';
          light.onclick = () => {
            window.currentLightIndex = index;
            updateTrafficLight(index);
          };
        });
      }
    });
  });

  // Start in auto mode
  startAutoMode();
}

// Function to start auto mode for traffic lights
function startAutoMode() {
  let timeLeft = 30;
  
  if (window.autoInterval) {
    clearInterval(window.autoInterval);
  }
  
  const countdownDisplay = document.querySelector('#countdown');
  const trafficLights = document.querySelectorAll('.traffic-light .sig');
  const lightStatusDisplay = document.querySelector('#light-status');
  const trafficLightSequence = ['red', 'green', 'yellow'];
  
  if (!countdownDisplay || !trafficLights.length || !lightStatusDisplay) return;
  
  function updateTrafficLight(index) {
    trafficLights.forEach(light => light.classList.remove('active'));
    trafficLights[index].classList.add('active');
    lightStatusDisplay.textContent = trafficLightSequence[index].charAt(0).toUpperCase() + 
      trafficLightSequence[index].slice(1);
  }
  
  // Update initial state
  updateTrafficLight(window.currentLightIndex || 0);
  countdownDisplay.textContent = timeLeft;
  
  window.autoInterval = setInterval(() => {
    timeLeft--;
    countdownDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      window.currentLightIndex = ((window.currentLightIndex || 0) + 1) % trafficLightSequence.length;
      updateTrafficLight(window.currentLightIndex);
      timeLeft = 30;
    }
  }, 1000);
}

// Function to initialize chart period selections
function initializeChartPeriodSelections() {
  document.querySelectorAll('.chart-actions').forEach(actionContainer => {
    const periods = actionContainer.querySelectorAll('.chart-period');
    periods.forEach(period => {
      period.addEventListener('click', function() {
        // Skip if this is a traffic light control
        if (this.closest('.traffic-status-card')) {
          return;
        }

        // Remove active class from all periods in this container
        actionContainer.querySelectorAll('.chart-period').forEach(p => {
          p.classList.remove('active');
        });
        // Add active class to clicked period
        this.classList.add('active');
        
        // Update chart data based on selected period
        const selectedPeriod = this.textContent;
        const chartCard = this.closest('.chart-card');
        updateChartData(chartCard, selectedPeriod);
      });
    });
  });
}

// Function to update chart data based on selected period
function updateChartData(chartCard, period) {
  const chartElement = chartCard.querySelector('#area-chart, #bar-chart');
  if (!chartElement) return;

  const chart = ApexCharts.getChartByID(chartElement.id);
  if (!chart) return;

  // Data patterns for Jalahalli Cross Junction (bar chart)
  const barChartData = {
    'Day': {
      categories: ['Morning Peak', 'Afternoon', 'Evening Peak', 'Night'],
      data: [850, 420, 780, 240]
    },
    'Week': {
      categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      data: [720, 680, 700, 750, 780, 500, 380]
    },
    'Month': {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [2800, 3100, 2950, 3200]
    }
  };

  // Data patterns for Traffic Trends (area chart)
  const areaChartData = {
    '6M': {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      series: [
        {
          name: 'North-South Traffic',
          data: [3100, 3400, 3200, 3600, 3800, 4100]
        },
        {
          name: 'East-West Traffic',
          data: [2800, 3000, 2900, 3200, 3400, 3600]
        }
      ]
    },
    '1Y': {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        {
          name: 'North-South Traffic',
          data: [3100, 3400, 3200, 3600, 3800, 4100, 4300, 4200, 4000, 3800, 3600, 3400]
        },
        {
          name: 'East-West Traffic',
          data: [2800, 3000, 2900, 3200, 3400, 3600, 3800, 3700, 3500, 3300, 3100, 2900]
        }
      ]
    },
    'ALL': {
      categories: ['2020', '2021', '2022', '2023', '2024'],
      series: [
        {
          name: 'North-South Traffic',
          data: [2500, 2800, 3200, 3600, 4100]
        },
        {
          name: 'East-West Traffic',
          data: [2200, 2500, 2900, 3300, 3600]
        }
      ]
    }
  };

  if (chartElement.id === 'bar-chart') {
    const periodData = barChartData[period];
    if (periodData) {
      chart.updateOptions({
        xaxis: {
          categories: periodData.categories
        }
      });
      chart.updateSeries([{
        name: 'Vehicle Count',
        data: periodData.data
      }]);
    }
  } else if (chartElement.id === 'area-chart') {
    const periodData = areaChartData[period];
    if (periodData) {
      chart.updateOptions({
        xaxis: {
          categories: periodData.categories
        }
      });
      chart.updateSeries(periodData.series);
    }
  }
}