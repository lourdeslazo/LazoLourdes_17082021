<template>
    <div>
        <Nav />
        <Messages />
    </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Messages from '@/components/Messages.vue';
export default {
    created(){
        this.$store.dispatch('getUsers');
        this.$store.dispatch('getMessagesInfos');
        this.$store.dispatch('getComments');
    },
    name: "Home",
    components: {
        Nav,
        Messages,
    },
};
</script>