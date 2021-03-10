<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      
    >
    
     Indeed Automated Desktop 
    
    </v-app-bar>

    <v-main>
      <Index/>
    </v-main>
  </v-app>
</template>

<script>
import Index from './views/index'
export default {
  name: 'App',

  components: {
    Index,
  },

  data: () => ({
    //
  }),
};
</script>


