<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { type User } from '../types/User';
import UserInfo from './UserInfo.vue';
import fakeUsers from '../fakeUsers.json';
import Clusterize from 'clusterize.js';

const selectedUser = ref<null | User>(null);
const unselectUser = () => { selectedUser.value = null };
let content: HTMLElement | null = null;

const handleClick = ({ target }: MouseEvent) => {
  if (target instanceof HTMLElement && target.closest('.users__item-btn')) {
    const buttonEl = target.closest('.users__item-btn');
    const userId = buttonEl?.getAttribute('data-id');
    selectedUser.value = fakeUsers[Number(userId) - 1];

    const activeUserOfUsersListEl = document.querySelector('.users__item-active');
    activeUserOfUsersListEl?.classList.remove('users__item-active');
    const listItemEl = target.closest('li');
    listItemEl?.classList.add('users__item-active');
  }
};

onMounted(() => {
  new Clusterize({
    scrollId: 'scrollArea',
    contentId: 'contentArea'
  });
  
  content = document.getElementById('scrollArea');
  content?.addEventListener('click', handleClick);
});

onUnmounted(() => {
  content?.removeEventListener('click', handleClick);
})
</script>

<template>
  <header>
    <h1>Users</h1>
    <hr>
  </header>
  <div class="users" :class="{'users_selected': selectedUser}">
    <div id="scrollArea" class="users__list-wrapper clusterize-scroll">
      <ul id="contentArea" class="users__list clusterize-content">  
        <li v-for="user in fakeUsers" :key="user.id">
          <button @click="selectedUser = user" class="users__item-btn" type="button" :data-id="user.id">
            <img alt="person" src="../assets/person-fill.svg" width="24" height="24" />
            <span>{{ user.name }}</span>
          </button>
        </li>
      </ul>
    </div>
    <UserInfo :selected-user="selectedUser" @unselect-user="unselectUser" />
  </div>
</template>

<style lang="scss">
@use './user-list.scss';
</style>
