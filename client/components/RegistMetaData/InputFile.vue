<template>
  <div class="relative min-h-screen w-full items-center justify-center py-12 px-4 sm:px-6 xl:px-8 bg-no-repeat bg-cover items-center">
    <form @submit.prevent="submit">
      <!--
      <div class="xl:flex">
        <div class="container bg-gray-500 w-300 h-300 p-4">
          <img class="object-scale-down" src="https://placehold.jp/100x400.png">
        </div>
      </div>
      -->

      <!-- 一時保存読み込みボタン ここから -->
      <div>
        <div class="">
          <button
            type="button"
            :disabled=!isRegistFormSaved
            :class="{ 'opacity-25 cursor-not-allowed': !isRegistFormSaved }"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            v-on:click="loadRegistForm"
          >
            保存読み込み
          </button>
          <button
            type="button"
            :disabled=!isRegistFormSaved
            :class="{ 'opacity-25 cursor-not-allowed': !isRegistFormSaved }"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            v-on:click="clearRegistForm"
          >
            保存クリア
          </button>
        </div>
      </div>
      <!-- 一時保存読み込みボタン ここまで -->

      <div class="mt-5">
        <!-- サンプル画像ファイルの登録 ここから -->
        <div class="w-308">
          <label class="text-sm font-bold text-gray-500 tracking-wide">サンプル画像選択</label>
          <div
            class="items-baseline justify-around rounded-lg border-4 border-dashed border-gray-400 bg-white image-input__field"
            :class="{'over': isDragOver}"
            @dragover.prevent="onDrag('over')"
            @dragleave="onDrag('leave')"
            @drop.stop="onDrop"
          >
            <input
              type="file"
              title
              @change="onChange"
            >
            <p>
              <span class="text-sm">データのイメージ画像をドラッグ＆ドロップ</span> <br /> または クリックしてファイルを選択
            </p>
          </div>
        </div>

        <div class="w-308 mt-5">
          <label class="text-sm font-bold text-gray-500 tracking-wide">選択ファイル名</label>
          <div class="bg-white">
            <input type="text" :value="form.samplePictFilePath" readonly class="w-300" />
          </div>
        </div>

        <div class="w-308 mt-2">
          <label class="text-sm font-bold text-gray-500 tracking-wide">プレビュー</label>
          <div class="border-4 border-dashed border-gray-400 bg-white">
            <div class="flex justify-center h-300 w-300">
              <img class="object-scale-down" v-bind:src="syncedSamplePictPreview">
            </div>
          </div>
        </div>
        <!-- サンプル画像ファイルの登録 ここまで -->

        <!-- エラー表示 ここから-->
        <div class="w-300 mt-2">
          <ul class="error-list">
            <li
              v-for="err in errors"
              :key="err"
            >
              <div class="flex items-center px-6 py-4 text-red-700 bg-red-100 rounded">
                <span>
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg></span>
                <p class="text-medium">{{ err }}</p>
              </div>
            </li>
          </ul>
        </div>
        <!-- エラー表示 ここまで -->

        <!-- 次へボタン ここから -->
        <div class="w-300 mt-2 flex items-center justify-center">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            次へ
          </button>
        </div>
        <!-- 次へボタン ここまで -->
      </div>
    </form>
  </div>
</template>

<script>
import MetaDataForm from '@/forms/MetaDataForm'

export default {
  props: {
    form: {
      type: MetaDataForm,
      required: true
    }
  },
  data () {
    return {
      isDragOver: false,
      errors: []
    }
  },
  computed: {
    isRegistFormSaved () {
      if (this.$store.state.registForm == null || this.$store.state.registForm.metaDataName == null) {
        console.log('isRegistFormSaved: false')
        return false
      } else {
        console.log('isRegistFormSaved: true')
        return true
      }
    },
    syncedSamplePictFilePath: {
      get () {
        return this.form.samplePictFilePath
      }
    },
    syncedSamplePictPreview: {
      get () {
        return this.form.samplePictPreview
      }
    }
  },
  methods: {
    submit () {
      this.errors = []
      this.errors = this.errors.concat(this.form.validateSamplePictFilePath())
      if (this.errors.length > 0) {
        return
      }
      this.$emit('next')
    },
    onDrag (type) {
      this.isDragOver = type === 'over'
    },
    onDrop (event) {
      this.isDragOver = false
      const files = event.dataTransfer.files
      if (files.length !== 1 || files[0].type.indexOf('image') !== 0) {
        return
      }
      this.form.setSamplePictFile(files[0].name, files[0])
      this.readImage(files[0])
    },
    onChange (event) {
      const files = event.target.files
      if (files.length !== 1 || files[0].type.indexOf('image') !== 0) {
        return
      }
      this.errors = []
      this.form.setSamplePictFile(files[0].name, files[0])
      this.readImage(files[0])
    },
    readImage (file) {
      const reader = new FileReader()
      reader.onload = this.loadImage
      reader.readAsDataURL(file)
    },
    loadImage (e) {
      this.form.setSamplePictPreview(e.target.result)
    },
    loadRegistForm () {
      const form = this.$store.state.registForm
      this.form.setForm(form)
      alert('保存データを読み込みました。')
    },
    clearRegistForm () {
      this.$store.commit('setRegistForm', null)
      alert('保存データを消去しました。')
    }
  }
}
</script>

<style>
.data-input {
  background-color: #eee;
  /** width: 300px;
  height: 100px;
  */
}
.image-input {
  background-color: #eee;
  /**width: 300px;
  height: 300px;
  */
}
.image-input__field {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-input__field.over {
  background-color: #666;
}
.image-input__field > input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}
.image-input__field > p {
  color: #aaa;
  text-align: center;
}
</style>
