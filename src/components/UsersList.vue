<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { type User } from '../types/User';
import UserInfo from './UserInfo.vue';

const isDataLoaded = ref(false);
const fakeUsers = ref(null);

const selectedUser = ref<null | User>(null);
const unselectUser = () => { selectedUser.value = null };

onMounted(async () => {
  await fetch("./fake-users.min.json")
  .then(res => res.json())
  .then(data => {
    fakeUsers.value = data;
    isDataLoaded.value = true;
  });
})
</script>

<template>
  <header>
    <h1>Users</h1>
    <hr>
  </header>
  <main v-if="isDataLoaded" class="main" :class="{'main_show-user': selectedUser}" >
    <div class="content">
      <div class="content__wrapper">
        <RecycleScroller
          class="scroller users"
          :items="fakeUsers"
          :item-size="32"
          list-class="users__list"
          listTag="ul"
          itemTag="li"
        >
          <template v-slot="{ item }">
            <div :class="{'users__item-active': item.id === selectedUser?.id}">
              <button @click="selectedUser = item" class="users__item-btn" type="button">
                <img alt="person" src="../assets/person-fill.svg" width="24" height="24" />
                <span>{{ item.name }}</span>
              </button>
            </div>
          </template>
          <template #after></template>
        </RecycleScroller>
      </div>
    </div>
    <UserInfo :selected-user="selectedUser" @unselect-user="unselectUser" />
  </main>
  <img v-else class="preloader" src="../assets/preloader.gif" width="64" height="64" alt="Загрузка..." />
</template>

<style lang="scss">
@use './user-list.scss';
</style>
