<template>
  <div class="flex flex-col h-screen text-sm text-gray-400">
    <div class="flex-1 flex overflow-y-hidden">
      <!-- Sidebar  -->
      <sidebar-component />
      <!-- end Sidebar -->
      <!-- Content -->
      <ProfileComponent />
      <!-- end Content -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SidebarComponent from '@/components/SidebarComponent'
import ProfileComponent from '@/views/users/'
export default {
  name: 'Profile',
  components: {
    SidebarComponent,
    ProfileComponent
  }
}
</script>
