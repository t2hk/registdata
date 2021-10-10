<template>
  <div class="relative pb-4">
    <h1>メタデータ入力画面</h1>

    <form @submit.prevent="submit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div>
        <label class="mb-4">メタデータの名前:</label>
        <input v-model="syncedMetaDataName" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="mt-5">
        <label class="mb-4">登録者メールアドレス:</label>
        <input v-model="syncedRegistrarEmail" type="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>

      <!--
      <div class="mt-5 xl:flex">
        <div class="rounded border bg-blue-300 p-3 w-full h-200 xl:w-1/2">
          <div class="rounded border h-2/3 bg-green-300">
          </div>
          <div class="rounded border h-1/3 bg-red-200">
          </div>
        </div>
        <div class="rounded border p-3 bg-yellow-300">
          <img class="object-scale-down w-200 h-100" src="https://placehold.jp/200x100.png">
        </div>
      </div>
      -->

      <!-- イメージ画像ファイルの登録 ここから -->
      <div class="container mt-5 sm:flex sm:flex-row">
        <div class="p-3 w-full sm:w-1/2">
          <!-- イメージ画像選択 ここから -->
          <div class="">
            <label class="text-sm font-bold text-gray-500 tracking-wide">イメージ画像選択</label>
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
          <!-- イメージ画像選択 ここまで -->
          <!-- ファイル名表示 ここから -->
          <div class="mt-5">
            <label class="text-sm font-bold text-gray-500 tracking-wide">選択ファイル名</label>
            <div class="bg-white">
              <input type="text" :value="form.imagePictFilePath" readonly class="w-full" />
            </div>
          </div>
          <!-- ファイル名表示 ここまで -->
        </div>
        <!-- プレビュー ここから -->
        <div class="flex items-center p-3 rounded-lg border-4 border-dashed border-gray-400">
          <div class="flex w-200 h-100 justify-center">
            <img class="object-scale-down" v-bind:src="syncedImagePictPreview">
          </div>
        </div>
        <!-- プレビュー ここまで -->
      </div>
      <!-- イメージ画像ファイルの登録 ここまで -->

      <!-- エラー表示 ここから-->
      <div class="mt-2">
        <ul class="error-list">
          <li
            v-for="err in errors"
            :key="err"
          >
            <div class="flex items-center px-6 py-4 text-red-700 bg-red-100 rounded mt-2">
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

      <!-- 次へ、戻るボタン ここから -->
      <div class="mt-2 flex items-center justify-center space-x-4">
        <button type="button" @click="$emit('back')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">戻る</button>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">次へ</button>
      </div>
      <!-- 次へ、戻るボタン ここまで -->
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
    syncedMetaDataName: {
      get () {
        return this.form.metaDataName
      },
      set (val) {
        this.form.setMetaDataName(val)
        // this.$emit('update:form.metaDataName', val)
      }
    },
    syncedRegistrarEmail: {
      get () {
        return this.form.registrarEmail
      },
      set (val) {
        this.form.setRegistrarEmail(val)
        // this.$emit('update:form.registrarEmail', val)
      }
    },
    syncedImagePictFilePath: {
      get () {
        return this.form.imagePictFilePath
      }//,
      /**
      set (val) {
        this.$emit('update:form.imagePictFilePath', val)
      }
      */
    },
    syncedImagePictPreview: {
      get () {
        return this.form.imagePictPreview
      }//,
      /**
      set (val) {
        this.$emit('update:form.imagePictPreview', val)
      }
      */
    }
  },
  methods: {
    submit () {
      this.errors = []
      this.errors = this.errors.concat(this.form.validateMetaDataName())
      this.errors = this.errors.concat(this.form.validateRegistrarEmail())
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
      this.form.setImagePictFile(files[0].name, files[0])
      this.readImage(files[0])
    },
    onChange (event) {
      const files = event.target.files
      if (files.length !== 1 || files[0].type.indexOf('image') !== 0) {
        return
      }
      this.form.setImagePictFile(files[0].name, files[0])
      this.readImage(files[0])
    },
    readImage (file) {
      const reader = new FileReader()
      reader.onload = this.loadImage
      reader.readAsDataURL(file)
    },
    loadImage (e) {
      this.form.setImagePictPreview(e.target.result)
    }
  }
}
</script>
