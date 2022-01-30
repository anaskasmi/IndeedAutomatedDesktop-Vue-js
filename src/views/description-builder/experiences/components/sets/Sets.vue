<template>
  <v-card :loading="isLoading" :disabled="isLoading">
    <CreateItemDialog />
    <v-card-title style="color: #30475e">Experiences Sets</v-card-title>
    <v-card-text class="pa-12">
      <v-data-table
        :headers="headers"
        :items="sets"
        set-key="id"
        class="elevation-0"
        :search="search"
      >
        <template v-slot:top>
          <v-row>
            <v-text-field
              v-model="search"
              label="Search"
              class="mx-4"
              color="#30475e"
            ></v-text-field>
            <v-btn
              dark
              color="#30475e"
              @click="createItemDialogVisible = true"
              class="my-6"
              small
              fab
              ><v-icon medium>mdi-plus</v-icon></v-btn
            >
          </v-row>
        </template>
        <template class="align-center" v-slot:[`set.name`]="{ set }">
          <EditableText :set="set" />
        </template>
        <template v-slot:[`set.experiences`]="{ set }">
          <v-chip
            v-for="experience in set.experiences"
            class="ma-2"
            :key="experience._id"
          >
            {{ experience.name }}
          </v-chip>
        </template>
        <template v-slot:[`set.actions`]="{ set }">
          <v-icon medium color="red darken-2" @click="deleteSet(set)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import EditableText from "@/views/description-builder/experiences/components/Editable.vue";
import CreateItemDialog from "@/views/description-builder/experiences/components/CreateItem.vue";
export default {
  created() {
    this.fetchSets();
  },
  components: {
    EditableText,
    CreateItemDialog,
  },
  data() {
    return {
      isLoading: false,
      search: null,
      headers: [
        {
          text: "name",
          align: "start",
          sortable: true,
          value: "name",
        },
        {
          text: "experiences",
          align: "start",
          value: "experiences",
        },
        {
          text: "actions",
          align: "end",
          sortable: true,
          value: "actions",
          width: "10%",
        },
      ],
    };
  },
  computed: {
    sets: {
      get: function () {
        return this.$store.getters["DescriptionBuilderExperiencesModule/sets"];
      },
      set: function (newVal) {
        this.$store.commit("DescriptionBuilderExperiencesModule/sets", newVal);
      },
    },
    createItemDialogVisible: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderExperiencesModule/createItemDialogVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderExperiencesModule/createItemDialogVisible",
          newVal
        );
      },
    },
  },
  methods: {
    async fetchSets() {
      this.isLoading = true;
      try {
        await this.$store.dispatch(
          "DescriptionBuilderExperiencesModule/fetchSets"
        );
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteItem(set) {
      this.$swal
        .fire({
          title: "This Set will be deleted, continue ?",
          showCancelButton: true,
          confirmButtonText: "Delete",
          cancelButtonText: `Cancel`,
          confirmButtonColor: "#E05D5D",
          cancelButtonColor: "#ddd",
          icon: "error",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.isLoading = true;
            try {
              await this.$store.dispatch(
                "DescriptionBuilderExperiencesModule/deleteSet",
                set._id
              );
              this.$swal.fire({
                title: "Deleted successfully",
                icon: "success",
                confirmButtonColor: "#219F94",
              });
            } catch (error) {
              this.$store.dispatch("alertsModule/fireAxiosError", error);
            } finally {
              this.isLoading = false;
            }
          }
        });
    },
  },
};
</script>