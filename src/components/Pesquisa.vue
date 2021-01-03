<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" md="12" sm="12" align="center">
        <h1>Consultar CEP</h1>
      </v-col>
    </v-row>
    <!-- Opções de pesquisa: Por CEP ou por UF, Cidade, Logradouro -->
    <v-row class="text-center">
      <v-col cols="12" md="6" sm="6" align="center">
        <v-btn block :color="corC" @click="cep=true">
          Buscar CEP
        </v-btn>
      </v-col>
      <v-col cols="12" md="6" sm="6" align="center">
        <v-btn block :color="corE" @click="cep=false">
          Buscar Endereço
        </v-btn>
      </v-col>
    </v-row>
    <!-- Resultado da Opção de Pesquisa -->
    <v-row v-if="cep" class="text-center" justify="center">
      <v-col cols="12" md="6" sm="6" align="center">
        <v-text-field
          v-model="bucarCep"
          label="Informe o CEP"
          color="success"
          :rules="rulesC"
          maxlength="8"
          clearable>
        </v-text-field>
      </v-col>
    </v-row>

    <v-row v-else class="text-center" justify="center">
      <v-col cols="12" lg='2' md="2" sm="12" align="center">
        <v-text-field
          v-model="uf"
          label="UF"
          color="success"
          maxlength="2"
          clearable>
        </v-text-field>
      </v-col>
      <v-col cols="12" lg='4' md="4" sm="12" align="center">
        <v-text-field
          v-model="cidade"
          label="Cidade"
          color="success"
          maxlength="2"
          clearable>
        </v-text-field>
      </v-col>
      <v-col cols="12" lg='6' md="6" sm="12" align="center">
        <v-text-field
          v-model="logradouro"
          label="Logradouro"
          color="success"
          maxlength="2"
          clearable>
        </v-text-field>
      </v-col>
    </v-row>

    

  </v-container>
</template>

<script>
  export default {
    name: 'Pesquisa',

    data: () => ({
      cep: '',
      corC: 'primary',
      corE: 'primary',
      rulesC: [
        value => !!value || 'É preciso informar o CEP.',
        value => (value && value.length >= 8) || 'Mínimo 8 caracteres (ex: 78201000)',
      ],

      bucarCep: '',
      uf: '',
      cidade: '',
      logradouro: '',

    }),
    watch: {
      cep(){
        if(this.cep === true){
          this.corC = 'success'
          this.corE = 'primary'
          this.uf = ''
          this.cidade = ''
          this.logradouro = ''
        }
        else{
          this.corC = 'primary'
          this.corE = 'success'
          this.bucarCep = ''
        }
      }
    },
    methods: {
      
    },
    created() {
      this.cep=true
    },
  }
</script>