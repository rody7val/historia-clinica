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
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">Historia Clínica</div>
        <!-- <div class="text-subtitle1">CentralVet Pigüé</div> -->
        <div class="text-subtitle1">{{todaysDate}}</div>
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
        <q-scroll-area style="height: calc(100% - 138px); margin-top: 138px; border-right: 1px solid #ddd">
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
                Pacientes
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
                Ayuda
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="~assets/perrosygatos.jpg" style="height: 138px;">
          <div class="absolute-bottom bg-primary">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="~/assets/logo-central-vet.jpg">
            </q-avatar>
            <div class="text-weight-bold">CentralVet Pigüé</div>
            <div>M.V. Guillermina Puente</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <keepalive>
        <router-view />
      </keepalive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  },

  computed: {
    todaysDate() {
      let timeStamp = Date.now()
      return date.formatDate(timeStamp, 'dddd D MMMM')
    }
  }
}
</script>

<style type="scss">
  .header-img{
    height: 100%;
    z-index: -1;
    opacity: .2;
    filter: grayscale(100%);
  }
</style>