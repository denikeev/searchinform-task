<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps(['selectedUser']);
const { selectedUser } = toRefs(props);
</script>

<template>
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
    <button @click="$emit('unselectUser')" class="user-info__button" type="submit">Close</button>
  </div>
</template>

<style lang="scss">
.user-info {
  width: 100%;

  &__name {
    margin-bottom: 8px;
    padding: 4px;

    font-size: 18px;

    background-color: #cfe2ff;
  }

  &__items {
    margin-bottom: 16px;
    padding-left: 0;
  }

  &__button {
    width: 60px;
    padding: 4px;
  }
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

.user-info__item {
  display: flex;
  flex-direction: column;

  p {
    color: #6c757d;
  }

  &:not(:last-of-type) {
    margin-bottom: 4px;
  }
}

@media (min-width: 1024px) {
  .user-info {
    &__avatar {
      width: 100px;
      height: 100px;

      &::before {
        width: 25px;
        height: 25px;
      }
    }

    &__button {
      display: none;
    }
  }
}
</style>