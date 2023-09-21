<template>
  <header>
    <h1>Users</h1>
    <hr>
  </header>
  <div class="users" :class="{'users_selected': selectedUser}">
    <ul class="users__list">  
      <li
        v-for="user in visibleUsers"
        :key="user.id"
        v-memo="[user.id === selectedUser?.id]"
        :class="{'users__item-active': user.id === selectedUser?.id}"
      >
        <button @click="selectedUser = user" class="users__item-btn" type="button">
          <img alt="person" src="../assets/person-fill.svg" width="24" height="24" />
          <span>{{ user.name }}</span>
        </button>
      </li>
    </ul>
    <UserInfo :selected-user="selectedUser" @unselect-user="unselectUser" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import fakeUsers from '../fakeUsers.json';
import { type User } from '../types/User';
import UserInfo from './UserInfo.vue';

const selectedUser = ref<null | User>(null);
const initialUsersCount = 40;
const visibleUsers = ref(fakeUsers.slice(0, initialUsersCount));
const unselectUser = () => { selectedUser.value = null };

const loadMore = () => {
  const showedUsersCount = visibleUsers.value.length;
  const newUsers = fakeUsers.slice(showedUsersCount, showedUsersCount + initialUsersCount);
  visibleUsers.value.push(...newUsers);
}

onMounted(() => {
  const usersListElement = document.querySelector('.users__list');

  usersListElement?.addEventListener('scroll', () => {
    if (usersListElement.scrollTop + usersListElement.clientHeight >= usersListElement.scrollHeight) {
      loadMore();
    }
  })
});
</script>

<style lang="scss">
$header-height: 66px;
$header-height-md: 82px;

header {
  position: fixed;
  left: 16px;
  right: 16px;
}

.users {
  display: flex;
  height: calc(100% - $header-height);
  margin-top: $header-height;

  &_selected {
    .users__list {
      display: none;
    }
  }

  &__list {
    width: 100%;
    height: 100%;
    padding-left: 0;

    list-style: none;
    overflow-y: scroll;
  }

  &__item-active {
    background-color: #cfe2ff;
  }
}

.users__item-btn {
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

@media (min-width: 768px) {
  h1 {
    font-size: 40px;
  }

  .users {
    margin-top: $header-height-md;
    height: calc(100% - $header-height-md);

    &__item-btn {
      font-size: 16px;
    }
  }
}

@media (min-width: 1024px) {
  .users {
    column-gap: 16px;

    &_selected .users__list {
      display: block;
      padding-right: 8px;
    }
  }
}
</style>
