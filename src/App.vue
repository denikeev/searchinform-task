<script setup lang="ts">
import { ref } from 'vue';
import fakeUsers from './fakeUsers.json';
import getFakeUsers, { type User } from './getFakeUsers.js';

// console.log(getFakeUsers(100));
const selectedUser = ref<null | User>(null);

const selectUser = (user: User) => {
  selectedUser.value = user;
}
</script>

<template>
  <ul class="users-list">
    <li v-for="user in fakeUsers" :key="user.id">
      <button @click="selectUser(user)" class="user-list__item" type="button">
        <img alt="person" src="./assets/person-fill.svg" width="24" height="24" />
        <span>{{ user.name }}</span>
      </button>
    </li>
  </ul>
  <div v-if="selectedUser" class="user-info">
    {{ selectedUser.name }}
    <br>
    {{ selectedUser.company }}
  </div>
</template>

<style lang="scss">
.users-list {
  height: 100%;
  list-style: none;
  overflow-y: scroll;
}

.user-list__item {
  display: flex;
  align-items: center;
  padding: 4px;

  background: none;
  border: none;
  cursor: pointer;


  img {
    margin-right: 4px;
  }

  &:hover span {
    text-decoration: underline;
  }
}
</style>
