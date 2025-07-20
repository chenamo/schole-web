// components/Quiz.vue
<template>
  <section id="quiz" class="max-w-3xl mx-auto py-8 px-4">
    <h2 class="text-3xl font-bold mb-6 text-center">クイズに挑戦！</h2>
    <div class="bg-white p-6 rounded-2xl shadow-xl transition-all" v-if="currentQuestion">
      <p class="mb-4 font-semibold">Q{{ currentIndex + 1 }}: {{ currentQuestion.question }}</p>
      <ul class="space-y-3">
        <li v-for="(choice, idx) in currentQuestion.choices" :key="idx">
          <button
            class="px-5 py-3 w-full text-left rounded-xl transition-colors"
            :class="{
              'bg-green-100 border border-green-500 text-green-800': showAnswer && idx === currentQuestion.correctIndex,
              'bg-red-100 border border-red-500 text-red-800': showAnswer && idx === selectedIndex && idx !== currentQuestion.correctIndex,
              'bg-gray-100 hover:bg-gray-200': !showAnswer
            }"
            @click="selectAnswer(idx)"
            :disabled="showAnswer"
          >
            {{ choice }}
          </button>
        </li>
      </ul>
      <div v-if="showAnswer" class="mt-6 text-center">
        <button class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl" @click="nextQuestion">
          次の問題へ
        </button>
      </div>
    </div>
    <div v-else class="bg-white p-6 rounded shadow text-center">
      <p class="text-xl font-semibold">クイズ終了！お疲れさまでした。</p>
      <p class="text-lg mt-2">正解数：{{ score }} / {{ quizData.length }}</p>
    </div>

    <div class="mt-16 bg-white rounded-xl p-6 shadow-xl">
      <h3 class="text-2xl font-bold mb-6 text-center">管理用パネル</h3>

      <!-- 認証されていない場合 -->
      <div v-if="!user" class="max-w-md mx-auto space-y-4">
        <form @submit.prevent="loginWithEmail" class="space-y-3">
          <input v-model="authEmail" type="email" placeholder="メールアドレス" class="border border-gray-300 rounded p-3 w-full" required />
          <input v-model="authPassword" type="password" placeholder="パスワード" class="border border-gray-300 rounded p-3 w-full" required />
          <div class="flex gap-4">
            <button type="submit" class="flex-1 px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">ログイン</button>
            <button type="button" class="flex-1 px-4 py-3 bg-gray-500 text-white rounded hover:bg-gray-600" @click="registerWithEmail">新規登録</button>
          </div>
        </form>
      </div>

      <!-- 認証済みの場合 -->
      <form v-else @submit.prevent="submitQuestion" class="grid gap-3 mt-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input v-model="form.question" placeholder="問題文" class="border p-3 rounded" required />
          <input v-model="form.correct_index" type="number" min="0" max="2" placeholder="正解の番号 (0〜2)" class="border p-3 rounded" required />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input v-model="form.choice1" placeholder="選択肢1" class="border p-3 rounded" required />
          <input v-model="form.choice2" placeholder="選択肢2" class="border p-3 rounded" required />
          <input v-model="form.choice3" placeholder="選択肢3" class="border p-3 rounded" required />
        </div>
        <div class="flex justify-between items-center">
          <button type="submit" class="px-5 py-3 bg-green-600 text-white rounded hover:bg-green-700">投稿する</button>
          <button type="button" @click="logout" class="px-5 py-3 bg-red-500 text-white rounded hover:bg-red-600">ログアウト</button>
        </div>
      </form>

      <div class="mt-10">
        <h4 class="text-xl font-semibold mb-4 border-b pb-2">投稿済みクイズ一覧</h4>
        <ul class="space-y-3">
          <li v-for="q in fullData" :key="q.id" class="border p-4 rounded bg-gray-50">
            <p><strong>問題:</strong> {{ q.question }}<span v-if="q.user_email">（投稿者: {{ q.user_email }}）</span></p>
            <ul class="list-inside ml-4 text-sm text-gray-700">
              <li v-for="(choice, idx) in [q.choice1, q.choice2, q.choice3]" :key="idx">{{ idx }}: {{ choice }}</li>
            </ul>
            <p class="text-sm mt-1">正解: {{ q.correct_index }}</p>
            <div class="flex space-x-2 mt-2">
              <button @click="editQuestion(q)" class="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500">編集</button>
              <button @click="deleteQuestion(q.id)" class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">削除</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const quizData = ref([])
const fullData = ref([])
const currentIndex = ref(0)
const score = ref(0)
const selectedIndex = ref(null)
const showAnswer = ref(false)
const user = ref(null)
const editingId = ref(null)

const authEmail = ref('')
const authPassword = ref('')

const form = ref({
  question: '',
  choice1: '',
  choice2: '',
  choice3: '',
  correct_index: 0,
})

const currentQuestion = computed(() => quizData.value[currentIndex.value])

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function selectAnswer(index) {
  if (showAnswer.value) return
  selectedIndex.value = index
  showAnswer.value = true
  if (index === currentQuestion.value.correctIndex) {
    score.value++
  }
}

function nextQuestion() {
  selectedIndex.value = null
  showAnswer.value = false
  currentIndex.value++
}

async function fetchQuestions() {
  const { data: qData, error } = await supabase.from('questions').select('*')
  if (error) return
  fullData.value = qData
  quizData.value = shuffle(
    qData.map((row) => ({
      question: row.question,
      choices: [row.choice1, row.choice2, row.choice3],
      correctIndex: row.correct_index
    }))
  )
}

async function submitQuestion() {
  if (!user.value) {
    alert('ログインが必要です')
    return
  }
  const payload = {
    ...form.value,
    user_email: user.value.email
  }
  let result
  if (editingId.value) {
    result = await supabase.from('questions').update(payload).eq('id', editingId.value)
    editingId.value = null
  } else {
    result = await supabase.from('questions').insert([payload])
  }
  if (result.error) {
    alert('エラー: ' + result.error.message)
  } else {
    alert('登録完了')
    form.value = {
      question: '',
      choice1: '',
      choice2: '',
      choice3: '',
      correct_index: 0
    }
    await fetchQuestions()
  }
}

function editQuestion(q) {
  editingId.value = q.id
  form.value = {
    question: q.question,
    choice1: q.choice1,
    choice2: q.choice2,
    choice3: q.choice3,
    correct_index: q.correct_index
  }
}

async function deleteQuestion(id) {
  if (!confirm('本当に削除しますか？')) return
  const { error } = await supabase.from('questions').delete().eq('id', id)
  if (error) alert('削除失敗')
  else {
    alert('削除しました')
    await fetchQuestions()
  }
}

async function loginWithEmail() {
  const { error } = await supabase.auth.signInWithPassword({
    email: authEmail.value,
    password: authPassword.value
  })
  if (error) alert('ログイン失敗: ' + error.message)
  else {
    const { data: sessionData } = await supabase.auth.getSession()
    user.value = sessionData?.session?.user || null
    alert('ログインしました')
  }
}

async function registerWithEmail() {
  const { error } = await supabase.auth.signUp({
    email: authEmail.value,
    password: authPassword.value
  })
  if (error) alert('登録失敗: ' + error.message)
  else alert('登録しました。メールを確認してください。')
}

async function logout() {
  await supabase.auth.signOut()
  user.value = null
}

onMounted(async () => {
  const { data: sessionData } = await supabase.auth.getSession()
  user.value = sessionData?.session?.user || null
  await fetchQuestions()
})
</script>

