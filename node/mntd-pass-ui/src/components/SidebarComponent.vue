<template>
  <div
    :class="
      `${
        isToggle ? 'hidden' : ''
      } sidebar bg-gray-900-spotify w-48 flex-none  flex flex-col justify-between font-semibold`
    "
  >
    <!-- Section 1 General Links -->
    <ul class="py-6">
      <li
        v-for="sel in sidebarIndexElems"
        :key="sel.id"
        :class="
          `border-l-4 border-${
            activeRoute() !== sel.route ? 'transparent' : 'green-600'
          }`
        "
      >
        <router-link
          :to="{ name: sel.route }"
          class="flex items-center mx-4 mt-4 group"
        >
          <i :class="`fa fa-${sel.icon} `"></i>
          <span class="ml-2 text-white group-hover:text-white">{{
            sel.name
          }}</span>
        </router-link>
      </li>
    </ul>
    <!-- Part 2 Categories -->
    <div class="sidebar-spotify overflow-y-auto px-5">
      <div v-for="e in sidebarOtherElms" :key="e.id">
        <h3
          class="uppercase tracking-widest text-gray-500 font-normal text-xs "
        >
          {{ e.name }}
        </h3>
        <ul
          :class="
            `leading-extra-loose ${e.name !== 'categories' ? 'mb-40' : ''}`
          "
        >
          <li v-for="sub in e.subitems" :key="sub.id" class="truncate">
            <i :class="`fa fa-${sub.icon}`"></i>
            <span
              class="ml-2 border-b hover:border-green-700 cursor-pointer"
              @click="filterByName(e.name, sub.name)"
              >{{ sub.name }}</span
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- Part 3 Logout -->
    <div
      class="border-t border-gray-800 h-16 px-4 py-2 flex items-center group"
    >
      <i class="fa fa-tools"></i>
      <span class="ml-2 hover:text-white"
        ><strong>
          <span class="uppercase text-green-700">
            {{ whoami.role }}</span
          ></strong
        ></span
      >
    </div>
  </div>
</template>

<script>
import ROUTES from '@/constant/routes'
import { bus } from '@/main.js'
import { UtilsService } from '@/services/'

export default {
  name: 'sidebar',
  data() {
    return {
      isToggle: false,
      whoami: {},
      sidebarIndexElems: [
        {
          id: Math.random().toString(),
          name: 'Secrets',
          icon: 'lock',
          route: ROUTES.SECRETS.name
        },
        {
          id: Math.random().toString(),
          name: 'Profile',
          icon: 'user',
          route: ROUTES.PROFILE.name
        }
      ],
      sidebarOtherElms: [
        {
          id: Math.random().toString(),
          name: 'categories',
          subitems: [
            {
              id: Math.random().toString(),
              name: 'ALL',
              icon: 'database',
              filter: 'all'
            },
            {
              id: Math.random().toString(),
              name: 'Servers',
              icon: 'server',
              filter: 'servers'
            },
            {
              id: Math.random().toString(),
              name: 'Services',
              icon: 'signal',
              filter: 'services'
            },
            {
              id: Math.random().toString(),
              name: 'Personal',
              icon: 'users',
              filter: 'personal'
            },
            {
              id: Math.random().toString(),
              name: 'Payments',
              icon: 'address-card',
              filter: 'payments'
            }
          ]
        }
        // {
        //   id: Math.random().toString(),
        //   name: 'management',
        //   subitems: [
        //     {
        //       id: Math.random().toString(),
        //       name: 'Secrets',
        //       icon: 'plus',
        //       filter: 'secret-create'
        //     }
        //   ]
        // }
      ]
    }
  },
  mounted() {},
  created() {
    this.getUserFromLocalStorage()

    bus.$on('toggleSidebar', data => (this.isToggle = data))
  },
  methods: {
    getUserFromLocalStorage() {
      this.whoami = UtilsService.getItemStorage('user')
    },
    logout() {
      window.localStorage.clear()
      this.$router.push({ name: ROUTES.LOGIN.name })
    },
    activeRoute() {
      return this.$route.name
    },
    filterByName(category, filter) {
      if (category === 'categories') {
        bus.$emit('filterByName', filter.toLowerCase())
        return
      } else if (category === 'management') {
        console.log(filter)
      }
    }
  }
}
</script>
<style lang="scss">
.sidebar-spotify::-webkit-scrollbar {
  width: 8px;
  background-color: #121212;
}

.sidebar-spotify::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #535353;
}
</style>
