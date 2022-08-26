<template>
  <div>
    <h1 class="h2 text-uppercase font-weight-normal">
      {{ $t('welcome') }}
    </h1>

    <ul class="nav nav-tabs tab-width" role="tablist">
      <li class="nav-item">
        <nuxt-link
          id="login-tab"
          :to="{ path: 'login'}"
          class="nav-link m-0"

          aria-controls="home"
          aria-selected="true"
        >
          {{ $t('sign_in') }}
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link
          id="register-tab"
          :to="{ path: 'register'}"
          class="nav-link m-0"
          data-toggle="tab"

          aria-controls="profile"
          aria-selected="false"
        >
          {{ $t('register') }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
