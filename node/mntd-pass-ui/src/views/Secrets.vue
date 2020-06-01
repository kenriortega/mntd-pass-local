<template>
  <div class="flex flex-col h-screen text-sm text-gray-400">
    <div class="flex-1 flex overflow-y-hidden">
      <!-- Sidebar  -->
      <sidebar-component />
      <!-- end Sidebar -->
      <!-- Content -->
      <secrets-content />
      <!-- end Content -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SidebarComponent from '@/components/SidebarComponent'
import SecretsContent from '@/views/secrets/index'
export default {
  name: 'SecretsView',
  components: {
    SidebarComponent,
    SecretsContent
  }
}
</script>
