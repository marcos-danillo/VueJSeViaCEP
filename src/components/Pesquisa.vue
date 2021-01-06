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
          v-model="buscaCep"
          label="Informe o CEP"
          color="success"
          :rules="rulesC"
          maxlength="8"
          @keyup.enter="getCEP"
          clearable>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row v-else class="text-center" justify="center">
      <v-col cols="12" lg='2' md="2" sm="12" align="center">
        <v-text-field
          v-model="uf"
          label="UF"
          :rules="rulesUF"
          color="success"
          maxlength="2"
          clearable>
        </v-text-field>
      </v-col>
      <v-col cols="12" lg='4' md="4" sm="12" align="center">
        <v-text-field
          v-model="cidade"
          label="Cidade"
          :rules="rulesE"
          color="success"
          maxlength="50"
          clearable>
        </v-text-field>
      </v-col>
      <v-col cols="12" lg='6' md="6" sm="12" align="center">
        <v-text-field
          v-model="logradouro"
          label="Logradouro"
          :rules="rulesE"
          color="success"
          maxlength="80"
          @keyup.enter="getCEP"
          clearable>
        </v-text-field>
      </v-col>
    </v-row>
     <!-- Botão Pesquisar -->
    <v-row class="text-center" justify="center">
      <v-col cols="12" md="12" sm="12" align="center">
        <v-btn dark
          block
          color="blue"
          @click="getCEP"
          :loading="loading">
            <v-icon color="white" >mdi-magnify</v-icon>
            Pesquisar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'Pesquisa',

    data: () => ({
      loading: false,
      cep: '',
      corC: 'primary',
      corE: 'primary',
      rulesC: [
        value => !!value || 'É preciso informar o CEP.',
        value => (value && value.length >= 8) || 'Mínimo 8 caracteres (ex: 78201000)',
      ],
      rulesUF: [
        value => !!value || 'É preciso informar uma unidade federativa.',
      ],
      rulesE: [
        value => !!value || 'É preciso informar este campo.',
        value => (value && value.length >= 3) || 'Mínimo 3 caracteres',
      ],
      buscaCep: '',
      uf: '',
      cidade: '',
      logradouro: '',
    }),
    computed:{
      ...mapGetters(['dessertsA'])
    },
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
          this.buscaCep = ''
        }
      }
    },
    methods: {
      ...mapActions(['setstatusDesserts', 'setstatusClean']),
      async getCEP(){
        this.loading = true
        this.desserts = []
            try{
              if(this.cep === true){
                if(this.buscaCep === ''){
                  alert('Informe um argumento para pesquisa!')
                }
                else{
                  const response = await this.$http.get(this.buscaCep+'/json/')
                  this.desserts.push(response.data)
                }
              }
              else{
                if(this.uf === '' || this.cidade === '' || this.logradouro === ''){
                  alert('Informe todos os campos para realizar a pesquisa!')
                }
                if(this.uf != '' || this.cidade != '' || this.logradouro != ''){
                  const response = await this.$http.get(this.uf+'/'+this.cidade+'/'+this.logradouro+'/json/')     
                  for (var i = 0; i <= response.data.length; i++) {
                    this.desserts.push({
                      'localidade': response.data[i].localidade,
                      'uf': response.data[i].uf,
                      'bairro': response.data[i].bairro,
                      'logradouro': response.data[i].logradouro,
                      'cep': response.data[i].cep,
                      'complemento': response.data[i].complemento,
                    })
                  }
                }
              }
            }catch(error) {
                if (error instanceof TypeError){
                  // 
                }
                else{
                  alert('Erro Inesperado! Tente novamente.')
                }
            }finally{
              this.loading = false
              this.setstatusDesserts(this.desserts)
              this.setstatusClean(true) 
            }
            this.uf = ''
            this.cidade = ''
            this.logradouro = ''
            this.buscaCep = ''
        },
    },
    created() {
      this.cep=true
    },
  }
</script>