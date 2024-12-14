<template>
  <div class="container-fluid">
    <div class="row justify-content-between align-items-center p-3 top-bar">
      <div class="col-auto">
        <button
          class="border-0 bg-transparent"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvas"
          aria-controls="offcanvas"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            height="20"
            width="20"
          >
            <path
              d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
            />
          </svg>
        </button>
      </div>

      <div class="col-auto"></div>

      <div class="col-auto d-flex align-items-center">
        <span>Mohamed zakaria</span>

        <div class="notification-bell position-relative mx-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            height="24"
            width="24"
            class="bell-icon"
          >
            <path
              d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416l400 0c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4l0-25.4c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112l0 25.4c0 47.9 13.9 94.6 39.7 134.6L72.3 368C98.1 328 112 281.3 112 233.4l0-25.4c0-61.9 50.1-112 112-112zm64 352l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"
            />
          </svg>
          <span
            class="badge rounded-circle position-absolute top-0 start-100 translate-middle bg-danger"
            >3</span
          >
        </div>
      </div>
    </div>
  </div>

  <div
    class="offcanvas offcanvas-start sidebar"
    tabindex="-1"
    id="offcanvas"
    aria-labelledby="offcanvasLabel"
  >
    <nav class="flex-1">
      <ul>
        <li class="relative">
          <router-link to="/dashboard">
            <span class="d-flex align-items-center">
              <i class="bi bi-house-door me-2"></i>
              <span>Dashboard</span>
            </span>
          </router-link>
        </li>

        <li class="relative">
          <router-link to="/users">
            <span class="d-flex align-items-center">
              <i class="bi bi-person me-2"></i>
              <span>Users</span>
            </span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.top-bar {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.sidebar {
  box-shadow: 4px 0 6px rgba(0, 0, 0, 0.1);
  padding-top: 60px; 
}

.notification-bell {
  position: relative;
  display: inline-block;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.notification-bell:hover {
  transform: scale(1.1);
}

.bell-icon {
  fill: #333;
  transition: fill 0.3s ease;
}

.notification-bell:hover .bell-icon {
  fill: #007bff;
}

.badge {
  width: 18px;
  height: 18px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar i {
  font-size: 18px;
  color: #333;
}

.sidebar li {
  list-style-type: none;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

.sidebar li:hover {
  background-color: #f0f0f0;
}

.offcanvas.offcanvas-start {
  top: 59px; 
  position: absolute; 
  width: 250px; 
}

.sidebar i {
  font-size: 18px;
  color: #333;
}

.sidebar li {
  list-style-type: none;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

.sidebar li:hover {
  background-color: #f0f0f0;
}
a {
    text-decoration: none;
    color: black;
}

</style>
