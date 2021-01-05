<template>
  <div>
    <Pesquisa/>
    <ResultadoCeps/>
  </div>
</template>

<script>
import Pesquisa from '@/components/Pesquisa.vue'
import ResultadoCeps from '@/components/ResultadoCeps.vue'

export default {
  name: 'Index',
  components: {
    Pesquisa,
    ResultadoCeps
  }
}
</script>
