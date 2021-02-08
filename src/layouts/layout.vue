<template>
  <q-layout view="lHh Lpr lFf">
      <q-header>
        <!-- menu top -->
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click.prevent="leftDrawerOpen = !leftDrawerOpen"
          />
          <q-toolbar-title>{{$store.state.title}}</q-toolbar-title>
          <!-- <q-btn flat round dense icon="sim_card" class="q-mr-xs" />-->
          <!-- <q-btn flat round dense icon="gamepad" />-->
          <!-- <q-btn flat round dense icon="assignment_ind">
            <q-badge floating color="red">2</q-badge>
          </q-btn>-->
        </q-toolbar>
        <!-- menu top -->
        <!-- <q-toolbar>
          <q-breadcrumbs active-color="white" style="font-size: 16px">
            <q-breadcrumbs-el label="Home" icon="home" />
            <q-breadcrumbs-el label="Components" icon="widgets" />
            <q-breadcrumbs-el label="Toolbar" />
          </q-breadcrumbs>
        </q-toolbar>-->
      </q-header>
      <!-- menu left-->
      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area style="
          height: calc(100% - 158px);
          margin-top: 158px;
          border-right: 1px solid #ddd
        ">
          <q-list padding>
            <q-item
              to="/"
              exact
              clickable
              v-ripple>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>
              <q-item-section>
                CLIENTES
              </q-item-section>
            </q-item>

            <q-item
              to="/buscador"
              exact
              clickable
              v-ripple>
              <q-item-section avatar>
                <q-icon name="search" />
              </q-item-section>

              <q-item-section>
                BUSCADOR
              </q-item-section>
            </q-item>

            <q-item
              to="/help"
              exact
              clickable
              v-ripple>
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>
              <q-item-section>
                AYUDA
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="~assets/perrosygatos.jpg"
          style="height: 158px;">
          <div class="absolute-bottom bg-dark">
            <q-avatar size="76px" class="q-mb-sm">
              <img src="~/assets/logo-central-vet.jpg">
            </q-avatar>
            <div class="text-weight-bold">CentralVet Pigüé</div>
            <div>M.V. Guillermina Puente</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <!-- <keepalive> -->
        <router-view />
      <!-- </keepalive> -->
    </q-page-container>
  </q-layout>
</template>

<script>
  import { date } from 'quasar'

  export default {
    name: 'MainLayout',

    data () {
      return {
        leftDrawerOpen: false,
        dialog: false,
        maximizedToggle: true,
        model: '2019/03/15',
      }
    },
  }
</script>

<style lang="scss">
  .shadow-text{
    text-shadow: 1px 1px 2px rgba(0,0,0,.5);
  }


  .text-subtitle1, #title {
    font-family: 'Roboto', sans-serif;
    margin-top: 7px;
    text-transform: uppercase
  }

  .header-img{
    height: 100%;
    z-index: -1;
    opacity: .2;
    filter: grayscale(100%);
  }
</style>