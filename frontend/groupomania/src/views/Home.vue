<template>
    <div>
        <Nav />
        <Post />
        <Wall />
 
    </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Post from '@/components/Post.vue';
import Wall from '../components/Wall.vue';


export default {
    name: "Home",
    components: {
        Nav,
        Post,
        Wall
      
    },
};
</script>