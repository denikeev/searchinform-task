<script setup lang="ts">

import { ref, onMounted } from 'vue';
import fakeUsers from './fakeUsers.json';
import { type User } from './types/User';

const selectedUser = ref<null | User>(null);
const initialUsersCount = 40;
const visibleUsers = ref(fakeUsers.slice(0, initialUsersCount));

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

<template>
  <div class="container">
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
            <img alt="person" src="./assets/person-fill.svg" width="24" height="24" />
            <span>{{ user.name }}</span>
          </button>
        </li>
      </ul>
      <div v-if="selectedUser" class="user-info">
        <div class="user-info__avatar" :class="{'user-info__avatar_active': selectedUser.activeStatus}" >
          <img alt="person" :src=selectedUser.avatarPath />
        </div>
        <p class="user-info__name">{{ selectedUser.name }}</p>
        <ul class="user-info__items">
          <li class="user-info__item">
            <p>Должность</p>
            <span>{{ selectedUser.jobTitle }}</span>
          </li>
          <li class="user-info__item">
            <p>Отдел</p>
            <span>{{ selectedUser.department }}</span>
          </li>
          <li class="user-info__item">
            <p>Компания</p>
            <span>{{ selectedUser.company }}</span>
          </li>
        </ul>
        <button @click="selectedUser = null" class="user-info__button" type="submit">Close</button>
      </div>
    </div>
  </div>
</template>

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
}

.users__list {
  width: 100%;
  height: 100%;
  padding-left: 0;

  list-style: none;
  overflow-y: scroll;
}

.users__item-active {
  background-color: #cfe2ff;
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
  }

  .users__item-btn {
    font-size: 16px;
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

// <users-info
.user-info {
  width: 100%;
}

.user-info__avatar {
  position: relative;

  width: 60px;
  height: 60px;
  margin-bottom: 8px;

  img {
    width: 100%;
    border-radius: 50%;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 5px;

    width: 14px;
    height: 14px;

    border: 1px solid gray;
    background-color: gray;
    border-radius: 50%;
  }

  &_active::before {
    background-color: #198754;
  }
}

.user-info__name {
  margin-bottom: 8px;
  padding: 4px;

  font-size: 18px;

  background-color: #cfe2ff;
}

.user-info__items {
  margin-bottom: 16px;
  padding-left: 0;
}

.user-info__item {
  display: flex;
  flex-direction: column;

  p {
    color: rgba(33, 37, 41, 0.5);
  }

  &:not(:last-of-type) {
    margin-bottom: 4px;
  }
}

.user-info__button {
  width: 60px;
  padding: 4px;
}

@media (min-width: 1024px) {
  .user-info__avatar {
    width: 100px;
    height: 100px;

    &::before {
      width: 25px;
      height: 25px;
    }
  }

  .user-info__button {
    display: none;
  }
}
// users-info>
</style>
