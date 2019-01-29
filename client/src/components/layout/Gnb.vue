<template>
  <header id="site_header">
    <div class="header_inner">
      <h1 class="site_logo">
        <router-link to="/">
          <img src="@/assets/images/logo.png" widt="100" alt>
        </router-link>
      </h1>
      <nav class="site_menu">
        <ul class="list_menu">
          <li>
            <router-link to="around">내주변</router-link>
          </li>
          <li>
            <router-link to>지역</router-link>
          </li>
          <li>
            <router-link to>기획전</router-link>
          </li>
        </ul>
      </nav>
      <div class="wrap_search">
        <button class="btn_search"></button>
      </div>
      <div class="wrap_util">
        <router-link to class="link_util">회원가입</router-link>
        <router-link to class="link_util">로그인</router-link>
      </div>
    </div>
  </header>
</template>
