<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-toolbar>
      <div class="q-px-lg q-mb-md">
        <!-- title -->
        <div id="title" class="shadow-text text-h4">{{$store.state.title}}</div>
        <div v-if="$store.state.subtitleLeft" class="text-subtitle1 q-gutter-sm">
          <!-- subtitle icon/left -->
          <q-btn color="accent" push>
            <div class="row items-center no-wrap">
              <q-icon left :name="$store.state.iconleft"/>
              <div class="text-center">{{$store.state.subtitleLeft}}</div>
              <q-icon v-if="$store.state.iconright" right left :name="$store.state.iconright"/>
              <div v-if="$store.state.subtitleRight" class="text-right">{{$store.state.subtitleRight}}</div>
            </div>
          </q-btn>
        </div>
      </div>
      <q-img 
        class="header-img absolute-top"
        src="~assets/perrosygatos.jpg"/>
    </q-header>

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