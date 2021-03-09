<template>
    <v-snackbar
        v-model="snackbar"
        :timeout="-1"
    >
        {{ text }}
    </v-snackbar>
</template>

<script>
import messages from '@/utils/messages'

export default {
    data: () => ({
        // snackbar: true,
        // text: 'My timeout is set to 2000.',
    }),
    computed: {
        // error() {
        //     return this.$store.state.error
        // },
        text() {
            let errorCode = this.$store.state.error ? this.$store.state.error.code : null
            return messages[errorCode] || 'Ошибка (данная ошибка не иеет кода идентификатора)'
        },
        snackbar: {
            get() {
                return !!this.$store.state.error
            },
            // TODO: можно к сеттеру здесь обращаться а не в методе авторизации, так получиться, что не надо дублировать во всех ошибках будет
            // только надо вызвать его по таймауту как-то во вьютифай
            set(clearError) {
                return clearError
            } 
        }
    }
} 
</script>