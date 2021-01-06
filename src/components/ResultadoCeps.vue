<template>
     <v-container>
        <v-row v-if="getstatusClean" class="text-center" justify="center">
            <v-col cols="12" md="12" sm="12" align="center">
                <v-toolbar
                    flat
                >
                    <v-toolbar-title>RESULTADO DA BUSCA</v-toolbar-title>
                    <v-divider
                    class="mx-4"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn
                    color="error"
                    dark
                    class="mb-2"
                    @click="limparResultados"
                    >
                    Limpar Resultados
                    </v-btn>
                </v-toolbar>
                <v-data-table
                    :headers="headers"
                    :items="ceps"
                    class="elevation-1"
                >
                </v-data-table>
            </v-col>
        </v-row>
     </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Cidade',
            align: 'start',
            value: 'localidade',
          },
          { text: 'UF', value: 'uf' },
          { text: 'Bairro', value: 'bairro' },
          { text: 'Logradouro', value: 'logradouro' },
          { text: 'CEP', value: 'cep' },
          { text: 'Complemento', value: 'complemento'}
        ],
      }
    },
    computed: {
        ...mapGetters(['ceps','getstatusClean'])
    },
    methods:{
        ...mapActions(['setstatusDesserts', 'setstatusClean']),
        limparResultados(){
            this.setstatusDesserts([])
            this.setstatusClean(false) 
        }
    },
  }
</script>

<style>

</style>
