<template>
  <div class="bg-gray-200 sm:bg-red-200 md:bg-yellow-200 lg:bg-green-200 xl:bg-blue-200">
    <transition :name="transitionName" mode="out-in">
      <!-- susPageの値に応じてコンポーネントを切り替えて、擬似的にページ遷移を表現 -->
      <component
        :is="subPage"
        :form="form"
        @back="back"
        @next="next"
      />
    </transition>
  </div>
</template>

<script>
import MetaDataForm from '@/forms/MetaDataForm'

import InputFilePage from '@/components/RegistMetaData/InputFile'
import InputInfoPage from '@/components/RegistMetaData/InputInfo'
import ConfirmPage from '@/components/RegistMetaData/Confirm'
import CompletePage from '@/components/RegistMetaData/Complete'

export default {
  data () {
    return {
      form: new MetaDataForm(),
      transitionName: ''
    }
  },
  computed: {
    subPage () {
      // URLのhashの値に基づいて、返すコンポーネントを切り替え
      switch (this.$route.hash) {
        case '':
          return InputFilePage
        case '#inputInfo':
          return InputInfoPage
        case '#confirm':
          return ConfirmPage
        case '#complete':
          return CompletePage
        default:
          return InputFilePage
      }
    }
  },
  methods: {
    back () {
      this.transitionName = 'slide-back'
      switch (this.$route.hash) {
        case '#inputInfo':
          this.$router.push({ hash: '#inputFile' })
          break
        case '#confirm':
          this.$router.push({ hash: '#inputInfo' })
          break
      }
    },
    next () {
      this.transitionName = 'slide-next'
      switch (this.$route.hash) {
        case '':
          this.$router.push({ hash: '#inputInfo' })
          break
        case '#inputFile':
          this.$router.push({ hash: '#inputInfo' })
          break
        case '#inputInfo':
          this.$router.push({ hash: '#confirm' })
          break
        case '#confirm':
          this.$router.push({ hash: '#complete' })
          break
        default:
          this.$router.push({ hash: '#inputFile' })
          break
      }
    }
  }
}
</script>
